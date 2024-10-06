import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './api';
import { TUserInfo } from '../types';

export type AuthState = {
    user: TUserInfo | null,
}

export const initialState: AuthState = {
    user: null
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<TUserInfo>) => {
            state.user = action.payload;
        },
        userLoggedOut: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, action) => {
                if (action.payload.success && action.payload.user) {
                    state.user = action.payload.user;
                }
            })
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
                if (action.payload.success && action.payload.user) {
                    state.user = action.payload.user;
                }
            })
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state, action) => {
                if (action.payload.success) {
                    state.user = null;
                }
            })
            .addMatcher(authApi.endpoints.updateUserInfo.matchFulfilled, (state, action) => {
                if (action.payload.success && action.payload.user) {
                    state.user = action.payload.user;
                }
            })
    }
})
