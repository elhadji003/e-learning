import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersSlice from '../features/users/usersSlice'
import { authAPI } from '../features/auth/authAPI';
import { usersAPI } from '../features/users/usersAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        users: usersSlice,
        [usersAPI.reducerPath]: usersAPI.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware, usersAPI.middleware),
});

export default store;
