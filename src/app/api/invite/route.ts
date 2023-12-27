import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { deskId, receiverId, senderId } = body

  try {
    if (!senderId) {
      return NextResponse.json({
        error: 'Não é possível criar uma desk sem estar logado.',
      })
    }

    const userAlreadyInDesk = await prisma.member.findFirst({
      where: {
        userId: receiverId,
        deskId,
      },
    })

    if (userAlreadyInDesk) {
      return NextResponse.json({
        error: 'Este usuário já faz parte desta desk',
      })
    }

    const hasInvite = await prisma.invite.findFirst({
      where: {
        receiverId,
        deskId,
      },
    })

    if (hasInvite) {
      return NextResponse.json({
        error: 'Este usuário já foi convidado para esta desk.',
      })
    } else {
      try {
        await prisma.invite.create({
          data: {
            senderId,
            deskId,
            receiverId,
          },
        })

        return NextResponse.json({
          success: 'Convite enviado com sucesso.',
        })
      } catch (error) {
        console.log(error)
        return NextResponse.json({
          error,
        })
      }
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
