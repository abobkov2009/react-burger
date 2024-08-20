import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-uuid';
import { ingredientType, ingredientWithUuidType } from '../types';
import { orderApi } from './api';

export interface OrderState {
    ingredientsInOrder: {
        bun: ingredientWithUuidType | null,
        stuffing: ingredientWithUuidType[],
    },
    orderData: {
        name: string,
        order: {
            number: number,
        }
        success: boolean,
    } | null
}

const initialState: OrderState = {
    ingredientsInOrder: {
        bun: null,
        stuffing: [],
    },
    orderData: null,
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        selectIngredientsInOrder: state => state.ingredientsInOrder,
        selectOrderData: state => state.orderData,
    },
    reducers: {
        ingredientsReordered: (state, action) => {
            const { dragIndex, hoverIndex } = action.payload;
            if (dragIndex >= 0 && dragIndex < state.ingredientsInOrder.stuffing.length &&
                hoverIndex >= 0 && hoverIndex < state.ingredientsInOrder.stuffing.length) {
                const [movedIngredient] = state.ingredientsInOrder.stuffing.splice(dragIndex, 1);
                state.ingredientsInOrder.stuffing.splice(hoverIndex, 0, movedIngredient);
            }
        },
        ingredientToOrderAdded: {
            reducer: (state, action: PayloadAction<ingredientType>) => {
                if (action.payload.type === "bun") {
                    state.ingredientsInOrder.bun = action.payload;
                } else {
                    state.ingredientsInOrder.stuffing.push(action.payload);
                }
            },
            prepare: (ingredient: ingredientType) => {
                return { payload: { ...ingredient, _uuid: uuid() } }
            },
        },
        ingredientFromOrderRemoved: (state, action: PayloadAction<ingredientWithUuidType>) => {
            if (action.payload.type === "bun") {
                state.ingredientsInOrder.bun = null;
            } else {
                state.ingredientsInOrder.stuffing = state.ingredientsInOrder.stuffing.filter(ingredient => ingredient._uuid !== action.payload._uuid ? ingredient : null);
            }
        },
        allIngredientsInOrderRemoved: (state) => {
            state.ingredientsInOrder = initialState.ingredientsInOrder;
        },
        orderPlaced: (state, action) => {
            state.orderData = action.payload;
        },
        orderCleared: (state) => {
            state.orderData = null;
            state.ingredientsInOrder = initialState.ingredientsInOrder;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(orderApi.endpoints.placeOrder.matchFulfilled, (state, action) => {
                if (action.payload && action.payload.success) {
                    state.orderData = action.payload;
                }
            })
    }
})


export const {
    ingredientToOrderAdded,
    ingredientFromOrderRemoved,
    ingredientsReordered,
    orderPlaced,
    orderCleared,
} = orderSlice.actions;

export const {
    selectIngredientsInOrder,
    selectOrderData,
} = orderSlice.getSelectors();

