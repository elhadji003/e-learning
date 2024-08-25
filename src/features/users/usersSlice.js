import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: { list: [] },
    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setUsers } = usersSlice.actions;
export const getUser = (state) => state?.auth?.currentUser;

export default usersSlice.reducer;
