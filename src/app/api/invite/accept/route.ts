import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('deskId')
  const userId = searchParams.get('id')

  try {
    if (!deskId || !userId) {
      return NextResponse.json({
        error: 'Não é possível editar essa.',
      })
    }

    const newDesk = await prisma.member.create({
      data: {
        userId,
        deskId,
        role: 'Membro',
      },
    })

    return NextResponse.json({
      success: 'Os dados da desk foram editados com sucesso.',
      data: newDesk,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
