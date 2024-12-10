import { useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Retrieve stored value or use the initial value
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
