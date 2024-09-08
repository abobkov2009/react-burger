import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchQueryWithReauth } from '../../utils/refetchwithauth';

type TPlaceOrderArgs = {
    ingredients: string[];
}

type TPlaceOrderResponse = {
    success: boolean;
    name: string;
    order: {
        number: number;
    }
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchQueryWithReauth,
    endpoints: (builder) => ({
        placeOrder: builder.mutation<TPlaceOrderResponse, TPlaceOrderArgs>({
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
    usePlaceOrderMutation
} = orderApi;
