import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from '../../../utils/hooks';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { DND_ORDER_INGREDIENTS } from "../../../utils/constants";
import { ingredientWithUuidType } from '../../../services/types';
import { ingredientFromOrderRemoved } from '../../../services/reducers';
import ingredientElementStyles from './ingredient-element.module.css';

type IngredientElementProps = {
    ingredient: ingredientWithUuidType;
};


export default function IngredientElement({ ingredient }: IngredientElementProps) {
    const dispatch = useAppDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: DND_ORDER_INGREDIENTS,
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleDeleteClicked = () => {
        dispatch(ingredientFromOrderRemoved(ingredient));
    }

    return (
        <li ref={dragRef} className={`${ingredientElementStyles.ingredientCard} ${isDragging && ingredientElementStyles.dragging}`} key={ingredient._uuid}>
            <div className={ingredientElementStyles.ingredientDragger}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleDeleteClicked}
            />
        </li>
    )
};