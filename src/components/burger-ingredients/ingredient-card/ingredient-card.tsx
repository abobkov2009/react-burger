import { useDrag } from "react-dnd"
import { useLocation, useNavigate } from "react-router-dom";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredientWithAmount } from '../../../services/types';
import { DND_BURGER_INGREDIENTS, URLS } from '../../../utils/constants';

import ingredientCardStyles from './ingredient-card.module.css';

type TIngredientCardProps = {
    ingredient: TIngredientWithAmount;
};

export default function IngredientCard({ ingredient }: TIngredientCardProps): React.JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = () => {
        navigate(URLS.INGREDIENTS_ID.replace(':ingredient_id', ingredient._id), {
            state: { background: location },
        });
    }

    const [{ isDragging }, dragRef] = useDrag({
        type: DND_BURGER_INGREDIENTS,
        item: ingredient,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    return (
        <div ref={dragRef} className={`${ingredientCardStyles.card} ${isDragging && ingredientCardStyles.dragging}`} onClick={handleOnClick}>
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

