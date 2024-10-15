import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersSlice from '../features/users/usersSlice'
import { authAPI } from '../features/auth/authAPI';
import { usersAPI } from '../features/users/usersAPI';
import { contactApi } from '../features/contact/contactAPI';
import { coursAPI } from '../features/cours/coursAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        users: usersSlice,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [coursAPI.reducerPath]: coursAPI.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authAPI.middleware,
            usersAPI.middleware,
            contactApi.middleware,
            coursAPI.middleware,
        ),
});

export default store;
