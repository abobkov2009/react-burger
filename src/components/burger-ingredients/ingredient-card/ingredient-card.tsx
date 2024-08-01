import { useDrag } from "react-dnd"
import { useAppDispatch } from '../../../utils/hooks';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../../utils/burger-api';
import { setCurrentIngredient } from '../../../services/ingredientsSlice';
import { showIngredientModalWindow } from '../../../services/modalSlice';

import ingredientCardStyles from './ingredient-card.module.css';

type IngredientCardProps = {
    ingredient: ingredientType & { amount: number };
};


export default function IngredientCard({ ingredient }: IngredientCardProps) {
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        dispatch(setCurrentIngredient(ingredient));
        dispatch(showIngredientModalWindow())
    }

    const [{ isDragging }, dragRef] = useDrag({        
		type: 'ingredient',
		item: ingredient,
		collect: monitor => ({
            isDragging: monitor.isDragging(),
		})
	});    

    return (
        <div ref={dragRef} className={`${ingredientCardStyles.card} ${isDragging && ingredientCardStyles.dragging}`}  onClick={handleOnClick}>
            <img src={ingredient.image} alt={ingredient.name} className='mr-4 ml-4' />
            <div className={`mt-1 mb-1 ${ingredientCardStyles.price}`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text text_type_main-default ${ingredientCardStyles.ingredientname}`}>{ingredient.name}</p>
            {(ingredient.amount > 0) && (<Counter count={ingredient.amount} size="small" />)}
        </div>
    )
};
