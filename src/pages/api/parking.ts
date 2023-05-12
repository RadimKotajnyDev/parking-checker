// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Spot } from "@/pages/spot";
import testJson from '../../../public/test.json' assert {type: 'json'}
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Spot[]>
) {
  const { query, method } = req
  const status = parseInt(query.data as string, 10)
  const EUI = query.EUI as string
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
      break
    case "POST":
      console.log(query, status, EUI)
      // const spot: Spot = await prisma.spot.update({
      //   where: {
      //     EUI: EUI,
      //   },
      //   data: {
      //     status: status,
      //   },
      // })
      res.status(200).json(testJson)
      break
  }
}
