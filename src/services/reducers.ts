import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-uuid';
import { ingredientType, ingredientWithUuidType } from './types';

export interface IngredientsState {
    currentIngredient: ingredientType | null,

    ingredientsInOrder: {
        bun: ingredientWithUuidType | null,
        stuffing: ingredientWithUuidType[],
    },
    order: boolean | null,
}

const initialState: IngredientsState = {
    currentIngredient: null,

    ingredientsInOrder: {
        bun: null,
        stuffing: [],
    },
    order: null,
};


export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        modalWindowClosed: (state)=>{
            state.currentIngredient = null;
            state.order = null;
        },
        currentIngredientWasSet: (state, action: PayloadAction<ingredientType>) => {
            state.currentIngredient = action.payload;
        },
        currentIngredientCleared: (state) => {
            state.currentIngredient = null;
        },
        ingredientsReordered: (state, action) =>{
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
        orderAccepted: (state) => {
            state.order = true;
        },
        orderCleared: (state) => {
            state.order = null;
        },
    },
})


export const { modalWindowClosed, currentIngredientWasSet, currentIngredientCleared,
    ingredientToOrderAdded, ingredientFromOrderRemoved, ingredientsReordered,
    orderAccepted } = ingredientsSlice.actions;


