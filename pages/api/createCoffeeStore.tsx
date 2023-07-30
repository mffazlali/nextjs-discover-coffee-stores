import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/middleware/connect-db'
import CoffeeStore from '@/lib/models/coffee-store'

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  if (req.method === 'POST') {
    const { id, name, address, neighbourhood, imgUrl, viting } = JSON.parse(
      req.body
    )
    if (id) {
      try {
        const findedCoffeeStore = await CoffeeStore.findOne({ id: id })
        if (findedCoffeeStore) {
          res.status(200).json({
            results: findedCoffeeStore,
            message: 'Coffee store is found',
          })
        } else {
          let coffeeStore = await CoffeeStore.create({
            id,
            name,
            address,
            neighbourhood,
            imgUrl,
            viting,
          })
          res.status(200).json({
            results: coffeeStore,
            message: 'Coffee store is created',
          })
        }
      } catch (err: any) {
        res.status(500).json({ results: null, message: err.message })
      }
    } else {
      res.status(400).json({ results: null, message: 'id is missing!' })
    }
  }
}

export default createCoffeeStore
