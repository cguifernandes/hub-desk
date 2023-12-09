/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { DeskProps } from '@/utils/type'

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const body: DeskProps = await request.json()
  const page = searchParams.get('page')
  const { id, authorId } = body
  const PER_PAGE = 12

  if (id) {
    const deletedDesks = await prisma.desk.delete({ where: { id } })
    const currentPage = Math.max(Number(page || 1), 1)

    if (deletedDesks) {
      const updatedDeks = await prisma.desk.findMany({
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
        where: { authorId },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return NextResponse.json({
        success: 'Desks apagada',
        data: updatedDeks,
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
  const { category, description, title, repo, website, image } = body
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
        image,
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
