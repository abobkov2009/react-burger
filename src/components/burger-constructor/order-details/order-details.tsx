import { useSelector } from 'react-redux';
import { selectOrderData } from '../../../services/order';

import orderDetailsStyles from './order-details.module.css';
import orderDetailsImage from '../../../images/order-detail.png'

export default function OrderDetails(): React.JSX.Element {
    const orderData = useSelector(selectOrderData);

    return (
        <div className={`pt-30 ${orderDetailsStyles.container}`}>
            <div className={`pb-8 text text_type_digits-large ${orderDetailsStyles.number}`} data-testid="constructor-order-number">{orderData?.order.number}</div>
            <div className="pb-15 text text_type_main-medium">идентификатор заказа</div>
            <img className={`pb-15 ${orderDetailsStyles.image}`} alt="Заказ готов" src={orderDetailsImage} />
            <div className="pb-2 text text_type_main-default">Ваш заказ начали готовить</div>
            <div className="pb-10 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
        </div>
    )
};

