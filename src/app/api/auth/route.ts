/* eslint-disable @typescript-eslint/no-non-null-assertion */
import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { ClientsProps } from '@/utils/type'
import { supabase } from '../../../../lib/supabase'

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
          pfp: 'profile/default.png',
          email,
          user,
          password: hash,
          bg: 'profile/bg.png',
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
  const { email, user, pfp, bg } = body

  try {
    if (!email || !user || !id) {
      return NextResponse.json({
        error: 'Usuário não foi encontrado.',
      })
    }

    const clients = await prisma.clients.updateMany({
      where: { id },
      data: {
        email,
        user,
        pfp,
        bg,
      },
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
  const user = searchParams.get('user')

  try {
    if (!id || !user) {
      return NextResponse.json({ error: 'ID de usuário não encontrado.' })
    }

    const existingClient = await prisma.clients.findUnique({ where: { id } })

    if (!existingClient) {
      return NextResponse.json({ error: 'Usuário não encontrado.' })
    }

    const clientDesks = await prisma.desk.findMany({
      where: { authorId: id },
      include: { members: true, comments: true },
    })
    for (const desk of clientDesks) {
      await prisma.member.deleteMany({ where: { deskId: desk.id } })
      await prisma.comment.deleteMany({ where: { deskId: desk.id } })
      await prisma.desk.delete({ where: { id: desk.id } })
    }
    await prisma.invite.deleteMany({
      where: {
        OR: [{ senderId: id }, { receiverId: id }],
      },
    })
    await prisma.clients.delete({ where: { id } })

    const { data: listBg } = await supabase.storage
      .from('hub-desk')
      .list(`profile/${user}/bg`)
    const filesBg =
      listBg?.map((file) => `profile/${user}/bg/${file.name}`) || []

    const { data: listUser } = await supabase.storage
      .from('hub-desk')
      .list(`profile/${user}`)
    const filesUser =
      listUser?.map((file) => `profile/${user}/${file.name}`) || []

    if (filesBg.length > 0) {
      await supabase.storage.from('hub-desk').remove(filesBg)
    }

    if (filesUser.length > 0) {
      await supabase.storage.from('hub-desk').remove(filesUser)
    }

    await supabase.storage
      .from('hub-desk')
      .remove([`profile/${user}/bg`, `profile/${user}`])

    return NextResponse.json({ success: 'Conta excluída com sucesso.' })
  } catch (error) {
    console.error('Erro durante a autenticação:', error)
    return NextResponse.json('Ocorreu um erro durante a autenticação.', {
      status: 500,
    })
  }
}
