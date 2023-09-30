import React from "react";
import styles from "./PasswordReset.module.css";

import Logo from "../../Components/Logo/Logo";
import Modal from "../../Components/Modal/Modal";
import Success from "../../Components/Success/Success";
import Error from "../../Components/Error/Error";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import useCheckValidatePassword from "../../Hooks/useCheckValidatePassword";
import useResetPassword from "../../Hooks/useSendResetPassword";

const PasswordReset = () => {
  const { UserName, resetToken } = useParams();
  const [ErrorText, setErrorText] = useState("");
  const [IsSuсcessRequst, setIsSuccessRequest] = useState(false);
  const [IsSendRequest, setIsSendRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { SendRequest } = useResetPassword();

  const NewPassword = useRef();
  const RepeatPassword = useRef();

  const { validatePassword } = useCheckValidatePassword();
  const [IsValidPassword, setPasswordValid] = useState(true);

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (
      NewPassword.current.value.trim() === RepeatPassword.current.value.trim()
    ) {
      const { ErrorTextResult, IsValid } = validatePassword(
        NewPassword.current.value
      );

      setErrorText(ErrorTextResult);
      setPasswordValid(IsValid);

      if (IsValidPassword) {
        setIsLoading(true);
        SendRequest(NewPassword.current.value, UserName, resetToken).then(
          ({ IsSuccess, ErrorMessage }) => {
            setIsSuccessRequest(IsSuccess);
            setErrorText(ErrorMessage);
            setIsSendRequest(true);
            setIsLoading(false);
          }
        );
      }
    } else {
      setErrorText("Пароли не совпадают");
      setPasswordValid(false);
      setIsLoading(false);
    }
  };

  const inputOnFocus = () => {
    setPasswordValid(true);
  };

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
        ) : (
          <React.Fragment>
            {!IsSendRequest && (
              <section className={styles.MainResetContain}>
                <p className={styles.HeaderText}>Смена пароля</p>
                <p className={styles.UserText}>для аккаунта {UserName}</p>
                <form
                  className={styles.ResetPasswordForm}
                  onSubmit={SubmitHandler}
                >
                  <section>
                    <label htmlFor="NewPassword">Введите новый пароль</label>
                    <input
                      className={`${
                        !IsValidPassword ? styles.NotValidBorder : ""
                      } `}
                      name="NewPassword"
                      type="password"
                      ref={NewPassword}
                      onFocus={inputOnFocus}
                    />
                  </section>
                  <section>
                    <label htmlFor="RepeatPassword">Повторите пароль</label>
                    <input
                      className={`${
                        !IsValidPassword ? styles.NotValidBorder : ""
                      } `}
                      name="RepeatPassword"
                      type="password"
                      ref={RepeatPassword}
                      onFocus={inputOnFocus}
                    />
                  </section>
                  {!IsValidPassword && ErrorText && (
                    <p className={styles.ErrorText}>{ErrorText}</p>
                  )}
                  <button type="submit">Подтвердить</button>
                </form>
              </section>
            )}
            {IsSendRequest ? (
              <div className={styles.Contain}>
                {IsSuсcessRequst ? (
                  <section className={styles.ContainSuccess}>
                    <Success />
                  </section>
                ) : (
                  <section className={styles.ContainError}>
                    <Error />
                  </section>
                )}
                <p className={styles.HeaderText}>
                  {IsSuсcessRequst
                    ? "Пароль успешно изменён"
                    : "Ошибка смены пароля"}
                </p>
                <p className={styles.Description}>{ErrorText}</p>
                <button className={styles.Leave} onClick={handleCloseClick}>
                  Покинуть сайт
                </button>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default PasswordReset;
