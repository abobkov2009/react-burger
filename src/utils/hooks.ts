import { useDispatch, useSelector } from 'react-redux';
import type { IRootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();


