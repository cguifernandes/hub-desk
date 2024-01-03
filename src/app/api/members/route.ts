import { MemberProps } from '@/utils/type'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  const body: MemberProps = await request.json()
  const { deskId, role } = body

  if (userId) {
    try {
      await prisma.member.updateMany({
        where: { userId, deskId },
        data: {
          role,
        },
      })

      const updatedMembers = await prisma.member.findMany({
        include: {
          user: true,
        },
      })

      return NextResponse.json({
        success: 'Cargo atualizado com sucesso.',
        updatedMembers,
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

      return NextResponse.json({
        success: 'Membro removido da desk.',
        updatedMembers,
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  }
}
