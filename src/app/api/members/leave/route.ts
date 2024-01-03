import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

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
        success: 'Saída da desk efetuado com sucesso.',
      })
    } catch (err) {
      return NextResponse.json({
        error: err,
      })
    }
  }
}
