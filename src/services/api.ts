import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ingredientType } from './types';
import { NORMA_API_URL } from '../utils/constants';

type responseType = {
    success: boolean;
    data: ingredientType[];
}

export const normaApi = createApi({
    reducerPath: 'normaApi',
    baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_URL }),
    endpoints: (builder) => ({
        getIngredients: builder.query<ingredientType[], void>({
            query: () => `/ingredients`,
            transformResponse: (response: responseType, meta, arg) => response.data,
        }),
    }),
});

export const { useGetIngredientsQuery } = normaApi;
