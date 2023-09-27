import styles from "./Error.module.css";

const Error = () => {
  return (
    <div>
      <div className={styles["circle-border"]}></div>
      <div className={styles.circle}>
        <div className={styles.error}></div>
      </div>
    </div>
  );
};

export default Error;
