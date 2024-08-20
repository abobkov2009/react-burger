import { Navigate } from 'react-router-dom';
import { useFetchUserData } from '../../utils/hooks';
import { URLS } from '../../utils/constants';

type ProtectedRouteElementProps = {
    element: React.ReactElement;
};

export default function ProtectedRouteElement({ element }: ProtectedRouteElementProps) {
    const { data: userInfo, isLoading } = useFetchUserData();

    if (isLoading) {
        return null;
    }

    return userInfo ? element : <Navigate to={URLS.LOGIN} replace />;
};