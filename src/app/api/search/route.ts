import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (query) {
    const clients = await prisma.clients.findMany({
      where: { user: { mode: 'insensitive', contains: query } },
      orderBy: { createdAt: 'desc' },
    })
    const desks = await prisma.desk.findMany({
      where: { title: { mode: 'insensitive', contains: query } },
      orderBy: { createdAt: 'desc' },
    })

    if (desks.length === 0 && clients.length === 0) {
      return NextResponse.json({ error: 'Nenhum resultado encontrado.' })
    } else {
      return NextResponse.json({ desks, clients })
    }
  }
}
