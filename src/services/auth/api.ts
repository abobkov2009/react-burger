import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchQueryWithReauth } from '../../utils/refetchwithauth';
import { TUserInfo, TAuthResponse } from '../types';

type TAuthArgs = {
    email: string;
    password: string;
    name: string;
    token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchQueryWithReauth,
    endpoints: (builder) => ({
        registerUser: builder.mutation<TAuthResponse, Pick<TAuthArgs, "email" | "password" | "name">>({
            query(body) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                }
            },
        }),
        loginUser: builder.mutation<TAuthResponse, Pick<TAuthArgs, "email" | "password">>({
            query(body) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),
        logoutUser: builder.mutation<TAuthResponse, Pick<TAuthArgs, "token">>({
            query(body) {
                return {
                    url: '/auth/logout',
                    method: 'POST',
                    body,
                }
            },
        }),
        refreshToken: builder.mutation<TAuthResponse, Pick<TAuthArgs, "token">>({
            query(body) {
                return {
                    url: '/auth/token',
                    method: 'POST',
                    body,
                }
            },
        }),
        getUser: builder.query<TUserInfo | undefined, void>({
            query: () => `/auth/user`,
            transformResponse: (response: TAuthResponse) => {
                if (response.success === false) {
                    throw new Error('Данные не получены');
                }
                return response.user;
            }
        }),
        updateUserInfo: builder.mutation<TAuthResponse, Pick<TAuthArgs, "email" | "password" | "name">>({
            query(body) {
                return {
                    url: '/auth/user',
                    method: 'PATCH',
                    body,
                }
            },
        }),
        requestPasswordReset: builder.mutation<TAuthResponse, Pick<TAuthArgs, "email">>({
            query(body) {
                return {
                    url: '/password-reset',
                    method: 'POST',
                    body,
                }
            },
        }),
        confirmPasswordReset: builder.mutation<TAuthResponse, Pick<TAuthArgs, "password" | "token">>({
            query(body) {
                return {
                    url: '/password-reset/reset',
                    method: 'POST',
                    body,
                }
            },
        }),

    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshTokenMutation,
    useGetUserQuery,
    useUpdateUserInfoMutation,
    useRequestPasswordResetMutation,
    useConfirmPasswordResetMutation,
} = authApi;
