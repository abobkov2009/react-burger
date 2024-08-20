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

export type ingredientWithAmountType = ingredientType & { amount: number }
export type ingredientWithUuidType = ingredientType & { _uuid?: string }


export type userInfoType = {
    email: string;
    name: string;
}

export type authResponseType = {
    success: boolean;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: userInfoType;
}

export type authErrorType = {
    status: Number; 
    data: { 
        success: boolean; 
        message: string; 
    };
}