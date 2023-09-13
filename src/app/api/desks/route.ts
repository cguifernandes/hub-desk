import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { RDeskProps } from '@/utils/type'
import { DeskProps } from '@/utils/Zod/desk'

export async function DELETE(request: NextRequest) {
  const body: RDeskProps = await request.json()
  const { id } = body

  if (id) {
    const desks = await prisma.desk.delete({ where: { id } })

    const updatedCards = await prisma.desk.findMany()

    if (desks) {
      return NextResponse.json({
        success: 'Desks encontrado',
        data: updatedCards,
      })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: DeskProps = await request.json()
  const { category, description, title, repo, website } = body

  try {
    if (!id) {
      return NextResponse.json({
        error: 'Não é possível criar uma desk sem estar logado.',
      })
    }

    const newDesk = await prisma.desk.create({
      data: {
        category,
        description,
        title,
        authorId: id,
        repo,
        website,
      },
    })

    return NextResponse.json({
      success: 'Desk criada com sucesso.',
      data: newDesk,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
