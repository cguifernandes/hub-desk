import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

type Users = {
  email: string
  user: string
  password: string
  id: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const clients = await prisma.clients.findMany({ where: { id } })

    if (clients) {
      return NextResponse.json({ success: 'Usuário encontrado', clients })
    } else {
      return NextResponse.json({ error: 'Usuário não encontrado.' })
    }
  }
}

export async function POST(request: NextRequest) {
  const body: Users = await request.json()
  const { user, email, password } = body
  const hash = await bcrypt.hash(password, 10)

  try {
    const existingEmail = await prisma.clients.findUnique({
      where: { email },
    })

    const existingUser = await prisma.clients.findFirst({
      where: { user },
    })

    if (existingEmail) {
      return NextResponse.json({ error: 'Este email já está em uso.' })
    } else if (existingUser) {
      return NextResponse.json({ error: 'Este user já está em uso.' })
    } else {
      const newClient = await prisma.clients.create({
        data: {
          pfp: 'https://i.im.ge/2023/08/25/mRf7ep.pfp.png',
          email,
          user,
          password: hash,
        },
      })

      return NextResponse.json({
        success: 'A conta foi criada com sucesso.',
        id: newClient.id,
      })
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
