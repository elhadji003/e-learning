import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../routes/api/enpoint';

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users',
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: rest,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } = usersAPI;
