import { Navigate, useLocation } from 'react-router-dom';
import { useFetchUserData } from '../../hooks';
import { URLS } from '../../utils/constants';

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: React.ReactElement;
};

const ProtectedRoute = ({ onlyUnAuth = false, component }: ProtectedRouteProps) => {
    const location = useLocation();
    const { data: userInfo, isLoading } = useFetchUserData();

    if (isLoading) {
        return null;
    }

    if (onlyUnAuth && userInfo) {
        const from = location.state?.from || URLS.HOMEPAGE;
        return <Navigate to={from} replace />;
    }

    if (!onlyUnAuth && !userInfo) {
        return <Navigate to={URLS.LOGIN} state={{ from: location }} replace />;
    }

    return component;
}

type OnlyUnAuthProps = {
    component: React.ReactElement;
};

export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => <ProtectedRoute onlyUnAuth={true} component={component} />;

export const OnlyAuth = ProtectedRoute;