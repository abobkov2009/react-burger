import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from '../../../utils/hooks';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../../utils/burger-api';
import { deleteIngredientFromOrder } from '../../../services/ingredientsSlice';
import ingredientElementStyles from './ingredient-element.module.css';

type IngredientElementProps = {
    ingredient: ingredientType & { _uuid: string };
};


export default function IngredientElement({ ingredient }: IngredientElementProps) {
    const dispatch = useAppDispatch();
    
    const [{ isDragging }, dragRef] = useDrag({        
        type: 'ingredientInOrder',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
      });    

    const handleDeleteClicked = () => {
        dispatch(deleteIngredientFromOrder(ingredient));
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