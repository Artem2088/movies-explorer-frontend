import { useState, useCallback } from "react";

const useValidation = (callback) => {
  const [nameValues, setNameValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setNameValues({ ...nameValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

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
