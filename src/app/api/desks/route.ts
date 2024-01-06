/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { DeskProps } from '@/utils/type'
import { supabase } from '../../../../lib/supabase'

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('deskId')
  const image = searchParams.get('image')

  if (deskId) {
    try {
      await prisma.member.deleteMany({ where: { deskId } })
      await prisma.comment.deleteMany({ where: { deskId } })
      await prisma.desk.delete({ where: { id: deskId } })
      if (image !== 'undefined' && image) {
        await supabase.storage.from('hub-desk').remove([image])
      }

      return NextResponse.json({
        success: 'Desks apagada com sucesso.',
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  } else {
    return NextResponse.json({
      error: 'Nenhuma desk foi encontrada por este usuário.',
    })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('deskId')
  const body: DeskProps = await request.json()
  const {
    category,
    description,
    title,
    repo,
    website,
    image,
    visibility,
    authorId,
  } = body
  try {
    if (!deskId) {
      return NextResponse.json({
        error: 'Não é possível editar essa.',
      })
    }

    const newDesk = await prisma.desk.updateMany({
      where: { id: deskId },
      data: {
        category,
        description,
        title,
        authorId,
        repo,
        website,
        image,
        visibility,
      },
    })

    return NextResponse.json({
      success: 'Os dados da desk foram editados com sucesso.',
      data: newDesk,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('authorId')
  const body: DeskProps = await request.json()
  const { category, description, title, repo, website, image, visibility } =
    body
  try {
    if (!authorId) {
      return NextResponse.json({
        error: 'Não é possível criar uma desk sem estar logado.',
      })
    }

    const newDesk = await prisma.desk.create({
      data: {
        category,
        description,
        title,
        authorId,
        repo,
        website,
        image,
        visibility,
      },
    })

    await prisma.member.create({
      data: { role: 'Líder', deskId: newDesk.id, userId: authorId },
    })

    return NextResponse.json({
      success: 'Desk criada com sucesso.',
      data: newDesk,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
