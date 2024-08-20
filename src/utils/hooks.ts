import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { IRootState, AppDispatch } from './store';
import { selectUserInfo, useGetUserQuery } from '../services/auth';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();


export const useFetchUserData = () => {
    const userInfo = useSelector(selectUserInfo);
    const { data, error, isLoading, refetch } = useGetUserQuery(undefined, { skip: !!userInfo });
    // Effect to refetch if no data exists in the store
    useEffect(() => {
        if (!userInfo) {
            refetch();
        }
    }, [userInfo, refetch]);

    return { data: userInfo || data, error, isLoading };
};