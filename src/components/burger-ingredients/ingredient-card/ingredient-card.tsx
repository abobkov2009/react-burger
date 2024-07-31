import { useAppDispatch } from '../../../utils/hooks';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../../utils/burger-api';
import { showIngredientModalWindow } from '../../../services/modalSlice';
import { setCurrentIngredient } from '../../../services/ingredientsSlice';

import ingredientCardStyles from './ingredient-card.module.css';

type IngredientCardProps = {
    ingredient: ingredientType;
    counter_value: number;
};


export default function IngredientCard({ ingredient, counter_value }: IngredientCardProps) {
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        dispatch(setCurrentIngredient(ingredient));
        dispatch(showIngredientModalWindow())
    }

    return (
        <div className={ingredientCardStyles.card} onClick={handleOnClick}>
            <img src={ingredient.image} alt={ingredient.name} className='mr-4 ml-4' />
            <div className={`mt-1 mb-1 ${ingredientCardStyles.price}`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text text_type_main-default ${ingredientCardStyles.ingredientname}`}>{ingredient.name}</p>
            {(counter_value > 0) && (<Counter count={counter_value} size="small" />)}
        </div>
    )
};
