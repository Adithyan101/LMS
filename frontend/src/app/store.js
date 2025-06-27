import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer.js'
import { authApi } from './api/authApi.js'


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})