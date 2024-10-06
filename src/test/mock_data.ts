import { TGetResponse } from "../services/ingredients/api";
import { TFeedResponse } from "../services/feed/api";
import { TAuthResponse, TIngredient, TOrder, TUserInfo } from "../services/types";
import { TPlaceOrderResponse } from "../services/order/api";


export const bun1: TIngredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
};
export const bun2: TIngredient = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0
};
export const ingredient1: TIngredient = {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0
};
export const ingredient2: TIngredient = {
    _id: "643d69a5c3f7b9001cfa0942",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0
};


export const order1: TOrder = {
    _id: "66ffe19107cc0b001c1d5b6a",
    ingredients: [
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093d"
    ],
    status: "done",
    name: "Space флюоресцентный антарианский бургер",
    createdAt: "2024-10-04T12:37:37.718Z",
    updatedAt: "2024-10-04T12:37:38.649Z",
    number: 54978
}

export const mockUser: TUserInfo = {
    email: 'test_user@yandex.ru',
    name: 'Test User'
}

export const mockUser2: TUserInfo = {
    email: 'test_user2@yandex.ru',
    name: 'Test User 2'
}

export const mockAccessToken = "LongAccessToken";
export const mockRefreshToken = "RefreshToken";




export function MockFetchSuccessResponse(data: object) {
    return {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(data),
        text: jest.fn().mockResolvedValue(JSON.stringify(data)),
        clone: function () { return this; },
    }
}
export function MockFetchFailedResponse() {
    return {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue(""),
        text: jest.fn().mockResolvedValue(JSON.stringify("")),
        clone: function () { return this; },
    }
}


export const ingredients_api_success_response: TGetResponse = {
    success: true,
    data: [bun1, bun2, ingredient1, ingredient2]
}

export const get_order_api_success_response: Pick<TFeedResponse, "success" | "orders"> = {
    success: true,
    orders: [order1],
}


export const order_create_api_success_response: TPlaceOrderResponse = {
    success: true,
    name: "Тестовый заказ",
    order: {
        number: 12345
    }
}


export const get_user_api_success_response: TAuthResponse = {
    success: true,
    user: mockUser
}

export const register_user_api_success_response: TAuthResponse = {
    success: true,
    user: mockUser,
    accessToken: `Bearer ${mockAccessToken}`,
    refreshToken: mockRefreshToken,
}

export const login_user_api_success_response: TAuthResponse = {
    success: true,
    accessToken: `Bearer ${mockAccessToken}`,
    refreshToken: mockRefreshToken,
    user: mockUser
}

export const logout_user_api_success_response: TAuthResponse = {
    success: true,
    message: "Successful logout"
}

export const update_user_api_success_response: TAuthResponse = {
    success: true,
    user: mockUser2
}
