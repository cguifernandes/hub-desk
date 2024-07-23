import prisma from '../../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const user = searchParams.get('user')

  if (!user) {
    return NextResponse.json({
      error: 'Por favor, forneça um nome para pesquisar.',
    })
  }

  try {
    const clients = await prisma.clients.findMany({ where: { user } })

    if (clients.length > 0) {
      return NextResponse.json({
        success: 'Usuário encontrado',
        data: clients,
      })
    } else {
      return NextResponse.json({ error: 'Usuário não encontrado.' })
    }
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json({
      error: 'Ocorreu um erro ao buscar os clientes.',
    })
  }
}
