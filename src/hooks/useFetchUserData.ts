import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo, useGetUserQuery } from '../services/auth';

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