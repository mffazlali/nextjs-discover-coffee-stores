import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'
import connectDB from '@/lib/middleware/connect-db'
import CoffeeStore from '@/lib/models/coffee-store'
Airtable.configure({
  endpointUrl: 'http://api.airtable.com/',
  apiKey: process.env.AIRTABLE_API_KEY!,
})

// CONNECTION_STRING_REMOTE=mongodb+srv://admin:MFSserko2579@eshop-cluster.himo2j7.mongodb.net/?retryWrites=true&w=majority
// CONNECTION_STRING_LOCAL_HOST=mongodb://localhost:27017
// CONNECTION_STRING_LOCAL=mongodb://127.0.0.1/
// DB_NAME=discover-coffee-stores
// DB_NAME_PROD=discover-coffee-stores-prod

var table = Airtable.base(process.env.AIRTABLE_BASE_KEY!)
const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const queryParam = req.query
  console.log({body:req.body})
  const { id, name, address, neighbourhood, imgUrl, viting } = req.body
  if (req.method === 'POST') {
    const findedCoffeeStore = await CoffeeStore.findById(id)
    if (findedCoffeeStore) {
      res.status(200).json(findedCoffeeStore)
    } else {
      let coffeeStore = new CoffeeStore({
        name,
        address,
        neighbourhood,
        imgUrl,
        viting,
      })
      const coffeeStores = await coffeeStore.save()
      if (!coffeeStores)
        res.status(500).json('The coffee store connot the created')
      res.status(200).json(coffeeStores)
    }
  } else if (req.method === 'GET') {
    const coffeeStores = await CoffeeStore.find()
    if (!coffeeStores) {
      return res.status(500).json({ success: false })
    }
    res.status(200).json(coffeeStores)
  }
}

export default connectDB(createCoffeeStore)
