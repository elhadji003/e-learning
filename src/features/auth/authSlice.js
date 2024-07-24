// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        logOut: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        updateProfileImage: (state, action) => {
            if (state.user) {
                state.user.profileImageUrl = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authAPI.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.refreshToken = payload.refreshToken;
                    state.user = payload.user;
                    localStorage.setItem('token', payload.token);
                    localStorage.setItem('refreshToken', payload.refreshToken);
                }
            )
            .addMatcher(
                authAPI.endpoints.refreshToken.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.accessToken;
                    localStorage.setItem('token', payload.accessToken);
                }
            );
    },
});

export const { setCredentials, logOut, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
