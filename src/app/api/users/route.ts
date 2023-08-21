import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const novoUsuario = {
    _id: '64e3ae6c58bb436fd44e94ba',
    createdAt: Date.now(),
    category: 'ddsasdaasd',
    title: 'ANIMES',
    imageURL: 'sdasdasd',
    color: 'asdasda',
    description: '',
  }

  try {
    const updatedClient = await prisma.clients.update({
      where: { id: novoUsuario._id },
      data: {
        desks: { push: novoUsuario },
      },
    })
    return NextResponse.json({ updatedClient })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
