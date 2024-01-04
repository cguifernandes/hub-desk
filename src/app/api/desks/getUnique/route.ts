import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    try {
      const desks = await prisma.desk.findMany({
        where: { id },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: {
            select: { comments: true },
          },
          author: true,
          members: {
            select: {
              userId: true,
              role: true,
            },
          },
        },
      })

      if (desks) {
        return NextResponse.json({ success: 'Desks encontrado', data: desks })
      } else {
        return NextResponse.json({
          error: 'Nenhuma desk foi encontrada por este usuário.',
        })
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'O ID da desk não foi encontrado' })
    }
  }
}
