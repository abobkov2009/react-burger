import AlertMessage from '../alert-message/AlertMessage';
import Loader from '../loader/loader';
import OrderCard from '../order-card/order-card';
import { useGetIngredientsQuery } from '../../services/ingredients';

import { TOrder } from '../../services/types';
import styles from './feed-orders.module.css';

type TFeedOrdersProps = {
    orders: TOrder[]
}


export default function FeedOrders({ orders }: TFeedOrdersProps): React.JSX.Element {
    const { error, isLoading } = useGetIngredientsQuery();

    return (
        <section className={styles.container}>
            {isLoading && (<Loader message="Идет загрузка списка ингредиентов" />)}
            {error && (<AlertMessage header="Произошла ошибка при загрузке списка ингредиентов..." />)}
            {!isLoading && !error && (
                <ul className={`pr-2 custom-scroll ${styles.scrollableList}`} >
                    {orders && orders.length > 0 &&
                        orders.map((order) => {
                            return (
                                <li key={order._id}>
                                    <OrderCard order={order} />
                                </li>
                            );
                        })}
                </ul>
            )}
        </section >
    )
};

