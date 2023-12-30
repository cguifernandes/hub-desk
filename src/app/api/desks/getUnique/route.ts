import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const desks = await prisma.desk.findMany({
      where: { id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { comments: true },
        },
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
