import styles from "./Modal.module.css";

const Modal = (props) => {
  const { containerClassName, children } = props;

  return (
    <section className={`${styles.ModalContainer} ${containerClassName}`}>
      <section className={styles.Modal}>{children}</section>
    </section>
  );
};

export default Modal;
