import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('id')
  const page = searchParams.get('page')
  const PER_PAGE = 4

  if (deskId) {
    const currentPage = Math.max(Number(page || 1), 1)

    const members = await prisma.member.findMany({
      where: { deskId },
      include: { user: true },
      take: PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
    })

    const count = await prisma.member.count({
      where: { deskId },
    })

    if (members) {
      return NextResponse.json({
        success: 'Membros encontrados',
        data: members,
        count,
      })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}
