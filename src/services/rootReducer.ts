import { combineReducers } from 'redux';
//import { ingredientsReducer } from './ingredientsReducer';
import { modalReducer } from './modal';
//import { orderReducer } from './orderReducer';


export const rootReducer = combineReducers({
    //ingredients: ingredientsReducer,    
    modalState: modalReducer,
    //orderData: orderReducer,
   });