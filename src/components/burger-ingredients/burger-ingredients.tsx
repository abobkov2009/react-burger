import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { ingredientType } from '../../utils/burger-api';
import burgerIngridientsStyles from './burger-ingredients.module.css';

type BurgerIngredientsProps = {
    ingredientsList: ingredientType[];
    onIngridientCardClick: (ingredient: ingredientType) => void;
};

export default function BurgerIngredients({ ingredientsList, onIngridientCardClick }: BurgerIngredientsProps) {
    return (
        <section className={`pt-10 ml-5 mr-10 ${burgerIngridientsStyles.container}`}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <IngredientsTabs />
            <ul className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`}>
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'bun')} groupName='Булки' onIngridientCardClick={onIngridientCardClick} />
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'sauce')} groupName='Соусы' onIngridientCardClick={onIngridientCardClick} />
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'main')} groupName='Начинки' onIngridientCardClick={onIngridientCardClick} />
            </ul>
        </section>
    )
};