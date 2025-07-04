import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer.js'
import { authApi } from './api/authApi.js'
import { courseApi } from './api/courseApi.js';


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async()=>{
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}));
}

initializeApp();

//7.022