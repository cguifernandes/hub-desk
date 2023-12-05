import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const clients = await prisma.clients.findMany({ where: { id } })

    if (clients) {
      return NextResponse.json({ success: 'Usuário encontrado', clients })
    } else {
      return NextResponse.json({ error: 'Usuário não encontrado.' })
    }
  }
}
