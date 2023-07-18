import { useRouter } from 'next/router'
import Head2 from 'next/head'
import coffeeStoresData from '../../store/coffee-stores.json'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return { params: { id: String(coffeeStore.id) } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (staticProps) => {
  const params = staticProps.params
  console.log('params', params)
  const coffeeStore = coffeeStoresData.find(
    (coffeeStore) => coffeeStore.id.toString() == params?.id
  )
  return {
    props: { coffeeStore },
  }
}

const CoffeeStore = (props: any) => {
  const router = useRouter()
  const id = router.query.id
  console.log('router', router)
  console.log('props', props)
  return (
    <div>
      <Head2>
        <title>{id}</title>
      </Head2>
      <div>coffee store {id}</div>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  )
}

export default CoffeeStore
