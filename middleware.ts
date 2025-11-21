import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Se for a rota raiz (/), redireciona para o site da DMTN
  if (pathname === '/') {
    return NextResponse.redirect('https://dmtn.com.br', 301)
  }

  // Permite acesso às rotas de propostas
  if (pathname.startsWith('/proposta')) {
    return NextResponse.next()
  }

  // Permite acesso às rotas da API
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

