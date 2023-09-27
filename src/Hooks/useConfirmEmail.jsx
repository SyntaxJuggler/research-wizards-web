import axios from "axios";

const useConfirmEmail = () => {
  const SendRequest = (UserName, ConfirmToken) => {
    let IsSuccess;
    let ErrorMessage;

    return axios
      .get(
        `https://localhost:7178/api/EmailManagment/Confirm?userName=${UserName}&token=${encodeURIComponent(
          ConfirmToken
        )}`
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

export default useConfirmEmail;
