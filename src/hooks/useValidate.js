import { useState } from "react";

const useValidate = (initialValue, length) => {
  const [value, setValue] = useState(initialValue);

  const validate = value.length < length;

  return { value, setValue, validate };
};

export default useValidate;
