import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation, useMatch } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { selectIngredientsAsDictionary } from '../../services/ingredients';

import { OrderStatusDescriptions, URLS } from "../../utils/constants";
import { TOrder } from "../../services/types";

import styles from "./order-card.module.css";


type TOrderCardProps = {
    order: TOrder
}

const maximumIngredientsToShow = 5;

export default function OrderCard({ order }: TOrderCardProps): React.JSX.Element {
    const location = useLocation();
    const ingredientsDictionary = useSelector(selectIngredientsAsDictionary);

    const totalPrice = useMemo(() => {
        return order.ingredients.reduce((acc, ingredient_id) => {
            if (ingredient_id && ingredient_id in ingredientsDictionary) {
                acc = acc + ingredientsDictionary[ingredient_id].price;
            }
            return acc;
        }, 0);
    }, [order.ingredients, ingredientsDictionary]
    );

    const uniqueIngredients = useMemo(() => {
        return Array.from(new Set(order.ingredients)).map(key => ingredientsDictionary[key]).filter(obj => obj !== undefined);
    }, [order.ingredients, ingredientsDictionary]
    );

    const orderStatus = OrderStatusDescriptions[order.status];
    const isProfile = useMatch(`${URLS.PROFILE}/${URLS.PROFILE_ORDERS}`);

    if (!order) return <></>;

    return (
        <Link to={(isProfile ? URLS.PROFILE_ORDERS_ID : URLS.FEED_ID).replace(':id', order.number.toString())}
            state={{ background: location }}
            className={styles.ordercard}>
            <div className={styles.orderheader}>
                <p className={`text text_type_digits-default`}>#{order.number.toString().padStart(6, '0')}</p>
                <p className={`${styles.orderDate} text text_type_main-default text_color_inactive`}>
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
            </div>
            <div>
                <p className={`text text_type_main-medium`}>{order.name}</p>
                {isProfile && <p className={`text text_type_main-default mt-2 ${(order.status === 'done') ? 'text_color_success' : 'text_color_primary'}`}>{orderStatus}</p>}
            </div>
            <div className={styles.orderdetails}>
                <ul className={styles.ingredientslist}>
                    {uniqueIngredients.slice(0, maximumIngredientsToShow + 1).map((ingredient, index) => {
                        return (index < maximumIngredientsToShow)
                            ? (<li className={styles.ingredientitem} key={ingredient._id} style={{ zIndex: maximumIngredientsToShow - index }}>
                                <img className={styles.ingredientimage} src={ingredient.image_mobile} alt={ingredient.name} />
                            </li>)
                            : (<li className={styles.ingredientitem} key={ingredient._id} style={{ zIndex: 0 }}>
                                <img className={`${styles.ingredientimage} ${styles.hiddenimage}`} src={ingredient.image_mobile} alt={`И еще ${uniqueIngredients.length - maximumIngredientsToShow} других ингредиентов`} />
                                <span className={`${styles.hiddenitemstext} text text_type_main-default`}>{`+${uniqueIngredients.length - maximumIngredientsToShow}`}</span>
                            </li>);
                    }
                    )}
                </ul>
                <div className={styles.price}>
                    <p className="mr-2 text text_type_digits-default">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
};