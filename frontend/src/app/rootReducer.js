import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './feautures/authSlice.js'
import { authApi } from './api/authApi'
import { courseApi } from './api/courseApi.js'

const rootReducer = combineReducers({

    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth:authSlice
})

export default rootReducer