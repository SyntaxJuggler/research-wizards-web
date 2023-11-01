const useCheckValidatePassword = () => {
  const validatePassword = (password) => {
    let isValid = true;
    let errorTextResult;

    const containsBothCases = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const containsDigit = /\d/.test(password);
    const containsOnlySpecialChars =
      /^[a-zA-Z0-9]*[-._@+*][-._@+*a-zA-Z0-9]*$/.test(password);

    if (password.trim() !== "") {
      if (password.length > 6) {
        if (containsBothCases) {
          if (containsDigit) {
            if (!containsOnlySpecialChars) {
              isValid = false;
              errorTextResult =
                "Password does not contain special characters -._@+* or contains other special characters";
            }
          } else {
            isValid = false;
            errorTextResult = "Password does not contain a digit";
          }
        } else {
          isValid = false;
          errorTextResult =
            "Password does not contain both uppercase and lowercase English letters";
        }
      } else {
        isValid = false;
        errorTextResult = "Password must be more than 6 characters";
      }
    } else {
      isValid = false;
      errorTextResult = "Password is empty";
    }

    return { errorTextResult, isValid };
  };

  return { validatePassword };
};

export default useCheckValidatePassword;
