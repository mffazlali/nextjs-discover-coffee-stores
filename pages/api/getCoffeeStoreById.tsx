import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/middleware/connect-db'
import CoffeeStore from '@/lib/models/coffee-store'

const getCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDB()
  if (req.method === 'GET') {
    const { id } = req.query
    if (id) {
      try {
        const findedCoffeeStore = await CoffeeStore.findOne({ id: id })
        res.status(200).json({
          results: findedCoffeeStore,
          message: 'Coffee store is found',
        })
      } catch (err: any) {
        res.status(500).json({ results: null, message: err.message })
      }
    } else {
      res.status(500).json({ results: null, message: 'id is missing' })
    }
  }
}

export default getCoffeeStoreById
