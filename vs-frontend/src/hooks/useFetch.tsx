import axios, { type AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../providers/AuthProvider";

export const useFetch = <T,>(
  url: string,
  params?: Record<string, any> // Added parameter for optional query params
): [T | null, boolean, AxiosError | null, () => void] => {
  const baseUrl = import.meta.env.VITE_API_HOST;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [invalidateNumber, setInvalidateNumber] = useState<number>(0);
  const { setIsLoggedIn } = useAuthContext();

  const invalidateQuery = useCallback(() => {
    setInvalidateNumber((prev) => prev + 1);
  }, []);

  // make request
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await axios.get<T>(`${baseUrl}/${url}`, {
          params,
          withCredentials: true,
        });

        setData(response?.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(
          axiosError?.response?.data?.msg ||
            axiosError?.message ||
            "Something went wrong"
        );
        setError(axiosError);

        if (axiosError.status === 401) {
          setIsLoggedIn(false);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, invalidateNumber, params, setIsLoggedIn]);

  return [data, isLoading, error, invalidateQuery];
};
