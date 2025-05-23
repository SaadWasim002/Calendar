import { configureStore } from '@reduxjs/toolkit'
import EventReducer from './../features/events/eventSlice'

export const store = configureStore({
    reducer : EventReducer
})