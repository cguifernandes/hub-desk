import { MemberProps } from '@/utils/type'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

type Role = 'Líder' | 'Co-líder' | 'Membro'

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  const page = searchParams.get('page')
  const body: MemberProps = await request.json()
  const { deskId, role } = body
  const PER_PAGE = 4

  if (userId) {
    try {
      const currentPage = Math.max(Number(page || 1), 1)

      await prisma.member.updateMany({
        where: { userId, deskId },
        data: {
          role,
        },
      })

      const updatedMembers = await prisma.member.findMany({
        where: { deskId },
        orderBy: {
          role: 'asc',
        },
        include: {
          user: true,
        },
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
      })

      const rolesOrder: Record<Role, number> = {
        Líder: 1,
        'Co-líder': 2,
        Membro: 3,
      }

      updatedMembers.sort((a, b) => {
        const roleA = a.role as Role
        const roleB = b.role as Role
        return rolesOrder[roleA] - rolesOrder[roleB]
      })

      const count = await prisma.member.count({
        where: { deskId },
      })

      return NextResponse.json({
        success: 'Cargo atualizado com sucesso.',
        updatedMembers,
        count,
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  } else {
    return NextResponse.json({ error: 'O ID do usuário não foi encontrado.' })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  const deskId = searchParams.get('deskId')
  const page = searchParams.get('page')
  const PER_PAGE = 4

  if (!userId || !deskId) {
    return NextResponse.json({ error: 'O ID do usuário não foi encontrado.' })
  } else {
    try {
      const currentPage = Math.max(Number(page || 1), 1)

      await prisma.member.deleteMany({ where: { deskId, userId } })

      const updatedMembers = await prisma.member.findMany({
        where: { deskId },
        include: { user: true },
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
      })

      const count = await prisma.member.count({
        where: { deskId },
      })

      return NextResponse.json({
        success: 'Membro removido da desk.',
        updatedMembers,
        count,
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  }
}
