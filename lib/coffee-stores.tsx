import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.UNSPALSH_ACCESS_KEY!,
})

const getListOfCoffeeStorePhotos = async () => {
  try {
    const photos = await unsplash.search.getPhotos({
      query: 'coffee shop',
      page: 1,
      perPage: 10,
    })
    console.log('photos', photos)
    const unsplashResults = photos.response?.results
    return unsplashResults?.map((result) => result.urls.small)
  } catch (err) {
    return []
  }
}

const getUrlForCoffeeStores = (
  query: string,
  latLong: string,
  limit: number
) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
  return url
}

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos()
  const input = getUrlForCoffeeStores(
    'coffee',
    '43.65655048163331%2C-79.38015589158583',
    10
  )
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  }
  const response = await fetch(input, options)
  const data = await response.json()
  const result = [...data.results].map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: result.location.cross_street,
      imgUrl: photos![index] ?? '',
    }
  })
  console.log('fetchCoffeeStores', result)
  return result
}
