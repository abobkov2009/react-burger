import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientTabsStyles from './ingredients-tabs.module.css';

export default function IngredientsTabs() {
    const [selectedTab, setSelectedTab] = useState('buns')

    return (
        <div className={`${ingredientTabsStyles.container} mb-10`}>
            <Tab value="buns" active={selectedTab === 'buns'} onClick={setSelectedTab}>Булки</Tab>
            <Tab value="sauces" active={selectedTab === 'sauces'} onClick={setSelectedTab}>Соусы</Tab>
            <Tab value="fillings" active={selectedTab === 'fillings'} onClick={setSelectedTab}>Начинки</Tab>
        </div>
    )
};