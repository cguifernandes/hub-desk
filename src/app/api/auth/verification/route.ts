import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '../../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const password = searchParams.get('password')

  try {
    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail ou senha não fornecidos.' })
    }

    const user = await prisma.clients.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'E-mail não encontrado.' })
    }

    const match = await bcrypt.compare(password, user.password)

    if (match) {
      return NextResponse.json({
        success: 'Autenticação bem-sucedida.',
        id: user.id,
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
