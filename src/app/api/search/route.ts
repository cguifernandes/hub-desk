import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const id = searchParams.get('id')

  if (query && id) {
    const clients = await prisma.clients.findMany({
      where: { user: { mode: 'insensitive', contains: query } },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            desks: true,
          },
        },
      },
    })

    if (id === 'undefined') {
      const desks = await prisma.desk.findMany({
        where: {
          title: { mode: 'insensitive', contains: query },
          visibility: 'Público',
        },
        include: {
          _count: {
            select: { comments: true },
          },
          author: true,
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({
        desks,
        clients,
      })
    }

    const desks = await prisma.desk.findMany({
      where: {
        OR: [
          {
            title: { mode: 'insensitive', contains: query },
            visibility: 'Público',
          },
          {
            title: { mode: 'insensitive', contains: query },
            visibility: 'Privado',
            members: { some: { userId: id } },
          },
        ],
      },
      include: {
        _count: { select: { comments: true } },
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      desks,
      clients,
    })
  }
}
