import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deskId = searchParams.get('id')

  if (deskId) {
    const desks = await prisma.comment.findMany({ where: { deskId } })

    if (desks) {
      return NextResponse.json({ comments: desks })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada.',
      })
    }
  }
}
