export const NORMA_API_URL = 'https://norma.nomoreparties.space/api';
export const NORMA_WS_URL = 'wss://norma.nomoreparties.space';
export const NORMA_WS_FEED_ENDPOINT = '/orders/all';
export const NORMA_WS_PROFILE_FEED_ENDPOINT = '/orders';

export const DND_BURGER_INGREDIENTS = 'DND_BURGER_INGREDIENTS'
export const DND_ORDER_STUFFING = 'DND_ORDER_STUFFING'

export const URLS = 
{
    HOMEPAGE : '/',
    FEED : '/feed',
    FEED_ID : '/feed/:id',
    LOGIN : '/login',
    PROFILE: '/profile',
    PROFILE_ORDERS : 'orders',
    PROFILE_ORDERS_ID : '/profile/orders/:id',
    REGISTER: '/register',    
    FORGOT_PASSWORD: '/forgot-password',    
    RESET_PASSWORD: '/reset-password',    
    INGREDIENTS_ID: '/ingredients/:ingredient_id',        
    NOT_FOUND: '*',        
}


export const OrderStatusDescriptions = 
{
    done: 'Выполнен',
    created: 'Создан',
    pending: 'Готовится'
}