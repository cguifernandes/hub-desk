import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { CommentProps } from '@/utils/type'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('id')
  const body: CommentProps = await request.json()
  const { deskId, text } = body

  try {
    if (!authorId) {
      return NextResponse.json({
        error: 'Não é possível comentar em uma desk sem estar logado.',
      })
    }

    try {
      await prisma.comment.create({
        data: { deskId, text, authorId },
      })

      return NextResponse.json({
        success: 'Desk criada com sucesso.',
      })
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
