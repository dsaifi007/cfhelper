import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import rootReducer from './root.reducer';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom middleware example
const myMiddleware: Middleware = (store) => (next) => (action) => {
    // Your custom middleware logic here
    return next(action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(thunk, logger, myMiddleware)

});

export default store;

