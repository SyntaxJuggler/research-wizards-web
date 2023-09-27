import axios from "axios";

const useResetPassword = () => {
  const SendRequest = (NewPassword, UserName, resetToken) => {
    let IsSuccess;
    let ErrorMessage;

    const requestData = { newPassword: NewPassword };
    return axios
      .post(
        `https://localhost:7178/api/UserPasswordManagment/reset?username=${UserName}&resetToken=${encodeURIComponent(
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

export default useResetPassword;
