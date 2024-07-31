import { NORMA_API_URL } from './constants';
import { getIngredientsStarted, getIngredientsSuccss, getIngredientsFailed } from '../services/ingredientsSlice';



const checkResponse = (response: { ok: any; json: () => Promise<any>; }) => {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err));
}

const checkSuccess = (response: { success: boolean } & any) => {
    if (response && response.success) {
        return response;
    }
    throw Error("Ответ Api не содержит данных!");
}



export type ingredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

/*
function requestIngredients(): Promise<{ succsess: boolean, data: ingredientType[] }> {
    return fetch(`${NORMA_API_URL}/ingredients`)
        .then(checkResponse)
        .then(checkSuccess);
}
*/

export function loadIngredients() {
    return function (dispatch: any) {
        dispatch(getIngredientsStarted());
        fetch(`${NORMA_API_URL}/ingredients`)
            .then(checkResponse)
            .then(checkSuccess)
            .then((result) => {
                dispatch(getIngredientsSuccss(result.data))
            })
            .catch(() => {
                dispatch(getIngredientsFailed());
            })
    };
}
