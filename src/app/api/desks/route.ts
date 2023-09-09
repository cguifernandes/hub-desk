import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { RDeskProps } from '@/utils/type'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const desks = await prisma.desk.findMany({ where: { authorId: id } })

    if (desks) {
      return NextResponse.json({ success: 'Desks encontrado', data: desks })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}

export async function DELETE(request: NextRequest) {
  const body: RDeskProps = await request.json()
  const { id } = body

  if (id) {
    const desks = await prisma.desk.delete({ where: { id } })

    if (desks) {
      return NextResponse.json({ success: 'Desks encontrado', data: desks })
    } else {
      return NextResponse.json({
        error: 'Nenhuma desk foi encontrada por este usuário.',
      })
    }
  }
}
