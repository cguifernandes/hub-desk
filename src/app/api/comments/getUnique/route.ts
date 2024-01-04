import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('id')
  const page = searchParams.get('page')
  const PER_PAGE = 4

  if (deskId) {
    const currentPage = Math.max(Number(page || 1), 1)

    const desks = await prisma.comment.findMany({
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      where: { deskId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
    })

    const count = await prisma.comment.count({
      where: { deskId },
    })

    if (desks) {
      return NextResponse.json({ count, comments: desks })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada.',
      })
    }
  }
}
