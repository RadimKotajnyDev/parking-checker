// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Spot } from "@/pages/spot";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const status = parseInt(body.data as string, 10)
  const EUI = body.EUI as string
  switch (method) {
    case "GET":
      // @ts-ignore
      const allSpots: Spot[] = await prisma.spot.findMany({
        select: {
          id: true,
          status: true,
        }
      })
      res.status(200).json(allSpots)
      res.end()
      break
    case "POST":
      const spot: Spot = await prisma.spot.update({
        where: {
          EUI: EUI,
        },
        data: {
          status: status,
        },
      })
      res.status(200)
      res.end()
      break
  }
}
