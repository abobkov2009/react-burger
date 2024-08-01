import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../../utils/burger-api';
import bunElementStyles from './bun-element.module.css';

type BunElementProps = {
    ingredient: ingredientType | null;
    type: "top" | "bottom";
};


export default function BunElement({ ingredient, type }: BunElementProps) {
    return (ingredient !== null)
        ? (<ConstructorElement
            type={type}
            isLocked={true}
            text={`${ingredient.name} (${type === "top" ? "верх" : "низ"})`}
            price={ingredient.price}
            thumbnail={ingredient.image}
        />)
        : (<div className={`constructor-element ${type === "top" ? "constructor-element_pos_top" : "constructor-element_pos_bottom"}`}>
            <span className={`constructor-element__row p-3 ${bunElementStyles.emptyElement}`}>
                Добавьте булку
            </span>
        </div>)
};