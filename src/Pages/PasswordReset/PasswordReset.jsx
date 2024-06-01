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
  const [IsSuccessRequest, setIsSuccessRequest] = useState(false);
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
      setErrorText("Passwords do not match");
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
                <p className={styles.HeaderText}>Password Reset</p>
                <p className={styles.UserText}>for account {UserName}</p>
                <form
                  className={styles.ResetPasswordForm}
                  onSubmit={SubmitHandler}
                >
                  <section>
                    <label htmlFor="NewPassword">Enter New Password</label>
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
                    <label htmlFor="RepeatPassword">Repeat Password</label>
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
                  <button type="submit">Confirm</button>
                </form>
              </section>
            )}
            {IsSendRequest ? (
              <React.Fragment>
                {IsSuccessRequest ? (
                  <section className={styles.ContainSuccess}>
                    <Success />
                  </section>
                ) : (
                  <section className={styles.ContainError}>
                    <Error />
                  </section>
                )}
                <div className={styles.Contain}>
                  <p className={styles.HeaderText}>
                    {IsSuccessRequest
                      ? "Password Successfully Changed"
                      : "Error Changing Password"}
                  </p>
                  <p className={styles.Description}>{ErrorText}</p>
                  <button className={styles.Leave} onClick={handleCloseClick}>
                    Leave Site
                  </button>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default PasswordReset;
