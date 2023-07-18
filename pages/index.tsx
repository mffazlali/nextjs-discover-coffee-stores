import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import coffeeStoresData from '../store/coffee-stores.json'

export const getStaticProps = async (context: any) => {
  console.log('hi get static props')
  return { props: { coffeeStoresData } }
}

export default function Home(props: { coffeeStores: any[] }) {
  const handleOnBannerBtnClick = () => {
    console.log('ok')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee connoisseur</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="view stores nearby"
          handleBtnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image3.png"
            alt=""
            fill={true}
            objectFit="cover"
          />
        </div>
        <div className="row">
          {props.coffeeStores.map((coffeeStore) => {
            return (
              <div className="col" key={coffeeStore.id}>
                <Card
                  name={coffeeStore.name}
                  imgUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`}
                />
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
