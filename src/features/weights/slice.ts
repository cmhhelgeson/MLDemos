import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../utils/types"

import { PayloadAction } from "@reduxjs/toolkit";



type ChangeWeightPayload = {
    index: number
    weight: number
}

//TODO: Decide whether to initialize in slice or here
const initialState: RootState["weights"] = [1, 1, 1, 1];

const weightsSlice = createSlice({
    name: "weights",
    initialState, 
    reducers: {
        resetAllWeights: (state) => {
            state = [0, 0, 0, 0]
        },
        changeWeight: (state, action: PayloadAction<ChangeWeightPayload>) => {
            const {index, weight} = action.payload;
            state[index] = weight;
        }
    }, 
}) 

export const weights = weightsSlice.reducer 

export const {
    resetAllWeights,
    changeWeight
} = weightsSlice.actions



export const weightsSelector = (state: RootState) => state.weights