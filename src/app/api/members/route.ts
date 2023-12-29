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

      return NextResponse.json({
        success: 'Cargo atualizado com sucesso.',
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

  if (!userId || !deskId) {
    return NextResponse.json({ error: 'O ID do usuário não foi encontrado.' })
  } else {
    try {
      await prisma.member.deleteMany({ where: { deskId, userId } })

      return NextResponse.json({
        success: 'Membro removido da desk.',
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  }
}
