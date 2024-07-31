import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NORMA_API_URL } from './constants';

export type ingredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

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
