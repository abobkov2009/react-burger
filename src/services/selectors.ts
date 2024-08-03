import { createSelector } from 'reselect';
import { normaApi } from './api';
import { IRootState } from '../utils/store';

const selectAllIngredients = (state:IRootState) => {
    return normaApi.endpoints.getIngredients.select()(state)?.data || [];
};

export const selectIngredientsInOrder = (state:IRootState) => state.ingredients.ingredientsInOrder;
export const selectCurrentIngredient= (state:IRootState) => state.ingredients.currentIngredient;
export const selectOrder = (state:IRootState) => state.ingredients.order;

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
        console.log("selectIngredientAmounts");
        return amounts;
    }
)
/*
export const selectIngredientByCategoryWithAmounts = createSelector(
    [selectAllIngredients, ingredientsInOrder],
    (ingredientsList, used_ingredients) => {
        const usedAmounts: { [id: string]: number } = {};
        used_ingredients.stuffing.reduce((acc, ingredient) => {
            acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            return acc;
        }, usedAmounts);
        if (used_ingredients.bun) usedAmounts[used_ingredients.bun._id] = 2;
        
        return {
            buns: ingredientsList.filter(ingredient => ingredient.type === 'bun').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),
            sauces: ingredientsList.filter(ingredient => ingredient.type === 'sauce').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),
            mains: ingredientsList.filter(ingredient => ingredient.type === 'main').map(ingredient => { return { ...ingredient, amount: usedAmounts[ingredient._id] | 0 } }),        
        }
    }
)
*/

