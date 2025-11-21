import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dmtn-secret-key-change-in-production')

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Se for a rota raiz (/), redireciona para o site da DMTN
  if (pathname === '/') {
    return NextResponse.redirect('https://dmtn.com.br', 301)
  }

  // Rotas públicas de propostas (visualização)
  if (pathname.startsWith('/proposta/') && !pathname.startsWith('/propostas')) {
    return NextResponse.next()
  }

  // Rotas da API pública
  if (pathname.startsWith('/api/interesse') || pathname.startsWith('/api/auth/login')) {
    return NextResponse.next()
  }

  // Área administrativa - requer autenticação
  // Exceção: /propostas/login é pública
  if (pathname === '/propostas/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/propostas') || pathname.startsWith('/api/propostas')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/propostas/login', request.url))
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== 'admin') {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
      }
      return NextResponse.redirect(new URL('/propostas/login', request.url))
    }

    return NextResponse.next()
  }

  // Permite acesso às outras rotas da API
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Para qualquer outra rota, também redireciona para o site da DMTN
  return NextResponse.redirect('https://dmtn.com.br', 301)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
