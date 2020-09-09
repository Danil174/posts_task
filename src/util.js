import { useState, useEffect } from 'react';
import { DEBOUNCE_TIME, StatusCodes } from './const.js';

const checkStatus = (response) => {
  if (response.status >= StatusCodes.SUCCESS && response.status < StatusCodes.REDIRECTION) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

export const fetchData = (endpoint) => {
  return fetch(endpoint)
    .then(checkStatus)
    .then((res) => res.json())
};

export const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, DEBOUNCE_TIME);

      return () => {
        clearTimeout(handler);
      };
    }, [value]);

  return debouncedValue;
}
