import { combineSlices } from '@reduxjs/toolkit'
import { authApi, authSlice } from './auth';
import { ingredientsApi } from './ingredients';
import { orderApi, orderSlice } from './order';
import { feedApi } from './feed';

export const rootReducer = combineSlices(authApi, authSlice, ingredientsApi, orderApi, orderSlice, feedApi )



