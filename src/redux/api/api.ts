// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Paintings, Authors, Locations } from '../../types';

// export const Api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
//   endpoints: (builder) => ({
//     getPaintings: builder.query<Paintings[], string>({
//       query: (query) => ({ url: `/paintings?q=${query}`, method: 'GET' }),
//     }),
//     getAuthors: builder.query<Authors[], void>({
//       query: () => '/authors',
//     }),
//     getLocations: builder.query<Locations[], void>({
//       query: () => '/locations',
//     }),
//   }),
// });

// export const { useGetPaintingsQuery, useGetAuthorsQuery, useGetLocationsQuery } = Api;

// выше код принимает только помимо массива картин введеный текст фильтрации по имени 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Paintings, Authors, Locations } from '../../types';

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
  endpoints: (builder) => ({
    getPaintings: builder.query<
      Paintings[],
      {
        q?: string;
        authorId?: string;
        locationId?: string;
        created_gte?: string;
        created_lte?: string;
        _page?: number;
        _limit?: number;
      }
    >({
      query: ({
        q = '',
        authorId,
        locationId,
        created_gte,
        created_lte,
        _page = 1,
        _limit = 6,
      }) => {
        return {
          url: `/paintings`,
          method: 'GET',
          params: {
            q,
            authorId,
            locationId,
            created_gte,
            created_lte,
            _page,
            _limit,
          },
        };
      },
    }),
    getAuthors: builder.query<Authors[], void>({
      query: () => '/authors',
    }),
    getLocations: builder.query<Locations[], void>({
      query: () => '/locations',
    }),
  }),
});

export const { useGetPaintingsQuery, useGetAuthorsQuery, useGetLocationsQuery } = Api;
// сразу все параметры для фильтрации на сервере
