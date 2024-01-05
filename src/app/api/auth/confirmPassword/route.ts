import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')
  const id = searchParams.get('id')

  try {
    if (!id || !password) {
      return NextResponse.json({ error: 'ID de usuário ou senha ausente.' })
    }

    const user = await prisma.clients.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Este usuário não foi encontrado.' })
    }

    const match = await bcrypt.compare(password, user.password)

    if (match) {
      return NextResponse.json({
        success: 'Autenticação bem-sucedida.',
      })
    } else {
      return NextResponse.json({ error: 'Senha incorreta.' })
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error)
    return NextResponse.json('Ocorreu um erro durante a autenticação.', {
      status: 500,
    })
  }
}
