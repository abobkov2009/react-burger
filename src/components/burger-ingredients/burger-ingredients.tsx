import PropTypes, { InferProps } from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';

import burgerIngridientsStyles from './burger-ingredients.module.css';

BurgerIngredients.propTypes = {
    ingredientsList: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    onIngridientItemClick: PropTypes.func.isRequired
};

export default function BurgerIngredients({ ingredientsList, onIngridientItemClick }: InferProps<typeof BurgerIngredients.propTypes>) {
    return (
        <section className={`pt-10 ml-5 mr-10 ${burgerIngridientsStyles.container}`}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <IngredientsTabs />
            <ul className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`}>
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'bun')} groupName='Булки' onIngridientItemClick={onIngridientItemClick} />
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'sauce')} groupName='Соусы' onIngridientItemClick={onIngridientItemClick} />
                <IngredientsGroup ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'main')} groupName='Начинки' onIngridientItemClick={onIngridientItemClick} />
            </ul>
        </section>
    )
};