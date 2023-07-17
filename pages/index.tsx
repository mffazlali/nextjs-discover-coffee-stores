import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import coffeeStores from '../store/coffee-stores.json'

export default function Home() {
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
            objectFit='cover'
          />
        </div>
        <div className="row">
          {coffeeStores.map((coffeeStore) => {
            return (
              <div className="col">
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
