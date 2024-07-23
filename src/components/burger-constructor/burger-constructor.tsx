import PropTypes, { InferProps } from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor.module.css';

BurgerConstructor.propTypes = {
    ingredientsList: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    onOrderSubmit: PropTypes.func.isRequired,
};

export default function BurgerConstructor({ ingredientsList, onOrderSubmit }: InferProps<typeof BurgerConstructor.propTypes>) {
    const bun = {
        name: "Краторная булка N-200i",
        price: 20,
        thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png"
    }

    const totalOrderPrice = 610;

    return (
        <section className={`pt-25 ml-4 ${burgerConstructorStyles.container}`}>
            <div className='pr-4 ml-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.thumbnail}
                />
            </div>
            <ul className={`mt-4 mb-4 pl-4 custom-scroll ${burgerConstructorStyles.scrollableList}`}>
                {ingredientsList.map((ingredient) => (
                    ingredient.type !== 'bun' &&
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
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.thumbnail}
                />
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
                    onClick={onOrderSubmit}
                >Оформить заказ</Button>
            </div>
        </section>
    )
};