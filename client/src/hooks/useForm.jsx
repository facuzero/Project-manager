import { useState } from "react";

export const useForm = (intialState = {}) => {
  const [formValues, setformValues] = useState(intialState);

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setformValues(intialState);
  };

  return {
    formValues,
    handleInputChange,
    reset,
    setformValues,
  };
};
