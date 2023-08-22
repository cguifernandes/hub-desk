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

    const hash = await bcrypt.hash(password, 10)

    const person = await prisma.clients.create({
      data: {
        email,
        name,
        password: hash,
      },
    })

    return NextResponse.json({ person })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
