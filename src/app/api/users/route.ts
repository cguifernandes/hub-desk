import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ '0io': 'oi' })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
