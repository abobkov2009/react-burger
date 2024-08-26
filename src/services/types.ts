export type TIngredient = {
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

export type TIngredientWithAmount = TIngredient & { amount: number }
export type TIngredientWithUuid = TIngredient & { _uuid?: string }


export type TUserInfo = {
    email: string;
    name: string;
}

export type TAuthResponse = {
    success: boolean;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: TUserInfo;
}

export type TAuthError = {
    status: Number; 
    data: { 
        success: boolean; 
        message: string; 
    };
}