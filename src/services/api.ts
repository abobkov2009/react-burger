import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ingredientType } from './types';
import { NORMA_API_URL } from '../utils/constants';

type getResponseType = {
    success: boolean;
    data: ingredientType[];
}

type placeOrderArgsType = {
    ingredients: string[];
}

type placeOrderResponseType = {
    success: boolean;
    name: string;
    order: {
        number: number;
    }
}

export const normaApi = createApi({
    reducerPath: 'normaApi',
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
        placeOrder: builder.mutation<placeOrderResponseType, placeOrderArgsType>({
            query(body) {
                return {
                    url: '/orders',
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
});

export const {
    useGetIngredientsQuery,
    usePlaceOrderMutation
} = normaApi;
