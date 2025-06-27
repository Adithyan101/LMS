import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './feautures/authSlice.js'
import { authApi } from './api/authApi'

const rootReducer = combineReducers({

    [authApi.reducerPath]: authApi.reducer,
    auth:authSlice
})

export default rootReducer