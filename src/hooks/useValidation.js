import { useState, useCallback, useEffect } from "react";

const useValidation = (callback) => {
  const [nameValues, setNameValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [checkValidateEmail, setValidateEmail] = useState(false);
  const [checkValidity, setValidity] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    setNameValues({ ...nameValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    if (name === "email") {
      let validateEmail = value.split("@");

      if (validateEmail.length === 2) {
        let preparedEmail = validateEmail[1].toString().split(".");

        if (preparedEmail.length === 2) {
          setValidateEmail(
            preparedEmail[0] === "mail" ||
              ("yandex" && preparedEmail[1] === "ru") ||
              (preparedEmail[0] === "gmail" && preparedEmail[1] === "com")
          );
        }
      }
    }

    setValidity(target.closest("form").checkValidity());
  };

  useEffect(() => {
    setIsValid(checkValidity && checkValidateEmail);
  }, [checkValidateEmail, checkValidity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameValues.name && nameValues.email && nameValues.password) {
      callback(nameValues.name, nameValues.email, nameValues.password);
    } else if (nameValues.email && nameValues.password) {
      callback(nameValues.email, nameValues.password);
    } else {
      callback(nameValues.name, nameValues.email);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setNameValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setNameValues, setErrors, setIsValid]
  );

  return {
    handleChange,
    nameValues,
    errors,
    isValid,
    setNameValues,
    resetForm,
    handleSubmit,
  };
};

export default useValidation;
