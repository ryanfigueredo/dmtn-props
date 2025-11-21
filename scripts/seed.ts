import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const email = 'ryan@dmtn.com.br'
  const password = '123456@a'

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    const hashedPassword = await hash(password, 12)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nome: 'Ryan Figueredo',
        role: 'admin',
      },
    })
    console.log('✅ Admin user criado:', email)
  } else {
    console.log('ℹ️  Admin user já existe')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

