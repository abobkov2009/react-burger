import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    isOrderDetailsModalOpen: boolean,
    isIngredientModalOpen: boolean,
}

const initialState: ModalState = {
    isOrderDetailsModalOpen: false,
    isIngredientModalOpen: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showOrderDetailsModalWindow: (state) => {
            state.isOrderDetailsModalOpen = true;
        },
        showIngredientModalWindow: (state) => {
            state.isIngredientModalOpen = true;
        },
        closeAllModalWindows: (state) => {
            state.isOrderDetailsModalOpen = false;
            state.isIngredientModalOpen = false;
        },
    },
})


export const { showOrderDetailsModalWindow, showIngredientModalWindow, closeAllModalWindows } = modalSlice.actions

export default modalSlice.reducer

