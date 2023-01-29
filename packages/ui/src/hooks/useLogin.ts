import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePost } from './useFetch';
import { useLocalStorage } from './useLocalStorage';

interface LoginParams {
  username: string;
  password: string;
}

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'access_token';

export const useLogin = () => {
  const [state, makeRequest] = usePost();
  const { saveItem, getItem, deleteItem } = useLocalStorage();
  const navigate = useNavigate();

  const login = useCallback(
    async ({ username, password }: LoginParams) => {
      const body = {
        username,
        password
      };

      const { token } = await makeRequest(
        'http://localhost:4001/api/v1/auth/login',
        body
      );

      saveItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
      navigate(-1);
    },
    [makeRequest, saveItem]
  );

  const signOut = useCallback(() => {
    deleteItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    navigate('/');
  }, [deleteItem]);

  return {
    ...state,
    isLoggedIn: !!getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY),
    login,
    signOut
  };
};
