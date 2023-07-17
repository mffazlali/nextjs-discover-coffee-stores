import styles from "./banner.module.css";
const Banner = (props: { buttonText: string; handleBtnClick: () => void }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>coffee</span>
        <span className={styles.title2}>connoisseur</span>
      </h1>
      <p className={styles.subTitle}>discover your local coffee shops!</p>
      <div className={styles.btnWrapper}>
        <button className={styles.button} onClick={props.handleBtnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
