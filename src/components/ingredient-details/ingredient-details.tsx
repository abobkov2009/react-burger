import { InferProps } from 'prop-types';
import { ingredientType } from '../../utils/propTypes';

import NutritionItem from './nutrition-item/nutrition-item';

import ingredientDetailStyles from './ingredient-details.module.css';

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
};

export default function IngredientDetails({ ingredient }: InferProps<typeof IngredientDetails.propTypes>) {
    return (
        <div className={`pt-10 ${ingredientDetailStyles.container}`}>
            <div className={`pl-10 pr-10 text text_type_main-large ${ingredientDetailStyles.ingredientTitle}`}>Детали ингредиента</div>
            <img className={`pb-4 ${ingredientDetailStyles.image}`} src={ingredient.image_large} alt={ingredient.name} />
            <div className={`pb-8 text text_type_main-medium ${ingredientDetailStyles.ingredientName}`}>{ingredient.name}</div>
            <div className={`pb-15 text text_type_main-default text_color_inactive ${ingredientDetailStyles.nutritionDetails}`}>
                <NutritionItem caption='Калории,ккал' value={ingredient.calories} />
                <NutritionItem caption='Белки, г' value={ingredient.proteins} />
                <NutritionItem caption='Жиры, г' value={ingredient.fat} />
                <NutritionItem caption='Углеводы, г' value={ingredient.carbohydrates} />
            </div>
        </div>
    )
};