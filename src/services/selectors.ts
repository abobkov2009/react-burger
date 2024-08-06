import { createSelector } from 'reselect';
import { IRootState } from '../utils/store';
import { normaApi } from './api';

export const selectIngredientsInOrder = (state: IRootState) => state.ingredients.ingredientsInOrder;
export const selectCurrentIngredient = (state: IRootState) => state.ingredients.currentIngredient;
export const selectOrderData = (state: IRootState) => state.ingredients.orderData;

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



const selectAllIngredients = normaApi.endpoints.getIngredients.select();

export const selectIngredientsGroupeByCategoryMergedWithAmounts = createSelector(
    selectAllIngredients, selectIngredientsInOrder,
    (ingredientsList, used_ingredients) => {
        if (ingredientsList === null) return {};

        const usedAmounts: { [id: string]: number } = {};
        used_ingredients.stuffing.reduce((acc, ingredient) => {
            acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            return acc;
        }, usedAmounts);
        if (used_ingredients.bun) usedAmounts[used_ingredients.bun._id] = 2;

        return {
            buns: ingredientsList.data?.filter(ingredient => ingredient.type === 'bun').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),
            sauces: ingredientsList.data?.filter(ingredient => ingredient.type === 'sauce').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),
            mains: ingredientsList.data?.filter(ingredient => ingredient.type === 'main').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),
        }
    }
)
