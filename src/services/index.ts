import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsSlice';
//import { orderReducer } from './orderReducer';
import modalReducer from './modalSlice';
//import { normaApi } from '../utils/api';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modals: modalReducer,
    //[normaApi.reducerPath] : normaApi.reducer,
    //orderData: orderReducer,
});