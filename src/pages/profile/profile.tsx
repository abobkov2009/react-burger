import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { getRefreshTokenFromLocalStorage } from '../../utils/local-storage';

import { useLogoutUserMutation } from '../../services/auth';
import { clearTokensInLocalStorage } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import styles from './profile.module.css';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [logoutUserTriger] = useLogoutUserMutation();

    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const refreshToken = getRefreshTokenFromLocalStorage();
        if (refreshToken != null) {
            try {
                const logoutResult = await logoutUserTriger({ token: refreshToken }).unwrap();
                if (logoutResult.success) {
                    clearTokensInLocalStorage();                    
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        //Переход на страницу login в любом случае
        navigate(URLS.LOGIN);
    }

    return (
        <main className={styles.mainContent}>
            <nav className={`mr-15 ${styles.navmenu}`}>
                <NavLink to={URLS.PROFILE} end className={({ isActive }) => `${styles.navLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
                    Профиль
                </NavLink>
                <NavLink to={`${URLS.PROFILE}/${URLS.PROFILE_ORDERS}`} end className={({ isActive }) => `${styles.navLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
                    История заказов
                </NavLink>
                <NavLink to={URLS.LOGIN} end onClick={handleLogout} className={({ isActive }) => `${styles.navLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
                    Выход
                </NavLink>
                <p className='mt-20 text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <div className={styles.outletdiv}>
                <Outlet />
            </div>
        </main>
    )
};