import { createSelector } from "@reduxjs/toolkit";
import { feedApi } from './api';

export const selectFeedData = feedApi.endpoints.getFeedData.select(false);
export const selectFeedProfileData = feedApi.endpoints.getFeedData.select(true);

export const selectFeedInfo = createSelector(
    selectFeedData,
    (feedData) => {
        if (feedData === null || !feedData.data) return null;

        return {
            total: feedData.data.total,
            totalToday: feedData.data.totalToday,
            doneOrders: feedData.data.orders.filter(order => order.status === 'done'),
            preparingOrders: feedData.data.orders.filter(order => order.status !== 'done')
        }
    }
)

export const selectOrder = createSelector(
    [selectFeedData, selectFeedProfileData, (state, orderNumber: string | undefined) => orderNumber],
    (feedData, profileFeedData, orderNumber) => {
        if (!orderNumber) return null;
        let order = null;
        if (!order && feedData !== null && feedData.data) {
            order = feedData.data.orders.find(order => order.number.toString() === orderNumber);
        };
        if (!order && profileFeedData !== null && profileFeedData.data) {
            order = profileFeedData.data.orders.find(order => order.number.toString() === orderNumber);
        };
        return order;
    }
)
