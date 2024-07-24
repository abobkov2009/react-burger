import { NORMA_API_URL } from './constants';

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

export function getIngridients() : Promise<{succsess:boolean, data:ingredientType[]}> {
    return fetch(`${NORMA_API_URL}/ingredients`)
        .then(checkResponse)
        .then(checkSuccess);
}

