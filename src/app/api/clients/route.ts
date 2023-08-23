import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

type Users = {
  email: string
  name: string
  password: string
}

export async function GET() {
  const users = await prisma.clients.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  try {
    const body: Users = await request.json()
    const { name, email, password } = body
    const users = await prisma.clients.findMany()
    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.clients.create({
      data: {
        email,
        name,
        password: hash,
      },
    })

    if (users.map((user) => user.email).includes(email)) {
      return NextResponse.json({ error: 'Esse e-mail já está registrado!' })
    }

    return NextResponse.json({ user })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
