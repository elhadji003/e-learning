import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, DELETE_COURS_ROUTE, GET_COURS_ROUTE, POST_COURS_ROUTE, PUT_COURS_ROUTE } from '../../routes/api/enpoint';

export const coursAPI = createApi({
    reducerPath: 'coursAPI',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        // Créer un cours
        postCours: builder.mutation({
            query: (body) => ({
                url: `${POST_COURS_ROUTE}`,
                method: 'POST',
                body,
            }),
        }),
        // Récupérer tous les cours
        getCours: builder.query({
            query: () => `${GET_COURS_ROUTE}`,
        }),
        // Mettre à jour un cours
        updateCours: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${PUT_COURS_ROUTE}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        updateCours: builder.mutation({
            query: ({ id }) => ({
                url: `${DELETE_COURS_ROUTE}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Exporter les hooks générés
export const { usePostCoursMutation, useGetCoursQuery, useUpdateCoursMutation } = coursAPI;
