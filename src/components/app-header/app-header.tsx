import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import HeaderItem from './header-item/header-item'

import headerStyles from './app-header.module.css'

export default function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={`pt-4 pb-4 ${headerStyles.navigation}`}>
                <div className={headerStyles.navcontainer}>
                    <HeaderItem
                        icon={<BurgerIcon type="primary" />}
                        caption="Конструктор"
                        url="#"
                    />
                    <HeaderItem
                        icon={<ListIcon type="secondary" />}
                        caption="Лента заказов"
                        isActive={false}
                        url="#"
                    />
                </div>
                <HeaderItem
                    icon={<ProfileIcon type="secondary" />}
                    caption="Личный кабинет"
                    isActive={false}
                    url="#"
                />
            </nav>
        </header>
    )
};