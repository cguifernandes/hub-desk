import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('id')

  if (authorId) {
    const desks = await prisma.desk.findMany({
      where: { authorId },
      orderBy: {
        createdAt: 'desc',
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
