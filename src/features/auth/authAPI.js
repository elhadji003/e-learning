import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    API_URL,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    GET_ME_ROUTE,
    REFRESH_TOKEN_ROUTE,
    UPDATE_PROFILE_IMAGE_ROUTE,
    GET_PROFILE_BY_ID_ROUTE,
    FORGOTPWD_ROUTE,
    RESETPWD_ROUTE,
} from '../../routes/api/enpoint';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: LOGIN_ROUTE,
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: REGISTER_ROUTE,
                method: 'POST',
                body: userInfo,
            }),
        }),
        getMe: builder.query({
            query: () => ({
                url: GET_ME_ROUTE,
                method: 'GET',
            }),
        }),
        refreshToken: builder.mutation({
            query: (token) => ({
                url: REFRESH_TOKEN_ROUTE,
                method: 'POST',
                body: { token },
            }),
        }),
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: UPDATE_PROFILE_IMAGE_ROUTE,
                method: 'POST',
                body: formData,
            }),
        }),
        getProfileById: builder.query({
            query: (id) => ({
                url: `${GET_PROFILE_BY_ID_ROUTE}/${id}`,
                method: 'GET',
            }),
        }),
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: FORGOTPWD_ROUTE,
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `${RESETPWD_ROUTE}/${token}`,
                method: 'POST',
                body: { password },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeQuery,
    useRefreshTokenMutation,
    useUpdateProfileImageMutation,
    useGetProfileByIdQuery,
    useForgetPasswordMutation,
    useResetPasswordMutation,
} = authAPI;
