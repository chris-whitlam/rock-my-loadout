import { useState } from 'react';

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

export type FetchCallback = (url: string, data: any) => Promise<void>;

export type FetchHook<T> = (
  options?: FetchOptions
) => [FetchState<T>, FetchCallback];

export type FetchOptions = {
  method: 'POST' | 'GET';
};

const useFetch: FetchHook<any> = (
  { method = 'GET' }: FetchOptions = { method: 'GET' }
) => {
  const [state, setState] = useState(initialState);

  const makeRequest = async (url: string, body: unknown) => {
    try {
      setState({ ...initialState, isLoading: true });

      const response = await fetch(url, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      setState({ ...initialState, data });
    } catch (error: any) {
      setState({ ...initialState, error });
    }
  };

  return [state, makeRequest];
};

export const usePost: FetchHook<any> = () => useFetch({ method: 'POST' });
export const useGet: FetchHook<any> = () => useFetch({ method: 'GET' });
