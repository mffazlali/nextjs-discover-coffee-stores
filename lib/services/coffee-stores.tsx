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
  return unsplashResults?.map((result) => {
    return result.urls.small
  })
}

const getUrlForCoffeeStores = (
  query: string,
  latLong: String,
  limit: number
) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
  return url
}

export const getCoffeeStores = async (
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
      return Promise.resolve({
        results: [...jsonData.results],
        message: 'success done',
      })
    })
    .catch((err: Error) => Promise.reject(err.message))
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

export const getCoffeeStoreById = async (id: any) => {
  const findedCoffeeStore = await fetch(`/api/getCoffeeStoreById?id=${id}`, {
    method: 'GET',
  }).then((res) => res.json())
  return findedCoffeeStore
}

export const createCoffeeStore = async (coffeeStore: any) => {
  const { id, name, address, neighbourhood, imgUrl, voting } = coffeeStore
  const createdCoffeeStore = await fetch('/api/createCoffeeStore', {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      address: address || '',
      neighbourhood: neighbourhood || '',
      imgUrl,
      voting: voting || 0,
    }),
  }).then((res) => res.json())
  return createdCoffeeStore
}

export const updateCoffeeStoreById = async (coffeeStore: any) => {
  const { id, name, address, neighbourhood, imgUrl, voting } = coffeeStore
  const updatedCoffeeStore = await fetch('/api/updateCoffeeStoreById', {
    method: 'PUT',
    body: JSON.stringify({
      id,
      name,
      address: address,
      neighbourhood,
      imgUrl,
      voting: voting,
    }),
  }).then((res) => res.json())
  return updatedCoffeeStore
}
