import { createSlice } from "@reduxjs/toolkit";

export interface dnsState {
    dnsData: []
}

const initialState: dnsState = {
    dnsData: []
};

export const dnsSlice = createSlice({
    name: "dns",
    initialState,
    reducers: {
        updateDns: (state, action: any) => {
            return { ...state, ...action.payload };
        },
        resetDns: (state, action: any) => {
            return initialState;
        },
    },
});

export const { updateDns, resetDns }: any = dnsSlice.actions;

export default dnsSlice.reducer;
