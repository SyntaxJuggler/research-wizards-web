import axios from "axios";

const useSendResetEmail = () => {
  const SendRequest = (UserName, Email, resetToken) => {
    let IsSuccess;
    let ErrorMessage;
    const requestData = { newEmail: Email };
    return axios
      .post(
        `https://localhost:7178/api/EmailManagment/ConfirmReset?userName=${UserName}&resetToken=${encodeURIComponent(
          resetToken
        )}`,
        requestData
      )
      .then((response) => {
        IsSuccess = response.data.isSuccess;

        return { IsSuccess, ErrorMessage };
      })
      .catch((error) => {
        return {
          IsSuccess: false,
          ErrorMessage: error.response.data.errorsMessages,
        };
      });
  };

  return { SendRequest };
};

export default useSendResetEmail;
