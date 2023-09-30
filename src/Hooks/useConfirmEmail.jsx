import axios from "axios";

const useConfirmEmail = () => {
  const SendRequest = (UserName, ConfirmToken) => {
    let IsSuccess;
    let ErrorMessage;

    const requestData = {
      token: encodeURIComponent(ConfirmToken),
    };

    return axios
      .get(
        `https://researchwizards.syntaxjuggler.com/api/User/email/confirm?userName=${UserName}`,
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

export default useConfirmEmail;
