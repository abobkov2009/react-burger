import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchQueryWithReauth } from '../../utils/refetchwithauth';
import { userInfoType, authResponseType } from '../types';

type registerUserArgsType = {
    email: string;
    password: string;
    name: string;
}
type loginUserArgsType = {
    email: string;
    password: string;
}
type requestPasswordResetArgsType = {
    email: string;
}
type confirmPasswordResetArgsType = {
    password: string;
    token: string;
}
type refreshAndLogoutTokenArgsType = {
    token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchQueryWithReauth,
    endpoints: (builder) => ({
        registerUser: builder.mutation<authResponseType, registerUserArgsType>({
            query(body) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                }
            },
        }),
        loginUser: builder.mutation<authResponseType, loginUserArgsType>({
            query(body) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),
        logoutUser: builder.mutation<authResponseType, refreshAndLogoutTokenArgsType>({
            query(body) {
                return {
                    url: '/auth/logout',
                    method: 'POST',
                    body,
                }
            },
        }),
        refreshToken: builder.mutation<authResponseType, refreshAndLogoutTokenArgsType>({
            query(body) {
                return {
                    url: '/auth/token',
                    method: 'POST',
                    body,
                }
            },
        }),
        getUser: builder.query<userInfoType | undefined, void>({
            query: () => `/auth/user`,
            transformResponse: (response: authResponseType) => {
                if (response.success === false) {
                    throw new Error('Данные не получены');
                }
                return response.user;
            }
        }),
        updateUserInfo: builder.mutation<authResponseType, registerUserArgsType>({
            query(body) {
                return {
                    url: '/auth/user',
                    method: 'PATCH',
                    body,
                }
            },
        }),
        requestPasswordReset: builder.mutation<authResponseType, requestPasswordResetArgsType>({
            query(body) {
                return {
                    url: '/password-reset',
                    method: 'POST',
                    body,
                }
            },
        }),
        confirmPasswordReset: builder.mutation<authResponseType, confirmPasswordResetArgsType>({
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
