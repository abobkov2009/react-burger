import { createSelector } from 'reselect';
import { IRootState } from '../../utils/store';

export const selectIngredientsInOrder = (state: IRootState) => state.order.ingredientsInOrder;
export const selectOrderData = (state: IRootState) => state.order.orderData;

export const selectTotalOrderPrice = createSelector(
    [selectIngredientsInOrder],
    (used_ingredients) => {
        const totalStuffingPrice = used_ingredients.stuffing.reduce((total, ingredient) => total + ingredient.price, 0);
        return totalStuffingPrice + (used_ingredients.bun ? used_ingredients.bun.price * 2 : 0);
    }
)

export const selectIngredientAmounts = createSelector(
    [selectIngredientsInOrder],
    (used_ingredients) => {
        const amounts: { [id: string]: number } = {};
        used_ingredients.stuffing.reduce((acc, ingredient) => {
            acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            return acc;
        }, amounts);
        if (used_ingredients.bun) amounts[used_ingredients.bun._id] = 2;
        return amounts;
    }
)
