import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TAuthResponse, TOrder } from '../types';
import { NORMA_API_URL, NORMA_WS_FEED_ENDPOINT, NORMA_WS_PROFILE_FEED_ENDPOINT, NORMA_WS_URL } from '../../utils/constants';
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, saveTokensToLocalStorage } from '../../utils/local-storage';
import { authApi } from '../auth';

export type TFeedResponse = {
    success?: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
}
const emptyFeedData: TFeedResponse = {
    success: undefined,
    orders: [],
    total: 0,
    totalToday: 0
}

export const feedApi = createApi({
    reducerPath: 'feedApi',
    baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_URL }),
    endpoints: (builder) => ({
        getOrderInfo: builder.query<TOrder, string>({
            query: (orderNumber) => `/orders/${orderNumber}`,
            transformResponse: (response: Pick<TFeedResponse, "success" | "orders">) => {
                if (response.success === false) {
                    throw new Error('Запрос не вернул заявку');
                }
                if (response.orders.length < 1) {
                    throw new Error('Запрос не вернул заявку');
                }
                return response.orders[0];
            }
        }),
        getFeedData: builder.query<TFeedResponse, boolean>({
            queryFn: () => ({ data: emptyFeedData }),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
                let endpoint = NORMA_WS_FEED_ENDPOINT;
                if (arg) {
                    const accesstoken = getAccessTokenFromLocalStorage();
                    endpoint = `${NORMA_WS_PROFILE_FEED_ENDPOINT}?token=${accesstoken}`
                }
                let ws = new WebSocket(`${NORMA_WS_URL}${endpoint}`);
                try {
                    await cacheDataLoaded
                    const listener = async (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (arg && ("message" in data && data.message === "Invalid or missing token")) {
                            ws.close();
                            const refreshToken = getRefreshTokenFromLocalStorage();
                            if (refreshToken) {
                                const response = await dispatch(authApi.endpoints.refreshToken.initiate({ token: refreshToken }));
                                if (response.data) {
                                    const data = response.data as TAuthResponse;
                                    if (data.accessToken && data.refreshToken) {
                                        saveTokensToLocalStorage(data.accessToken, data.refreshToken);
                                        endpoint = `${NORMA_WS_PROFILE_FEED_ENDPOINT}?token=${data.accessToken}`
                                        ws = new WebSocket(`${NORMA_WS_URL}${endpoint}`);
                                        ws.addEventListener('message', listener);
                                    }
                                } else {
                                    console.log("token refresh failed!");
                                }
                            }
                        }
                        else if ("success" in data && data.success && "orders" in data) {
                            updateCachedData((draft) => Object.assign(draft, data))
                        }
                    };
                    ws.addEventListener('message', listener);
                } catch {
                }
                await cacheEntryRemoved
                ws.close()
            },
        }),
    }),
});

export const {
    useGetOrderInfoQuery,
    useGetFeedDataQuery,
} = feedApi;
