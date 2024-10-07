import { orderSlice, initialState, ingredientToOrderAdded, ingredientFromOrderRemoved, ingredientsReordered, orderPlaced, orderCleared } from './slice';
import { MockFetchSuccessResponse, bun1, bun2, ingredient1, ingredient2, order_create_api_success_response } from '../../test/mock_data';
import uuid from 'react-uuid';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { orderApi } from './api';

jest.mock('react-uuid', () => jest.fn());

describe("order reducer", () => {

    const addedIngredient1 = {
        ...ingredient1,
        _uuid: 'mocked-uuid1'
    }
    const addedIngredient2 = {
        ...ingredient2,
        _uuid: 'mocked-uuid2'
    }

    it("should return the initial state", () => {
        const state = orderSlice.reducer(initialState, { type: "" })
        expect(state).toEqual(initialState);
    })

    it('should only replace bun when "bun" typed ingredient added', () => {        
        uuid.mockImplementation(() => 'mocked-uuid');
        const stateWithBun1 = {
            ...initialState,
            ingredientsInOrder: {
                bun: bun1,
                stuffing: [addedIngredient1, addedIngredient2],
            }
        };
        const action = ingredientToOrderAdded(bun2);
        const state = orderSlice.reducer(stateWithBun1, action);
        expect(state.ingredientsInOrder.bun).toEqual({
            ...bun2,
            _uuid: 'mocked-uuid',
        });
        expect(state.ingredientsInOrder.stuffing).toEqual(stateWithBun1.ingredientsInOrder.stuffing);
    });

    it('should add new stuffing ingredient with new uuid and dont modify bun', () => {
        uuid.mockImplementation(() => 'mocked-uuid');

        const action = ingredientToOrderAdded(ingredient1);
        const state = orderSlice.reducer(initialState, action);
        expect(state.ingredientsInOrder.stuffing).toContainEqual({
            ...ingredient1,
            _uuid: 'mocked-uuid',
        });
        expect(state.ingredientsInOrder.bun).toEqual(initialState.ingredientsInOrder.bun);
    });

    it('should add same stuffing ingredients with different uuids and dont replace each other', () => {
        let state = null;
        //adding ingredient 1st time
        const action = ingredientToOrderAdded(ingredient1);
        state = orderSlice.reducer(initialState, action);
        //adding same ingredient 2nd time
        const action2 = ingredientToOrderAdded(ingredient1);
        state = orderSlice.reducer(state, action2);

        expect(state.ingredientsInOrder.stuffing).toHaveLength(2);
    });

    it('should remove element from stuffing', () => {
        const stateWithStuffing = {
            ...initialState,
            ingredientsInOrder: {
                bun: null,
                stuffing: [addedIngredient1, addedIngredient2],
            }
        };
        const action = ingredientFromOrderRemoved(addedIngredient1);
        const state = orderSlice.reducer(stateWithStuffing, action);
        expect(state.ingredientsInOrder.stuffing).toHaveLength(1);
        expect(state.ingredientsInOrder.stuffing[0]).toEqual(addedIngredient2);
    });

    it('should remove bun from ingredients', () => {
        const stateWithBunAndStuffing = {
            ...initialState,
            ingredientsInOrder: {
                bun: bun1,
                stuffing: [addedIngredient1, addedIngredient2],
            }
        };
        const action = ingredientFromOrderRemoved(bun1);
        const state = orderSlice.reducer(stateWithBunAndStuffing, action);
        expect(state.ingredientsInOrder.stuffing).toHaveLength(2);
        expect(state.ingredientsInOrder.bun).toBeNull();
    });


    it('should reorder ingredients', () => {
        const stateWithStuffing = {
            ...initialState,
            ingredientsInOrder: {
                bun: null,
                stuffing: [addedIngredient1, addedIngredient2],
            }
        };

        const action = ingredientsReordered({ dragIndex: 0, hoverIndex: 1 });
        const state = orderSlice.reducer(stateWithStuffing, action);

        expect(state.ingredientsInOrder.stuffing[0]).toEqual(addedIngredient2);
        expect(state.ingredientsInOrder.stuffing[1]).toEqual(addedIngredient1);
    });


    it('should save order data', () => {
        const orderData = {
            name: 'Order Name',
            order: {
                number: 1234,
            },
            success: true,
        };

        const action = orderPlaced(orderData);
        const state = orderSlice.reducer(initialState, action);
        expect(state.orderData).toEqual(orderData);
    });


    it('should remove all order data and remove all ingredients', () => {
        const stateWithOrder = {
            ...initialState,
            orderData: {
                name: 'Order Name',
                order: {
                    number: 1234,
                },
                success: true,
            },
            ingredientsInOrder: {
                bun: bun1,
                stuffing: [addedIngredient1, addedIngredient2],
            }
        };

        const action = orderCleared();
        const state = orderSlice.reducer(stateWithOrder, action);

        expect(state.orderData).toBeNull();
        expect(state.ingredientsInOrder).toEqual(initialState.ingredientsInOrder);
    });
})



describe('order extraReducers (after api calls)', () => {
    const store = configureStore({
        reducer: combineSlices(orderApi, orderSlice),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(orderApi.middleware),
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should successfully create order and save order data to state', async () => {        
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(order_create_api_success_response)
        )

        const mockIngredients = [bun1._id, ingredient1._id, ingredient2._id, bun1._id];
        const result = await store.dispatch(
            orderApi.endpoints.placeOrder.initiate({ ingredients: mockIngredients })
        );

        expect(result.data).toEqual(order_create_api_success_response);
        const state = store.getState()[orderSlice.name];
        expect(state).toEqual({...initialState, orderData: order_create_api_success_response });
    });



})
