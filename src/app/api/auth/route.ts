import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { ClientsProps } from '@/utils/type'

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

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: ClientsProps = await request.json()
  const { email, user } = body

  try {
    if (!email || !user || !id) {
      return NextResponse.json({
        error: 'Usuário não foi encontrado.',
      })
    }

    const clients = await prisma.clients.updateMany({
      where: { id },
      data: { email, user },
    })

    if (clients) {
      return NextResponse.json({
        success: 'Usuário atualizado com sucesso',
      })
    } else {
      return NextResponse.json({ error: 'Usuário não encontrado.' })
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error)
    return NextResponse.json('Ocorreu um erro durante a autenticação.', {
      status: 500,
    })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID de usuário não encontrado.' })
    }

    await prisma.desk.deleteMany({ where: { authorId: id } })
    await prisma.comment.deleteMany({ where: { authorId: id } })
    await prisma.clients.delete({ where: { id } })

    return NextResponse.json({
      success: 'Dados excluídos com sucesso!',
    })
  } catch (error) {
    console.error('Erro durante a autenticação:', error)
    return NextResponse.json('Ocorreu um erro durante a autenticação.', {
      status: 500,
    })
  }
}
