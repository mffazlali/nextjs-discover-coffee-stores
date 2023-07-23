import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import coffeeStoresData from '../store/coffee-stores.json'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import useAsyncEffect from 'use-async-effect'
import { useState } from 'react'

export const getStaticProps = async (context: any) => {
  const coffeeStores = await fetchCoffeeStores()
  return { props: { coffeeStores } }
}

export default function Home(props: { coffeeStores: any[] }) {
  const { locationErrorMsg, latLang, handleTrackLocation, isTrackLocation } =
    useTrackLocation()

  const [coffeeStores, setCoffeeStores] = useState<any[]>([])
  const [coffeeStoresError, setCoffeeStoresError] = useState<string>()

  useAsyncEffect(async () => {
    try {
      if(latLang){
      const coffeeStores = await fetchCoffeeStores('51.51039880064006,-0.12227748822612572')
      console.log({ coffeeStores })
      setCoffeeStores(coffeeStores)
      }
    } catch (error: any) {
      setCoffeeStoresError(error.message)
    }
  }, [latLang])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
    console.log({ latLang, locationErrorMsg })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee connoisseur</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isTrackLocation ? 'locating...' : 'view stores nearby'}
          handleBtnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image3.png"
            alt=""
            fill={true}
            className="object-cover"
          />
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
