import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (category) {
    const desks = await prisma.desk.findMany({
      where: { category, visibility: 'Público' },
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

    if (desks) {
      return NextResponse.json({ success: 'Desks encontrado', data: desks })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}
