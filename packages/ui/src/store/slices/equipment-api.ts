import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Weapon } from '@types';

export const equipmentApi = createApi({
  reducerPath: 'equipment',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001/equipment/v1' }),
  endpoints: (builder) => ({
    fetchWeapons: builder.query<Weapon[], number | void>({
      query: (limit = 10) => {
        return `/weapons?limit=${limit}`;
      }
    }),
    fetchWeapon: builder.query<Weapon, string>({
      query: (uuid: string) => {
        return `/weapons/${uuid}`;
      }
    })
  })
});

export const { useFetchWeaponsQuery, useFetchWeaponQuery } = equipmentApi;
