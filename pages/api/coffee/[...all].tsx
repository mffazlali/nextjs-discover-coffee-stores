import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'hello catch routing' })
}
