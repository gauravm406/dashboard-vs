import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../providers/AuthProvider";

interface MutationState<T> {
  data: T | null;
  isLoading: boolean;
}

interface ErrorResponse {
  msg?: string;
}

export const useMutation = <T, P = unknown>(
  url: string,
  method: "POST" | "PUT" | "DELETE" = "POST"
): [(payload: P) => Promise<{ isError: boolean }>, MutationState<T>] => {
  const baseUrl: string = import.meta.env.VITE_API_HOST;
  const { setIsLoggedIn } = useAuthContext();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutate: (payload: P) => Promise<{ isError: boolean }> = useCallback(
    async (payload: P) => {
      setIsLoading(true);

      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url: `${baseUrl}/${url}`,
          data: payload,
          withCredentials: true,
        });

        setData(response.data);
        toast.success("Success!");
        return { isError: false };
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;

        const errorMessage =
          axiosError?.response?.data?.msg ||
          axiosError?.message ||
          "Something went wrong";

        if (axiosError.status === 401) {
          setIsLoggedIn(false);
        }

        toast.error(errorMessage);
        return { isError: true };
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return [mutate, { data, isLoading }];
};
