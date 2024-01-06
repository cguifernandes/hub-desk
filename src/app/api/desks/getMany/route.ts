import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const page = searchParams.get('page')
  const PER_PAGE = 8

  if (id) {
    const currentPage = Math.max(Number(page || 1), 1)

    const desks = await prisma.desk.findMany({
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      where: { authorId: id, visibility: 'Público' },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { comments: true },
        },
        author: true,
      },
    })

    const count = await prisma.desk.count({
      where: { authorId: id, visibility: 'Público' },
    })

    if (desks) {
      return NextResponse.json({
        success: 'Desks encontrado',
        data: desks,
        count,
      })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}
