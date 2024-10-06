import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice, initialState } from './slice';
import { authApi } from './api';

import { MockFetchSuccessResponse, get_user_api_success_response, login_user_api_success_response, logout_user_api_success_response, mockAccessToken, mockUser, mockUser2, register_user_api_success_response, update_user_api_success_response } from '../../test/mock_data';

describe('auth reducer', () => {
    it("should return the initial state", () => {
        const state = authSlice.reducer(initialState, { type: "" });
        expect(state).toEqual(initialState);
    });

    it('should set loged in user data', () => {
        const action = authSlice.actions.userLoggedIn(mockUser);
        const state = authSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            user: mockUser
        });
    });

    it('should clear user data', () => {
        const loggedInState = {
            ...initialState,
            user: mockUser
        };
        const action = authSlice.actions.userLoggedOut();
        const state = authSlice.reducer(loggedInState, action);
        expect(state).toEqual(initialState);
    });
});



describe('auth extraReducers (after api calls)', () => {
    const store = configureStore({
        reducer: combineSlices(authApi, authSlice),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should make fake call to get_user api and save result to state', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(get_user_api_success_response)
        )

        const result = await store.dispatch(
            authApi.endpoints.getUser.initiate()
        );

        expect(result).toMatchObject({
            status: 'fulfilled',
            isLoading: false,
            isSuccess: true,
            isError: false,
            data: get_user_api_success_response.user,
        });

        const state = store.getState()[authSlice.name];
        expect(state).toEqual({ ...initialState, user: get_user_api_success_response.user });
    });



    it('should make fake call to register_user api and save result to state', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(register_user_api_success_response)
        )

        const result = await store.dispatch(
            authApi.endpoints.registerUser.initiate({
                ...mockUser,
                password: "testPassword"
            })
        );
        expect(result.data).toEqual(register_user_api_success_response);
        const state = store.getState()[authSlice.name];
        expect(state).toEqual({ ...initialState, user: register_user_api_success_response.user });
    });

    it('should make fake call to login user api and save result to state', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(login_user_api_success_response)
        )

        const result = await store.dispatch(
            authApi.endpoints.loginUser.initiate({
                email: mockUser.email,
                password: "testPassword"
            })
        );
        expect(result.data).toEqual(login_user_api_success_response);
        const state = store.getState()[authSlice.name];
        expect(state).toEqual({ ...initialState, user: login_user_api_success_response.user });
    });

    it('should make fake call to logout user api and remove data from state', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(logout_user_api_success_response)
        )

        const result = await store.dispatch(
            authApi.endpoints.logoutUser.initiate({
                token: mockAccessToken
            })
        );
        expect(result.data).toEqual(logout_user_api_success_response);
        const state = store.getState()[authSlice.name];
        expect(state).toEqual({ ...initialState, user: null });
    });

    it('should make fake call to update user api and replace data in state', async () => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            MockFetchSuccessResponse(update_user_api_success_response)
        )

        const result = await store.dispatch(
            authApi.endpoints.updateUserInfo.initiate({
                ...mockUser2,
                password: "testPassword"
            })
        );
        expect(result.data).toEqual(update_user_api_success_response);
        const state = store.getState()[authSlice.name];
        expect(state).toEqual({ ...initialState, user: update_user_api_success_response.user });
    });


})