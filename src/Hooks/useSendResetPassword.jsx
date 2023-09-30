import axios from "axios";

const useResetPassword = () => {
  const SendRequest = (NewPassword, UserName, resetToken) => {
    let IsSuccess;
    let ErrorMessage;

    const requestData = {
      newPassword: NewPassword,
      resetToken: encodeURIComponent(resetToken),
    };
    return axios
      .post(
        `https://researchwizards.syntaxjuggler.com/api/User/password/change-confirm?userName=${UserName}`,
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
