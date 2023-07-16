import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.css";
import Banner from "./banner";

export default function Home() {
  const handleOnBannerBtnClick=()=>{
    console.log('ok')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee connoisseur</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="view stores nearby" handleBtnClick={handleOnBannerBtnClick}/>
        <div className={styles.heroImage}>
        <Image src='/static/hero-image3.png' alt="" width={600} height={400}/>
        </div>
      </main>
    </div>
  );
}
