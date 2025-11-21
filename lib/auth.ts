import { compare, hash } from 'bcryptjs'
import { prisma } from './prisma'

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function createAdminUser() {
  const email = 'ryan@dmtn.com.br'
  const password = '123456@a'
  
  // Verificar se já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('Admin user já existe')
    return existingUser
  }

  // Criar admin
  const hashedPassword = await hashPassword(password)
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nome: 'Ryan Figueredo',
      role: 'admin',
    },
  })

  console.log('Admin user criado:', email)
  return admin
}

