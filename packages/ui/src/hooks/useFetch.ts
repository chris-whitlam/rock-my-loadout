import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from './useLogin';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export type FetchState<T> = {
  isLoading: boolean;
  data?: T;
  error?: unknown;
};

export type FetchCallback<T> = (url: string, data: any) => Promise<T>;

export type FetchHook<T> = (
  options?: FetchOptions
) => [FetchState<T>, FetchCallback<T>];

export type FetchOptions = {
  method: 'POST' | 'GET';
};

const useFetch: FetchHook<any> = (
  { method = 'GET' }: FetchOptions = { method: 'GET' }
) => {
  const [state, setState] = useState(initialState);
  const { getItem } = useLocalStorage();

  const makeRequest = async (url: string, body: unknown) => {
    const token = getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    try {
      setState({ ...initialState, isLoading: true });

      const response = await fetch(url, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(body)
      });

      const { payload } = await response.json();

      setState({ ...initialState, data: payload });

      return payload;
    } catch (error: any) {
      setState({ ...initialState, error });

      throw error;
    }
  };

  return [state, makeRequest];
};

export const usePost: FetchHook<any> = () => useFetch({ method: 'POST' });
export const useGet: FetchHook<any> = () => useFetch({ method: 'GET' });
