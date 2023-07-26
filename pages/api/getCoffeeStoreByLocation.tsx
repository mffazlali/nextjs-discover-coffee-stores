import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { NextApiRequest, NextApiResponse } from 'next'

const getCoffeeStoreByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const queryParam = req.query
  const latLang = queryParam.latLang!.toString()
  const limit = +queryParam.limit!.toString()
  const coffeeStores = await fetchCoffeeStores(latLang, limit)
  if (coffeeStores) {
    res.status(200).json(coffeeStores)
  } else {
    res.status(500).json(coffeeStores)
  }
}

export default getCoffeeStoreByLocation
