import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ingredientType } from '../types';
import { NORMA_API_URL } from '../../utils/constants';

type getResponseType = {
    success: boolean;
    data: ingredientType[];
}

export const ingredientsApi = createApi({
    reducerPath: 'ingredientsApi',
    baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_URL }),
    endpoints: (builder) => ({
        getIngredients: builder.query<ingredientType[], void>({
            query: () => `/ingredients`,
            transformResponse: (response: getResponseType) => {
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
