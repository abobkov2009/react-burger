import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from './reducers';
import { normaApi } from './api';

export const rootReducer = combineSlices(normaApi, ingredientsSlice)

