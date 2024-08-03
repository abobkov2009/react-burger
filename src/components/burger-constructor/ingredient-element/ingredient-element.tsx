import { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from 'dnd-core'
import { useAppDispatch } from '../../../utils/hooks';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { DND_ORDER_INGREDIENTS } from "../../../utils/constants";
import { ingredientWithUuidType } from '../../../services/types';
import { ingredientFromOrderRemoved, ingredientsReordered } from '../../../services/reducers';
import ingredientElementStyles from './ingredient-element.module.css';

type IngredientElementProps = {
    ingredient: ingredientWithUuidType;
    index: number;
};

interface DragItem {
    index: number,
}

export default function IngredientElement({ ingredient, index }: IngredientElementProps) {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const [{ isDragging }, drag] = useDrag({
        type: DND_ORDER_INGREDIENTS,
        item: { index: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<DragItem>({
        accept: DND_ORDER_INGREDIENTS,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(ingredientsReordered({dragIndex, hoverIndex}));
    }, [dispatch])

    const handleDeleteClicked = () => {
        dispatch(ingredientFromOrderRemoved(ingredient));
    }

    drag(drop(ref))

    return (
        <li ref={ref} className={`${ingredientElementStyles.ingredientCard} ${isDragging && ingredientElementStyles.dragging}`} key={ingredient._uuid}>
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