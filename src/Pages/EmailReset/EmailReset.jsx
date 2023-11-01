import React, { useState, useEffect } from "react";
import styles from "./EmailReset.module.css";

import Logo from "../../Components/Logo/Logo";
import Modal from "../../Components/Modal/Modal";
import Success from "../../Components/Success/Success";
import Error from "../../Components/Error/Error";
import { useParams } from "react-router-dom";
import useSendResetEmail from "../../Hooks/useSendResetEmail";

const EmailReset = () => {
  const { UserName, Email, resetToken } = useParams();
  const { SendRequest } = useSendResetEmail();
  const [IsSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SendRequest(UserName, Email, resetToken)
      .then(({ IsSuccess, ErrorMessage }) => {
        setIsSuccess(IsSuccess);
        setErrorMessage(ErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [UserName, Email, resetToken]);

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
                  ? "Email successfully changed"
                  : "Error changing email"}
              </p>
              {IsSuccess && (
                <p className={styles.Description}>
                  A confirmation message has been sent to the new email
                </p>
              )}
              {!IsSuccess && (
                <p className={styles.Description}>{errorMessage}</p>
              )}
              <button onClick={handleCloseClick}>Leave site</button>
            </>
          )}
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default EmailReset;
