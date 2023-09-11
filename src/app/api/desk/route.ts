import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { DeskProps } from '@/utils/Zod/desk'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const body: DeskProps = await request.json()
  const { category, description, title, repo, website } = body

  try {
    if (!id) {
      return NextResponse.json({
        error: 'Não é possível criar uma desk sem estar logado.',
      })
    }

    const newDesk = await prisma.desk.create({
      data: {
        category,
        description,
        title,
        authorId: id,
        repo,
        website,
      },
    })

    return NextResponse.json({
      success: 'Desk criada com sucesso.',
      data: newDesk,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
