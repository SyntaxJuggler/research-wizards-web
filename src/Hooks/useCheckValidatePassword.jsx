const useCheckValidatePassword = () => {
  const validatePassword = (password) => {
    let IsValid = true;
    let ErrorTextResult;

    const containsBothCases = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const containsDigit = /\d/.test(password);
    const containsOnlySpecialChars =
      /^[a-zA-Z0-9]*[-._@+*][-._@+*a-zA-Z0-9]*$/.test(password);

    if (password.trim() !== "") {
      if (password.length > 6) {
        if (containsBothCases) {
          if (containsDigit) {
            if (containsOnlySpecialChars) {
            } else {
              IsValid = false;
              ErrorTextResult =
                "Пароль не содержит спец-символы -._@+* либо содержит другие спец-символы";
            }
          } else {
            IsValid = false;
            ErrorTextResult = "Пароль не содержит 1 цифру";
          }
        } else {
          IsValid = false;
          ErrorTextResult =
            "Пароль не содержит английский символ верхнего и нижнего регистра";
        }
      } else {
        IsValid = false;
        ErrorTextResult = "Пароль должен быть больше 6 символов";
      }
    } else {
      IsValid = false;
      ErrorTextResult = "Пароль пустой";
    }

    return { ErrorTextResult, IsValid };
  };

  return { validatePassword };
};

export default useCheckValidatePassword;
