import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (query) {
    const clients = await prisma.clients.findMany({
      where: { user: { mode: 'insensitive', contains: query } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ clients })
  }
}
