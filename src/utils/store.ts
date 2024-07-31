import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "../services/rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

