import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { first_name: "", last_name: "", email: "", phone: "+998" } };

export const authSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.value = action.payload;
        },
        clearAuth: (state) => {
            state.value = initialState;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const getAuth = (state) => {
    return state.auth.value;
};

export default authSlice.reducer;
