import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { CommentProps } from '@/utils/type'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('id')
  const body: CommentProps = await request.json()
  const { deskId, text } = body
  const page = searchParams.get('page')
  const PER_PAGE = 4

  try {
    if (!authorId) {
      return NextResponse.json({
        error: 'Não é possível comentar em uma desk sem estar logado.',
      })
    }

    try {
      const currentPage = Math.max(Number(page || 1), 1)

      await prisma.comment.create({
        data: { deskId, text, authorId },
      })

      const updatedComment = await prisma.comment.findMany({
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
        where: { deskId },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return NextResponse.json({
        success: 'Seu comentário foi postado.',
        updatedComment,
      })
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
