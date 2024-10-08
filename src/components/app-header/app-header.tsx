import { Link, NavLink } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useFetchUserData } from '../../hooks';
import { URLS } from "../../utils/constants";
import headerStyles from './app-header.module.css'

export default function AppHeader(): React.JSX.Element {
    const { data: userInfo } = useFetchUserData();

    return (
        <header className={headerStyles.header}>
            <Link to={URLS.HOMEPAGE} className={headerStyles.logo}>
                <Logo />
            </Link>
            <nav className={`pt-4 pb-4 ${headerStyles.navigation}`}>
                <div className={headerStyles.navcontainer}>
                    <NavLink className={`p-5 ${headerStyles.navitem}`} to={URLS.HOMEPAGE}>
                        {({ isActive }: { isActive: boolean }) => (
                            <>
                                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                <p className={'ml-2 text text_type_main-default ' + (isActive ? `${headerStyles.activecaption}` : 'text_color_inactive')}>Конструктор</p>
                            </>
                        )}
                    </NavLink>
                    <NavLink className={`p-5 ${headerStyles.navitem}`} to={URLS.FEED}>
                        {({ isActive }: { isActive: boolean }) => (
                            <>
                                <ListIcon type={isActive ? "primary" : "secondary"} />
                                <p className={'ml-2 text text_type_main-default ' + (isActive ? `${headerStyles.activecaption}` : 'text_color_inactive')}>Лента заказов</p>
                            </>
                        )}
                    </NavLink>
                </div>
                <NavLink className={`p-5 ${headerStyles.navitem}`} to={URLS.PROFILE}>
                    {({ isActive }: { isActive: boolean }) => (
                        <>
                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                            <p className={'ml-2 text text_type_main-default ' + (isActive ? `${headerStyles.activecaption}` : 'text_color_inactive')}>
                                {userInfo ? userInfo.email : 'Личный кабинет'}
                            </p>
                        </>
                    )}
                </NavLink>
            </nav>
        </header>
    )
};
