import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

type Users = {
  email: string
  name: string
  password: string
}

export async function GET() {
  const users = await prisma.clients.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  try {
    const body: Users = await request.json()
    const { name, email, password } = body
    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.clients.findUnique({
      where: { email },
    })

    if (user) {
      return NextResponse.json({ error: 'Este email já está em uso.' })
    } else {
      await prisma.clients.create({
        data: {
          email,
          name,
          password: hash,
        },
      })

      return NextResponse.json({ success: 'A conta foi criada com sucesso.' })
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
