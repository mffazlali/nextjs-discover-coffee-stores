import Head from "next/head";
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
        <Banner buttonText="view stores nearby" handleBtnClick={handleOnBannerBtnClick}></Banner>
      </main>
    </div>
  );
}
