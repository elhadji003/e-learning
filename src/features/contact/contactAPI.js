import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../routes/api/enpoint';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        createMessage: builder.mutation({
            query: (message) => ({
                url: '/contact',
                method: 'POST',
                body: message,
            }),
        }),
        getAllMessages: builder.query({
            query: () => '/contacts',
        }),
        getMessageById: builder.query({
            query: (id) => `/contact/${id}`,
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/contact/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateMessageMutation,
    useGetAllMessagesQuery,
    useGetMessageByIdQuery,
    useDeleteMessageMutation,
} = contactApi;
