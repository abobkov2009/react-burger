import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import { ingredientType } from '../utils/burger-api';

type ingredientWithUuidType = ingredientType & { _uuid: string }

export interface IngredientsState {
    ingredientsList: ingredientType[],
    ingredientsRequested: boolean,
    ingredientsFailed: boolean,
    ingredientsInOrder: { bun: ingredientWithUuidType | null, stuffing: ingredientWithUuidType[] },
    currentIngredient: ingredientType | null,
    isElementDrag: boolean
}

const initialState: IngredientsState = {
    ingredientsList: [],
    ingredientsRequested: false,
    ingredientsFailed: false,
    ingredientsInOrder: {
        bun: null,
        stuffing: [],
    },
    currentIngredient: null,
    isElementDrag: false
};


export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredientsStarted: (state) => {
            state.ingredientsRequested = true;
            state.ingredientsFailed = false;
        },
        getIngredientsFailed: (state) => {
            state.ingredientsRequested = false;
            state.ingredientsFailed = true;
        },
        getIngredientsSuccss: (state, action: PayloadAction<ingredientType[]>) => {
            state.ingredientsRequested = false;
            state.ingredientsList = action.payload;
        },
        setCurrentIngredient: (state, action: PayloadAction<ingredientType>) => {
            state.currentIngredient = action.payload;
        },
        clearCurrentIngredient: (state) => {
            state.currentIngredient = null;
        },
        addIngredientToOrder: (state, action: PayloadAction<ingredientType>) => {
            if (action.payload.type === "bun") {
                state.ingredientsInOrder.bun = { ...action.payload, _uuid: uuid() };
            } else {
                state.ingredientsInOrder.stuffing = [...state.ingredientsInOrder.stuffing, { ...action.payload, _uuid: uuid() }]
            }
        },
        deleteIngredientFromOrder: (state, action: PayloadAction<ingredientWithUuidType>) => {
            if (action.payload.type === "bun") {
                state.ingredientsInOrder.bun = null;
            } else {
                state.ingredientsInOrder.stuffing = state.ingredientsInOrder.stuffing.filter(ingredient => ingredient._uuid !== action.payload._uuid ? ingredient : null);
            }
        },
        resetOrder: (state) => {
            state.ingredientsInOrder = initialState.ingredientsInOrder;
        }
    },
})


export const { getIngredientsStarted, getIngredientsFailed, getIngredientsSuccss, setCurrentIngredient, clearCurrentIngredient,
    addIngredientToOrder, deleteIngredientFromOrder, resetOrder } = ingredientsSlice.actions

export default ingredientsSlice.reducer
