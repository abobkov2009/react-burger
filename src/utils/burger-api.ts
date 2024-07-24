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

export default async function getIngridients() {
    return fetch(`${NORMA_API_URL}/ingredients`)
        .then(checkResponse)
        .then(checkSuccess);
}

