import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TIngredient } from '../types';
import { NORMA_API_URL } from '../../utils/constants';

export type TGetResponse = {
    success: boolean;
    data: TIngredient[];
}

export const ingredientsApi = createApi({
    reducerPath: 'ingredientsApi',
    baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_URL }),
    endpoints: (builder) => ({
        getIngredients: builder.query<TIngredient[], void>({
            query: () => `/ingredients`,
            transformResponse: (response: TGetResponse) => {
                if (response.success === false) {
                    throw new Error('Запрос не вернул ингредиенты');
                }
                return response.data;
            }
        }),
    }),
});

export const {
    useGetIngredientsQuery,
} = ingredientsApi;
