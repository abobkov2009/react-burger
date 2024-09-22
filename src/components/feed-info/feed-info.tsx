import { useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { selectFeedInfo } from "../../services/feed";

import { URLS } from "../../utils/constants";
import styles from './feed-info.module.css';

export default function FeedInfo(): React.JSX.Element {
    const location = useLocation();
    const feedInfo = useSelector(selectFeedInfo)

    const totalOrderCount = feedInfo?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || 0;
    const todayOrderCount = feedInfo?.totalToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || 0;

    return (
        <section className={styles.container}>
            <div className={styles.orderslistcontainer}>
                <div className={styles.orderslistsegment}>
                    <p className='text text_type_main-medium mb-6'>Готовы</p>
                    <ul className={styles.orderslist}>
                        {feedInfo && feedInfo.doneOrders.length > 0 &&
                            feedInfo.doneOrders.slice(0, 20).map((order) => {
                                return (
                                    <li key={order._id}>
                                        <Link
                                            to={URLS.FEED_ID.replace(':id', order.number.toString())}
                                            state={{ background: location }}
                                            className={`${styles.readyordersnumbers} text text_type_digits-default`}
                                        >
                                            {order.number.toString().padStart(6, '0')}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className={styles.orderslistsegment}>
                    <p className='text text_type_main-medium mb-6'>В работе</p>
                    <ul className={styles.orderslist}>
                        {feedInfo && feedInfo.preparingOrders.length > 0 &&
                            feedInfo.preparingOrders.slice(0, 20).map((order) => {
                                return (
                                    <li key={order._id}>
                                        <Link
                                            to={URLS.FEED_ID.replace(':id', order.number.toString())}
                                            state={{ background: location }}
                                            className={`${styles.processingordersnumbers} text text_type_digits-default`}
                                        >
                                            {order.number.toString().padStart(6, '0')}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <div className='text text_type_main-medium mt-15'>Выполнено за все время:</div>
            <div className={`${styles.glowshadow} text text_type_digits-large`}>{totalOrderCount}</div>
            <div className='text text_type_main-medium mt-15'>Выполнено за сегодня:</div>
            <div className={`${styles.glowshadow} text text_type_digits-large`}>{todayOrderCount}</div>
        </section >
    )
};

