import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientTabsStyles from './ingredients-tabs.module.css';

type IngredientsTabsProps = {
    currentCategory: string;
    onTabClick: (type: string) => void;
};

export default function IngredientsTabs({ currentCategory, onTabClick }: IngredientsTabsProps) {
    return (
        <div className={`${ingredientTabsStyles.container} mb-10`}>
            <Tab value="buns" active={currentCategory === 'buns'} onClick={onTabClick}>Булки</Tab>
            <Tab value="sauces" active={currentCategory === 'sauces'} onClick={onTabClick}>Соусы</Tab>
            <Tab value="mains" active={currentCategory === 'mains'} onClick={onTabClick}>Начинки</Tab>
        </div>
    )
};