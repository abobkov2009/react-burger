import { renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { feedApi, useGetOrderInfoQuery } from './api';
import { MockFetchSuccessResponse, MockFetchFailedResponse, get_order_api_success_response, order1 } from '../../test/mock_data';

const store = configureStore({
    reducer: {
        [feedApi.reducerPath]: feedApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedApi.middleware),
});

function Wrapper(props) {
    return <Provider store={store}>{props.children}</Provider>;
}

describe('orders feed api', () => {
    beforeEach(() => {
        //Очищаем кэш api
        store.dispatch(feedApi.util.resetApiState());
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('successful fetch returns order data', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(get_order_api_success_response)
        )

        const { result } = renderHook(() => useGetOrderInfoQuery(order1.number), { wrapper: Wrapper });
        expect(result.current).toMatchObject({
            status: 'pending',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current).toMatchObject({
            status: 'fulfilled',
            isLoading: false,
            isSuccess: true,
            isError: false,
            isFetching: false,
            data: order1,
        });
    });

    it('failed returning data', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchFailedResponse()
        )

        const { result } = renderHook(() => useGetOrderInfoQuery(order1.number), { wrapper: Wrapper });
        expect(result.current).toMatchObject({
            status: 'pending',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });

        await waitFor(() => { expect(result.current.isError).toBe(true) });
        expect(result.current.error).toBeDefined();
    });

})