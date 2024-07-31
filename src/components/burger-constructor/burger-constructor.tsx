import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';

import burgerConstructorStyles from './burger-constructor.module.css';
import { showOrderDetailsModalWindow } from '../../services/modalSlice';

export default function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const isOrderModalOpen = useAppSelector(state => state.modals.isOrderDetailsModalOpen);
    const ingredientsInOrder = useAppSelector(state => state.ingredients.ingredientsInOrder);

    const totalOrderPrice = useMemo(() => {
        const totalStuffingPrice = ingredientsInOrder.stuffing.reduce((total, ingredient) => total + ingredient.price, 0);
        return totalStuffingPrice + (ingredientsInOrder.bun ? ingredientsInOrder.bun.price * 2 : 0);
    }, [ingredientsInOrder]);

    const onOrderSubmitButtonClick = () => {
        dispatch(showOrderDetailsModalWindow())
    }

    return (
        <section className={`pt-25 ml-4 ${burgerConstructorStyles.container}`}>
            <div className='pr-4 ml-8'>
                {ingredientsInOrder.bun
                    ? (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredientsInOrder.bun.name} (верх)`}
                        price={ingredientsInOrder.bun.price}
                        thumbnail={ingredientsInOrder.bun.image}
                    />)
                    : (<div className="constructor-element constructor-element_pos_top">
                        <span className={`constructor-element__row p-3 ${burgerConstructorStyles.emptyContainer}`}>
                            Добавьте булку
                        </span>
                    </div>)
                }
            </div>
            {(ingredientsInOrder.stuffing.length !== 0)
                ? (<ul className={`mt-4 mb-4 pl-4 custom-scroll ${burgerConstructorStyles.scrollableList}`}>
                    {ingredientsInOrder.stuffing.map((ingredient) => (
                        <li className={`${burgerConstructorStyles.ingredientCard}`} key={ingredient._id}>
                            <div className={burgerConstructorStyles.ingredientDragger}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>)
                    )}
                </ul>)
                : (<div className="mt-4 mb-4 pr-4 ml-8">
                    <div className="constructor-element">
                        <span className={`constructor-element__row p-3 ${burgerConstructorStyles.emptyContainer}`}>
                            Добавьте ингредиенты
                        </span>
                    </div>
                </div>)
            }
            <div className='pr-4 ml-8'>
                {ingredientsInOrder.bun
                    ? (<ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredientsInOrder.bun.name} (низ)`}
                        price={ingredientsInOrder.bun.price}
                        thumbnail={ingredientsInOrder.bun.image}
                    />)
                    : (<div className="constructor-element constructor-element_pos_bottom">
                        <span className={`constructor-element__row p-3 ${burgerConstructorStyles.emptyContainer}`}>
                            Добавьте булку
                        </span>
                    </div>)
                }
            </div>
            <div className={`pr-4 mt-10 ${burgerConstructorStyles.footer}`}>
                <p className="mr-2 text text_type_digits-medium">
                    {totalOrderPrice}
                </p>
                <CurrencyIcon type="primary" />
                {ingredientsInOrder.bun && (ingredientsInOrder.stuffing.length!==0) && (<Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={(onOrderSubmitButtonClick)                    
                    }
                >Оформить заказ</Button>)
                }

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