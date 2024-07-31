import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ingredientType } from '../utils/burger-api';

export interface IngredientsState {
    ingredientsList: ingredientType[],
    ingredientsRequested: boolean,
    ingredientsFailed: boolean,
    ingredientsInOrder: { bun: ingredientType | null, stuffing: ingredientType[] },
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
        }
    },
})


export const { getIngredientsStarted, getIngredientsFailed, getIngredientsSuccss, setCurrentIngredient } = ingredientsSlice.actions

export default ingredientsSlice.reducer
