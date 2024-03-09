import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [state, setState] = useState();

  useEffect(() => {
    const debounce = setTimeout(() => {
      setState(value);
    }, delay);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line
  }, [value]);

  return state;
};

export default useDebounce;
