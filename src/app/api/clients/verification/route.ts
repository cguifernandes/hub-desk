import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '../../../../../lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await prisma.clients.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'E-mail não encontrado.' })
    }

    const match = await bcrypt.compare(password, user.password)

    if (match) {
      return NextResponse.json({ success: 'Autenticação bem-sucedida.' })
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
