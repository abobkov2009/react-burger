import PropTypes, { InferProps } from 'prop-types';
import { ingredientType } from '../../../utils/propTypes';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientCardStyles from './ingredient-card.module.css';

IngredientCard.propTypes = {
    ingredient: ingredientType.isRequired,
    counter_value: PropTypes.number.isRequired,
    onIngredientClick: PropTypes.func.isRequired
};


export default function IngredientCard({ ingredient, counter_value, onIngredientClick }: InferProps<typeof IngredientCard.propTypes>) {
    const handleOnClick = () => {
        onIngredientClick(ingredient);
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
