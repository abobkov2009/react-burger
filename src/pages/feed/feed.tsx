
import AlertMessage from '../../components/alert-message/AlertMessage';
import FeedInfo from '../../components/feed-info/feed-info';
import FeedOrders from '../../components/feed-orders/feed-orders';
import Loader from '../../components/loader/loader';
import { useGetFeedDataQuery } from '../../services/feed';

import styles from './feed.module.css'

export default function FeedPage(): React.JSX.Element {
    const { data } = useGetFeedDataQuery(false);

    return (
        <main className={styles.mainContent}>
            <h1 className="text text_type_main-large ml-5 pt-10 mb-5">Лента заказов</h1>
            {(!data || (data.success === undefined)) && (<Loader message="Идет загрузка списка заказов" />)}
            {(data && (data.success === false)) && (<AlertMessage header="Произошла ошибка при загрузке списка заказов..." />)}
            {(data && data.success) && (
                <div className={styles.container}>
                    <FeedOrders orders={data.orders} />
                    <FeedInfo />
                </div>)
            }
        </main>
    )
};

