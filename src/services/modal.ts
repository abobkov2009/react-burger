import { createAction, createReducer } from '@reduxjs/toolkit'

export const showOrderDetailsModalWindow = createAction('SHOW_ORDER_DETAILS_MODAL');
export const showIngredientModalWindow = createAction('SHOW_INGREDIENT_MODAL');
export const closeAllModalWindows = createAction('CLOSE_ALL_MODALS');

const initialState = {
    isOrderDetailsModalOpen: false,
    isIngredientModalOpen: false,
};

export const modalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(showOrderDetailsModalWindow, (state, action) => {
            state.isOrderDetailsModalOpen = true;
        })
        .addCase(showIngredientModalWindow, (state, action) => {
            state.isIngredientModalOpen = true;
        })
        .addCase(closeAllModalWindows, (state, action) => {
            state.isOrderDetailsModalOpen = false;
            state.isIngredientModalOpen = false;
        })
});