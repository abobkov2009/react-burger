import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchQueryWithReauth } from '../../utils/refetchwithauth';
import { TUserInfo, TAuthResponse } from '../types';

type TRegisterUserArgs = {
    email: string;
    password: string;
    name: string;
}
type TLoginUserArgs = {
    email: string;
    password: string;
}
type TRequestPasswordResetArgs = {
    email: string;
}
type TConfirmPasswordResetArgs = {
    password: string;
    token: string;
}
type TRefreshAndLogoutTokenArgs = {
    token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchQueryWithReauth,
    endpoints: (builder) => ({
        registerUser: builder.mutation<TAuthResponse, TRegisterUserArgs>({
            query(body) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                }
            },
        }),
        loginUser: builder.mutation<TAuthResponse, TLoginUserArgs>({
            query(body) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),
        logoutUser: builder.mutation<TAuthResponse, TRefreshAndLogoutTokenArgs>({
            query(body) {
                return {
                    url: '/auth/logout',
                    method: 'POST',
                    body,
                }
            },
        }),
        refreshToken: builder.mutation<TAuthResponse, TRefreshAndLogoutTokenArgs>({
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
        updateUserInfo: builder.mutation<TAuthResponse, TRegisterUserArgs>({
            query(body) {
                return {
                    url: '/auth/user',
                    method: 'PATCH',
                    body,
                }
            },
        }),
        requestPasswordReset: builder.mutation<TAuthResponse, TRequestPasswordResetArgs>({
            query(body) {
                return {
                    url: '/password-reset',
                    method: 'POST',
                    body,
                }
            },
        }),
        confirmPasswordReset: builder.mutation<TAuthResponse, TConfirmPasswordResetArgs>({
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
