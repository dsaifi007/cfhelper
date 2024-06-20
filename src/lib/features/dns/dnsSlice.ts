import { createSlice } from "@reduxjs/toolkit";

export interface dnsState {
    dnsData: [],
    accountID: string,
    zoneId: string,
    formData: any
}

const initialState: dnsState = {
    dnsData: [],
    accountID: "",
    zoneId: "",
    formData: {}
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
