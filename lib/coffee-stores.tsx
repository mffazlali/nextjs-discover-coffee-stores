import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPALSH_ACCESS_KEY!,
})

const getListOfCoffeeStorePhotos = async () => {
  const unsplashResults = await unsplashApi.search
    .getPhotos({
      query: 'coffee shop',
      page: 1,
      perPage: 11,
    })
    .then((res) => {
      return Promise.resolve(res.response?.results)
    })
    .catch((err) => {
      return Promise.resolve([])
    })
  return unsplashResults?.map((result) => result.urls.small)
}

const getUrlForCoffeeStores = (
  query: string,
  latLong: string,
  limit: number
) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
  return url
}

export const fetchCoffeeStores = async (
  latLong = '43.653833032607096%2C-79.37896808855945',
  limit = 10
) => {
  const photos = await getListOfCoffeeStorePhotos()
  console.log('photos', photos)
  const input = getUrlForCoffeeStores('coffee shop', latLong, limit)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
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
