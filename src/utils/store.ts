import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "../services";
//import { normaApi } from './api';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(normaApi.middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

