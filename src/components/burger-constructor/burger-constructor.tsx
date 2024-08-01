import { useMemo } from 'react';
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from './bun-element/bun-element';
import IngredientElement from './ingredient-element/ingredient-element';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';

import burgerConstructorStyles from './burger-constructor.module.css';
import { ingredientType } from '../../utils/burger-api';
import { addIngredientToOrder } from '../../services/ingredientsSlice';
import { showOrderDetailsModalWindow } from '../../services/modalSlice';

interface DropCollectedProps {
    isOver: boolean;
}

export default function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const isOrderModalOpen = useAppSelector(state => state.modals.isOrderDetailsModalOpen);
    const ingredientsInOrder = useAppSelector(state => state.ingredients.ingredientsInOrder);

    const totalOrderPrice = useMemo(() => {
        const totalStuffingPrice = ingredientsInOrder.stuffing.reduce((total, ingredient) => total + ingredient.price, 0);
        return totalStuffingPrice + (ingredientsInOrder.bun ? ingredientsInOrder.bun.price * 2 : 0);
    }, [ingredientsInOrder]);


    const [{ isOver }, dropTargetRef] = useDrop<ingredientType, void, DropCollectedProps>({
        accept: 'ingredient',
        drop(item: ingredientType) {
            dispatch(addIngredientToOrder(item))
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        }),
    });

    const onOrderSubmitButtonClick = () => {
        dispatch(showOrderDetailsModalWindow())
    }

    return (
        <section className={`pt-25 ml-4 ${burgerConstructorStyles.container}`}>
            <div ref={dropTargetRef} className={`${isOver ? burgerConstructorStyles.dropAreaHover : burgerConstructorStyles.dropArea}`}>
                <div className='pr-4 ml-8'>
                    <BunElement
                        ingredient={ingredientsInOrder.bun}
                        type="top"
                    />
                </div>
                {(ingredientsInOrder.stuffing.length !== 0)
                    ? (<ul className={`mt-4 mb-4 pl-4 custom-scroll ${burgerConstructorStyles.scrollableList}`}>
                        {ingredientsInOrder.stuffing.map(ingredient => (<IngredientElement key={ingredient._uuid} ingredient={ingredient} />))}
                    </ul>)
                    : (<div className="mt-4 mb-4 pr-4 ml-8">
                        <div className="constructor-element">
                            <span className={`constructor-element__row p-3 ${burgerConstructorStyles.emptyElement}`}>
                                Добавьте ингредиенты
                            </span>
                        </div>
                    </div>)
                }
                <div className='pr-4 ml-8'>
                    <BunElement
                        ingredient={ingredientsInOrder.bun}
                        type="bottom"
                    />
                </div>
            </div>
            <div className={`pr-4 mt-10 ${burgerConstructorStyles.footer}`}>
                <p className="mr-2 text text_type_digits-medium">
                    {totalOrderPrice}
                </p>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={(onOrderSubmitButtonClick)}
                    disabled={ingredientsInOrder.bun === null}
                >Оформить заказ</Button>


            </div>
            {
                isOrderModalOpen && (
                    <Modal>
                        <OrderDetails orderNumber="034536" />
                    </Modal>
                )
            }
        </section >
    )
};