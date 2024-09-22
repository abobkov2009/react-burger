import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { selectIngredientsAsDictionary, useGetIngredientsQuery } from '../../services/ingredients';
import { selectOrder, useGetOrderInfoQuery } from '../../services/feed';

import AlertMessage from '../alert-message/AlertMessage';
import Loader from '../loader/loader';

import { TIngredientWithAmount } from '../../services/types';
import { OrderStatusDescriptions } from '../../utils/constants';

import styles from './order-details.module.css';


export default function OrderDetails(): React.JSX.Element {
    const navigate = useNavigate();
    const { id: order_id } = useParams<{ id: string }>();

    const { error, isLoading } = useGetIngredientsQuery();
    const ingredientsDictionary = useSelector(selectIngredientsAsDictionary);

    const orderFromFeeds = useSelector(state => selectOrder(state, order_id));
    const { data: orderFromServer, isLoading: isLoadingOrder } = useGetOrderInfoQuery(order_id || "", { skip: !!orderFromFeeds || !order_id });
    const order = orderFromFeeds || orderFromServer;

    const ingredientsWithAmounts = useMemo(() => {
        if (!order) return [];
        const amounts: { [id: string]: number } = {};
        order.ingredients.reduce((acc, ingredient_id) => {
            acc[ingredient_id] = (acc[ingredient_id] || 0) + 1;
            return acc;
        }, amounts);

        const result: TIngredientWithAmount[] = [];
        for (const ingredient_id in amounts) {
            if (ingredient_id in ingredientsDictionary && ingredientsDictionary[ingredient_id]) {
                result.push({
                    ...ingredientsDictionary[ingredient_id],
                    amount: amounts[ingredient_id]
                });
            }
        }
        return result;
    }, [order, ingredientsDictionary]
    );

    const totalPrice = useMemo(() => {
        if (!ingredientsWithAmounts) return 0;
        return ingredientsWithAmounts.reduce((acc, ingredient) => acc + (ingredient.price * ingredient.amount), 0);
    }, [ingredientsWithAmounts]
    );


    return (
        <>
            {(isLoading || isLoadingOrder) && (<Loader message="Идет загрузка информации о заказе" />)}
            {error && (<AlertMessage header="Произошла ошибка при загрузке списка ингредиентов..." />)}
            {!isLoading && !isLoadingOrder && !error && !order && (
                <>
                    <AlertMessage header="Такого заказа мы не нашли..." />
                    <Button htmlType="button" type='primary' onClick={() => navigate('/')}>Назад на главную</Button>
                </>
            )}
            {!isLoading && !error && order && ingredientsWithAmounts && (
                <div className={`pt-10 pb-5 ${styles.container}`}>
                    <div className={`text text_type_digits-default mb-10 ${styles.ordernumber}`}>#{order.number.toString().padStart(6, '0')}</div>
                    <div className={`text text_type_main-medium mb-3`}>{order.name}</div>
                    <div className={`text text_type_main-default ${(order.status === 'done') ? 'text_color_success' : 'text_color_primary'} mb-15`}>{OrderStatusDescriptions[order.status]}</div>
                    <div className={`text text_type_main-medium mb-6`}>Состав</div>
                    <ul className={`pr-6 custom-scroll ${styles.scrollableList}`} >
                        {ingredientsWithAmounts.map((ingredient) => {
                            return (
                                <li className={styles.ingredientitem} key={ingredient._id}>
                                    <img className={styles.ingredientimage} src={ingredient.image_mobile} alt={ingredient.name} />
                                    <p className={`text text_type_main-default ${styles.ingredientname}`}>{ingredient.name}</p>
                                    <div className={styles.price}>
                                        <p className='mr-2 text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={`mt-10 ${styles.orderfooter}`}>
                        <p className={`text text_type_main-default text_color_inactive ${styles.orderDate}`}>
                            <FormattedDate date={new Date(order.createdAt)} />
                        </p>
                        <div className={styles.price}>
                            <p className="mr-2 text text_type_digits-default">
                                {totalPrice}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};
