import AlertMessage from '../../../components/alert-message/AlertMessage';
import FeedOrders from '../../../components/feed-orders/feed-orders';
import Loader from '../../../components/loader/loader';

import { useGetFeedDataQuery } from '../../../services/feed';

import styles from './order-history.module.css';

export default function OrderHistoryPage(): React.JSX.Element {
    const { data } = useGetFeedDataQuery(true);

    return (
        <div className={styles.container}>
            {(!data || (data.success === undefined)) && (<Loader message="Идет загрузка списка заказов" />)}
            {(data && (data.success === false)) && (<AlertMessage header="Произошла ошибка при загрузке списка заказов..." />)}
            {(data && data.success) && (
                <FeedOrders orders={data.orders.slice().reverse()} />
                )
            }
        </div>
    )
};

