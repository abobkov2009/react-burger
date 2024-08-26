import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientTabsStyles from './ingredients-tabs.module.css';

type TIngredientsTabsProps = {
    selectedCategory: string;
    onTabClick: (type: string) => void;
};

const IngredientsTabs: React.FC<TIngredientsTabsProps> = ({ selectedCategory, onTabClick }) => {
    return (
        <div className={`${ingredientTabsStyles.container} mb-10`}>
            <Tab value="buns" active={selectedCategory === 'buns'} onClick={onTabClick}>Булки</Tab>
            <Tab value="sauces" active={selectedCategory === 'sauces'} onClick={onTabClick}>Соусы</Tab>
            <Tab value="mains" active={selectedCategory === 'mains'} onClick={onTabClick}>Начинки</Tab>
        </div>
    )
};

export default IngredientsTabs;