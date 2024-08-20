import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "../services";
import { authApi } from '../services/auth';
import { ingredientsApi } from '../services/ingredients';
import { orderApi } from '../services/order';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, orderApi.middleware, ingredientsApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

