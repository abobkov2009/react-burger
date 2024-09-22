import OrderDetails from '../../components/order-details/order-details';

import styles from './order.module.css';

export default function OrderPage(): React.JSX.Element {
    return (
        <main className={`${styles.mainContent}`}>
            <OrderDetails />
        </main>
    )
};

