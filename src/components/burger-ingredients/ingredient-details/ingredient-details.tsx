import { useSelector } from 'react-redux';
import NutritionItem from './nutrition-item/nutrition-item';
import { selectCurrentIngredient } from '../../../services/selectors';

import ingredientDetailStyles from './ingredient-details.module.css';

export default function IngredientDetails() {

    const currentIngredient = useSelector(selectCurrentIngredient);

    return currentIngredient &&
        (
            <div className={`pt-10 ${ingredientDetailStyles.container}`}>
                <div className={`pl-10 pr-10 text text_type_main-large ${ingredientDetailStyles.ingredientTitle}`}>Детали ингредиента</div>
                <img className={`pb-4 ${ingredientDetailStyles.image}`} src={currentIngredient.image_large} alt={currentIngredient.name} />
                <div className={`pb-8 text text_type_main-medium ${ingredientDetailStyles.ingredientName}`}>{currentIngredient.name}</div>
                <div className={`pb-15 text text_type_main-default text_color_inactive ${ingredientDetailStyles.nutritionDetails}`}>
                    <NutritionItem caption='Калории,ккал' value={currentIngredient.calories} />
                    <NutritionItem caption='Белки, г' value={currentIngredient.proteins} />
                    <NutritionItem caption='Жиры, г' value={currentIngredient.fat} />
                    <NutritionItem caption='Углеводы, г' value={currentIngredient.carbohydrates} />
                </div>
            </div>
        )
};