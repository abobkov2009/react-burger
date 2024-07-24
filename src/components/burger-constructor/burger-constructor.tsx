import { useMemo } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../utils/burger-api';
import burgerConstructorStyles from './burger-constructor.module.css';

type BurgerConstructorProps = {
    ingredientsList: ingredientType[];
    onOrderSubmitButtonClick: () => void;
};

export default function BurgerConstructor({ ingredientsList, onOrderSubmitButtonClick }: BurgerConstructorProps) {
    const { bun, ingredients } = useMemo(() => {
        return {
            bun: ingredientsList.find(ingredient => ingredient.type === 'bun'),
            ingredients: ingredientsList.filter(ingredient => ingredient.type !== 'bun'),
        };
    }, [ingredientsList]);

    const totalOrderPrice = 610;

    return (
        <section className={`pt-25 ml-4 ${burgerConstructorStyles.container}`}>
            <div className='pr-4 ml-8'>
                {bun && (<ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />)
                }
            </div>
            <ul className={`mt-4 mb-4 pl-4 custom-scroll ${burgerConstructorStyles.scrollableList}`}>
                {ingredients.map((ingredient) => (
                    <li className={`${burgerConstructorStyles.ingredientCard}`} key={ingredient._id}>
                        <div className={burgerConstructorStyles.ingredientDragger}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    </li>
                )
                )}
            </ul>
            <div className='pr-4 ml-8'>
                {bun && (<ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />)
                }
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
                    onClick={onOrderSubmitButtonClick}
                >Оформить заказ</Button>
            </div>
        </section>
    )
};