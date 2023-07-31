import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/middleware/connect-db'
import CoffeeStore from '@/lib/models/coffee-store'

const updateCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDB()
  if (req.method === 'PUT') {
    const { id, name, address, neighbourhood, imgUrl, voting } = JSON.parse(
      req.body
    )
    if (id) {
      try {
        let coffeeStore = await CoffeeStore.findOneAndUpdate(
          { id },
          {
            id,
            name,
            address,
            neighbourhood,
            imgUrl,
            voting,
          },
          { new: true }
        )
        res.status(200).json({
          results: coffeeStore,
          message: 'Coffee store is updated',
        })
      } catch (err: any) {
        res.status(500).json({ results: null, message: err.message })
      }
    } else {
      res.status(400).json({ results: null, message: 'id is missing!' })
    }
  }
}

export default updateCoffeeStoreById
