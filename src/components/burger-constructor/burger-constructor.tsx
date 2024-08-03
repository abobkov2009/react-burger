import { useDrop } from "react-dnd";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../utils/hooks';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from './bun-element/bun-element';
import IngredientElement from './ingredient-element/ingredient-element';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';

import { ingredientType } from '../../services/types';
import { ingredientToOrderAdded, orderAccepted } from '../../services/reducers';
import { selectIngredientsInOrder, selectTotalOrderPrice, selectOrder } from '../../services/selectors';
import { DND_BURGER_INGREDIENTS } from '../../utils/constants';

import burgerConstructorStyles from './burger-constructor.module.css';

interface DropCollectedProps {
    isOver: boolean;
}

export default function BurgerConstructor() {
    const dispatch = useAppDispatch();
    
    const order = useSelector(selectOrder);
    const ingredientsInOrder = useSelector(selectIngredientsInOrder);
    const totalOrderPrice = useSelector(selectTotalOrderPrice);


    const [{ isOver }, dropTargetRef] = useDrop<ingredientType, void, DropCollectedProps>({
        accept: DND_BURGER_INGREDIENTS,
        drop(item: ingredientType) {
            dispatch(ingredientToOrderAdded(item))
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        }),
    });

    const onOrderSubmitButtonClick = () => {
        dispatch(orderAccepted());
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
                        {ingredientsInOrder.stuffing.map((ingredient, index) => (<IngredientElement key={ingredient._uuid} ingredient={ingredient} index={index} />))}
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
                order && (
                    <Modal>
                        <OrderDetails orderNumber="034536" />
                    </Modal>
                )
            }
        </section >
    )
};