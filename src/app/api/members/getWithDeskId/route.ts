import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

type Role = 'Líder' | 'Co-líder' | 'Membro'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('id')
  const page = searchParams.get('page')
  const PER_PAGE = 4

  if (deskId) {
    const allMembers = await prisma.member.findMany({
      where: { deskId },
      include: { user: true },
    })

    const rolesOrder: Record<Role, number> = {
      Líder: 1,
      'Co-líder': 2,
      Membro: 3,
    }

    allMembers.sort((a, b) => {
      const roleA = a.role as Role
      const roleB = b.role as Role
      return rolesOrder[roleA] - rolesOrder[roleB]
    })

    const currentPage = Math.max(Number(page || 1), 1)
    const startIndex = (currentPage - 1) * PER_PAGE
    const endIndex = startIndex + PER_PAGE
    const members = allMembers.slice(startIndex, endIndex)

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
