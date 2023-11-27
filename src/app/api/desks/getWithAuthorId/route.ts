import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('id')
  const page = searchParams.get('page')
  const PER_PAGE = 12

  if (authorId) {
    const currentPage = Math.max(Number(page || 1), 1)

    const desks = await prisma.desk.findMany({
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      where: { authorId },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const count = await prisma.desk.count({
      where: { authorId },
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
