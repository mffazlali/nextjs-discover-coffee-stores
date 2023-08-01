import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import coffeeStoresData from '../store/coffee-stores.json'
import { getCoffeeStores } from '../lib/services/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import useAsyncEffect from 'use-async-effect'
import { useContext, useState } from 'react'
import { StoreContext } from '@/store/store-context'
import { ACTION_TYPES } from '@/store/actions'

export const getStaticProps = async (context: any) => {
  const response = await getCoffeeStores()
  const coffeeStores = [...response.results]
  return { props: { coffeeStores } }
}

export default function Home(props: { coffeeStores: any[] }) {
  const { locationErrorMsg, handleTrackLocation, isTrackLocation } =
    useTrackLocation()

  // const [coffeeStores, setCoffeeStores] = useState<any[]>([])
  const [coffeeStoresError, setCoffeeStoresError] = useState<string>()

  const { state, dispatch } = useContext(StoreContext)
  const { latLang, coffeeStores } = state

  const handleCreateCoffeeStore = async (coffeeStore: any) => {
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
    })
    return createdCoffeeStore
  }

  useAsyncEffect(async () => {
    try {
      if (latLang) {
        const response = await fetch(
          `/api/getCoffeeStoreByLocation?latLang=${latLang}&limit=10`
        )
        const responseJson = await response.json()
        const coffeeStores = [...responseJson.results]
        coffeeStores.map((coffeeStore) => handleCreateCoffeeStore(coffeeStore))
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { ...state, coffeeStores },
        })
        setCoffeeStoresError('')
        // setCoffeeStores(coffeeStores)
      }
    } catch (error: any) {
      setCoffeeStoresError(error.message)
    }
  }, [latLang])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee crawl</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="description" content="allow to discover coffee stores" />
      </Head>
      <main className={styles.main}>
        <div className="pb-20">
          <Banner
            buttonText={isTrackLocation ? 'locating...' : 'view stores nearby'}
            handleBtnClick={handleOnBannerBtnClick}
          />
          <div aria-label="hero image" className={styles.heroImage}>
            <Image
              src="/static/hero-image.png"
              alt="hero image"
              fill={true}
              className="object-cover"
              unoptimized={!!process.env.IMAGE_UNOPTIMIZATION}
            />
          </div>
        </div>
        {locationErrorMsg && <p>someting went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>someting went wrong: {coffeeStoresError}</p>}
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading}>stores near me</h2>
            <div className="row">
              {coffeeStores.map((coffeeStore) => {
                return (
                  <div className={styles.col} key={coffeeStore.id}>
                    <Card
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading}>stores</h2>
            <div className="row">
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <div className={styles.col} key={coffeeStore.id}>
                    <Card
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
