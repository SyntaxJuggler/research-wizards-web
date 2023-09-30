import axios from "axios";

const useSendResetEmail = () => {
  const SendRequest = (UserName, Email, resetToken) => {
    let IsSuccess;
    let ErrorMessage;

    const requestData = {
      newEmail: Email,
      resetToken: encodeURIComponent(resetToken),
    };
    return axios
      .post(
        `https://researchwizards.syntaxjuggler.com/api/User/email/change-confirm?userName=${UserName}`,
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
