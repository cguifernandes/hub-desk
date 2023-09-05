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
        imageURL:
          'https://user-images.githubusercontent.com/88489337/246123199-359fb647-c077-4651-8d85-449d1f1dc204.png',
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
