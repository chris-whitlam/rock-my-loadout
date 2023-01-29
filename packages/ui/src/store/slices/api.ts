import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Weapon } from '@types';

interface Response {
  payload: any;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001/api/v1' }),
  endpoints: (builder) => ({
    fetchWeapons: builder.query<Weapon[], number | void>({
      query: (limit = 10) => {
        return `/weapons?limit=${limit}`;
      },
      transformResponse: (response: Response) => response.payload
    }),
    fetchWeapon: builder.query<Weapon, string>({
      query: (uuid: string) => {
        return `/weapons/${uuid}`;
      },
      transformResponse: (response: Response) => response.payload
    })
  })
});

export const { useFetchWeaponsQuery, useFetchWeaponQuery } = api;
