import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './api';
import { userInfoType } from '../types';

export interface AuthState {
    user: userInfoType | null,
}

const initialState: AuthState = {
    user: null
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogedIn: (state, action: PayloadAction<userInfoType>) => {
            state.user = action.payload;
        },
        userLogedOut: (state) => {
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
