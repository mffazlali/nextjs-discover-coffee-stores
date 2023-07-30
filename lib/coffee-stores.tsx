import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPALSH_ACCESS_KEY!,
})

const getListOfCoffeeStorePhotos = async () => {
  const unsplashResults = await unsplashApi.search
    .getPhotos({
      query: 'coffee shop',
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
  latLong: String,
  limit: number
) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
  return url
}

export const fetchCoffeeStores = async (
  latLong: String = '43.653833032607096%2C-79.37896808855945',
  limit = 10
) => {
  const photos = await getListOfCoffeeStorePhotos()
  const input = getUrlForCoffeeStores('coffee shop', latLong, limit)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
    },
  }
  let response = await fetch(input, options)
    .then(async (res) => {
      const jsonData = await res.json()
      return Promise.resolve({results:[...jsonData.results],message:'success done'})
    })
    .catch((err: Error) =>
      Promise.reject(err.message)
    )
  if (response) {
    response.results = response.results.map((result, index) => {
      return {
        id: result.fsq_id,
        name: result.name,
        address: result.location.address,
        neighbourhood: result.location.cross_street,
        imgUrl: photos![index] ?? '',
      }
    })
  }
  return response
}
