import { renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsApi, useGetIngredientsQuery } from './api';
import { MockFetchSuccessResponse, MockFetchFailedResponse, ingredients_api_success_response } from '../../test/mock_data';

const store = configureStore({
    reducer: {
        [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ingredientsApi.middleware),
});

function Wrapper(props) {
    return <Provider store={store}>{props.children}</Provider>;
}

describe('ingredients api tests', () => {
    beforeEach(() => {
        //Очищаем кэш api
        store.dispatch(ingredientsApi.util.resetApiState());
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('successful fetch returns ingredients', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(ingredients_api_success_response)
        )

        const { result } = renderHook(() => useGetIngredientsQuery(undefined), { wrapper: Wrapper });
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
            data: ingredients_api_success_response.data,
        });
    });

    it('failed fetch returns an error', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchFailedResponse()
        )

        const { result } = renderHook(() => useGetIngredientsQuery(undefined), { wrapper: Wrapper });
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