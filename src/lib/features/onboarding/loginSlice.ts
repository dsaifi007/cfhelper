import { createSlice } from "@reduxjs/toolkit";

export interface loginState {

}

const initialState: loginState = {

};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateLogin: (state, action: any) => {
            return { ...state, ...action.payload };
        },
        resetLogin: (state, action: any) => {
            return initialState;
        },
    },
});

export const { updateLogin, resetLogin }: any = loginSlice.actions;

export default loginSlice.reducer;
