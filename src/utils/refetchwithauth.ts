import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

import { NORMA_API_URL } from './constants';
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, saveTokensToLocalStorage } from './local-storage';
import { authResponseType } from '../services/types';


const baseQuery = fetchBaseQuery({
    baseUrl: NORMA_API_URL,
    prepareHeaders: (headers) => {
        const token = getAccessTokenFromLocalStorage();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 403) {
        const refreshToken = getRefreshTokenFromLocalStorage();
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/token',
                    method: 'POST',
                    body : { token: refreshToken },
                }, api, extraOptions);
            if (refreshResult.data) {
                const data = refreshResult.data as authResponseType;
                if (data.accessToken && data.refreshToken) {
                    saveTokensToLocalStorage(data.accessToken, data.refreshToken);
                    result = await baseQuery(args, api, extraOptions)
                }
            } else {
                console.log("token refresh failed!");
            }
        }
    }
    return result
};