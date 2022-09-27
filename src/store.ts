import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { graphPoints } from './features/graphPoints/slice';
import { weights } from './features/weights/slice';

export const store = configureStore({
    reducer: {
        graphPoints,
        weights
    },
    devTools: true,
})

//Types the specific dispatch we expect from our store
export type AppDispatch = typeof store.dispatch;


