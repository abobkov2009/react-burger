import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { URLS } from '../../utils/constants';
import AppHeader from '../app-header/app-header';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotfoundPage, ProfilePage, RegisterPage, ResetPasswordPage, UserInfoPage, OrderHistoryPage } from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import appStyles from './app.module.css'

export default function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        location.state = null;
    }, []);

    return (
        <div className={appStyles.page}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path={URLS.HOMEPAGE} element={<HomePage />} />
                <Route path={URLS.LOGIN} element={<LoginPage />} />
                <Route path={URLS.REGISTER} element={<RegisterPage />} />
                <Route path={URLS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={URLS.RESET_PASSWORD} element={<ResetPasswordPage />} />
                <Route path={URLS.INGREDIENTS_ID} element={<IngredientPage />} />
                <Route path={URLS.NOT_FOUND} element={<NotfoundPage />} />
                <Route path={URLS.PROFILE} element={<ProtectedRouteElement element={<ProfilePage />} />} >
                    <Route index element={<UserInfoPage />} />
                    <Route path={URLS.PROFILE_ORDERS} element={<OrderHistoryPage />} />
                </Route>
            </Routes>

            {background && (
                <Routes>
                    <Route path={URLS.INGREDIENTS_ID} element={
                        <Modal>
                            <IngredientDetails />
                        </Modal>
                    }
                    />
                </Routes>
            )}
        </div>
    )
};

