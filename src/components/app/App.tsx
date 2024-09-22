import { Routes, Route, useLocation } from 'react-router-dom';

import { URLS } from '../../utils/constants';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

import { ForgotPasswordPage, HomePage, FeedPage, IngredientPage, LoginPage, NotfoundPage, OrderPage, ProfilePage, RegisterPage, ResetPasswordPage, UserInfoPage, OrderHistoryPage } from '../../pages';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css'

export default function App(): React.JSX.Element {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div className={appStyles.page}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path={URLS.HOMEPAGE} element={<HomePage />} />
                <Route path={URLS.FEED} element={<FeedPage />} />
                <Route path={URLS.NOT_FOUND} element={<NotfoundPage />} />
                <Route path={URLS.INGREDIENTS_ID} element={<IngredientPage />} />
                <Route path={URLS.FEED_ID} element={<OrderPage />} />

                <Route path={URLS.LOGIN} element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path={URLS.REGISTER} element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path={URLS.FORGOT_PASSWORD} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path={URLS.RESET_PASSWORD} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path={URLS.PROFILE_ORDERS_ID} element={<OnlyAuth component={<OrderPage />} />} />

                <Route path={URLS.PROFILE} element={<OnlyAuth component={<ProfilePage />} />} >
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
                    <Route path={URLS.FEED_ID} element={
                        <Modal>
                            <OrderDetails />
                        </Modal>
                    }
                    />
                    <Route path={URLS.PROFILE_ORDERS_ID} element={
                        <Modal>
                            <OrderDetails />
                        </Modal>
                    }
                    />
                </Routes>
            )}
        </div>
    )
};