import { combineReducers } from "@reduxjs/toolkit";
import dnsSlice from "./features/dns/dnsSlice";
import globalLoaderSlice from "./features/loader/backdropSlice";


const rootReducer = combineReducers({
    dnsSlice,
    globalLoaderSlice
})

export default rootReducer;