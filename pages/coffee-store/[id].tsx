import { useRouter } from 'next/router'
import Head2 from 'next/head'
import coffeeStoresData from '../../store/coffee-stores.json'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return { params: { id: coffeeStore.id.toString() } }
  })
  return {
    paths,
    fallback: true,
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
  // const id = router.query.id
  console.log('router', router)
  console.log('props', props)

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <span className="block w-32 h-32 rounded-full border-[8px] border-black border-t-black/10 border-r-black/10 animate-spin"></span>
        <span className="text-xl font-medium capitalize">loading</span>
      </div>
    )
  }

  const { id, name, neighbourhood, address } = props.coffeeStore

  return (
    <div>
      <Head2>
        <title>{props.coffeeStore.name}</title>
        <Script
          src="/public/fonts/fontawesome.js"
          crossOrigin="anonymous"
        ></Script>
      </Head2>
      <Link href={'/'}>
        <i className="fa fa-arrow-left"></i>
      </Link>
      <i className="fa fa-arrow-left">a</i>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  )
}

export default CoffeeStore
