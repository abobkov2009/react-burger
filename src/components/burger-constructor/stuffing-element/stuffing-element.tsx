import { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from 'dnd-core'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../../utils/hooks';
import { ingredientFromOrderRemoved, ingredientsReordered } from '../../../services/order';
import { DND_ORDER_STUFFING } from "../../../utils/constants";
import { TIngredientWithUuid } from '../../../services/types';
import stuffingElementStyles from './stuffing-element.module.css';

type TStuffingElementProps = {
    ingredient: TIngredientWithUuid;
    index: number;
};

type DragItem = {
    index: number,
}

export default function StuffingElement({ ingredient, index }: TStuffingElementProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const [{ isDragging }, drag] = useDrag({
        type: DND_ORDER_STUFFING,
        item: { index: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<DragItem>({
        accept: DND_ORDER_STUFFING,
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
        dispatch(ingredientsReordered({ dragIndex, hoverIndex }));
    }, [dispatch])

    const handleDeleteClicked = () => {
        dispatch(ingredientFromOrderRemoved(ingredient));
    }

    drag(drop(ref))

    return (
        <li ref={ref} className={`${stuffingElementStyles.ingredientCard} ${isDragging && stuffingElementStyles.dragging}`} key={ingredient._uuid} data-testid="constructor-stuffing">
            <div className={stuffingElementStyles.ingredientDragger}>
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

