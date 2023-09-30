import React, { useState, useEffect } from "react";
import styles from "./EmailConfirm.module.css";

import Logo from "../../Components/Logo/Logo";
import Modal from "../../Components/Modal/Modal";
import Success from "../../Components/Success/Success";
import Error from "../../Components/Error/Error";
import { useParams } from "react-router-dom";
import useConfirmEmail from "../../Hooks/useConfirmEmail";

const EmailConfirm = () => {
  const { SendRequest } = useConfirmEmail();
  const [IsSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { UserName, ConfirmToken } = useParams();

  useEffect(() => {
    SendRequest(UserName, ConfirmToken)
      .then(({ IsSuccess, ErrorMessage }) => {
        setIsSuccess(IsSuccess);
        setErrorMessage(ErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [UserName, ConfirmToken]);

  const handleCloseClick = () => {
    window.close();
  };

  return (
    <React.Fragment>
      <Logo />
      <Modal>
        {isLoading ? (
          <section className={styles.Loading}>
            <p>Loading...</p>
          </section>
        ) : IsSuccess ? (
          <section className={styles.ContainSuccess}>
            <Success />
          </section>
        ) : (
          <section className={styles.ContainError}>
            <Error />
          </section>
        )}
        <section className={styles.Contain}>
          {!isLoading && (
            <>
              <p>
                {IsSuccess
                  ? "Почта успешно подтверждена"
                  : "Ошибка подтверждения почты"}
              </p>
              <p className={styles.Description}>{errorMessage}</p>
              <button onClick={handleCloseClick}>Покинуть сайт</button>
            </>
          )}
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default EmailConfirm;
