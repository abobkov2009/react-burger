import { createSelector } from "@reduxjs/toolkit";
import { ingredientsApi } from './api';
import { selectIngredientsInOrder } from '../order'

export const selectAllIngredients = ingredientsApi.endpoints.getIngredients.select();


export const selectIngredientsGroupedByCategoryMergedWithAmounts = createSelector(
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
