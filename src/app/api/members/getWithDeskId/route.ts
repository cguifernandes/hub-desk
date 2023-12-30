import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

type Role = 'Líder' | 'Co-líder' | 'Membro'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('id')

  if (deskId) {
    const members = await prisma.member.findMany({
      where: { deskId },
      include: { user: true },
    })

    const rolesOrder: Record<Role, number> = {
      Líder: 1,
      'Co-líder': 2,
      Membro: 3,
    }

    members.sort((a, b) => {
      const roleA = a.role as Role
      const roleB = b.role as Role
      return rolesOrder[roleA] - rolesOrder[roleB]
    })

    if (members) {
      return NextResponse.json({
        success: 'Membros encontrados',
        data: members,
      })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}
