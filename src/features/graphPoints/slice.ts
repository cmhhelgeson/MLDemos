import { createSlice } from "@reduxjs/toolkit";
import {GraphPointStatus, RootState} from "../../utils/types"

import {Point } from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateGraphPoints } from "../../utils/graphUtils";



type ChangePointStatusPayload = {
    point: Point, 
    status: GraphPointStatus
}

//TODO: Decide whether to initialize in slice or here
const initialState: RootState["graphPoints"] = generateGraphPoints(20);

const graphPointsSlice = createSlice({
    name: "graphPoints",
    initialState, 
    reducers: {
        initGraphPoints: (state, action: PayloadAction<number>) => {
            state = generateGraphPoints(action.payload);
        },
        changePointStatus: (state, action: PayloadAction<ChangePointStatusPayload>) => {
            const {point, status} = action.payload;
            state[point.x][point.y] = status;
        },
        changeAllInactivePoints: (state, action: PayloadAction<GraphPointStatus>) => {
            for (let x = 0; x < 20; x++) {
                for (let y = 0; y < 20; y++) {
                    if (state[x][y] === "inactive") {
                        state[x][y] = action.payload;
                    }
                }
            }
        }
    }, 
}) 

export const graphPoints = graphPointsSlice.reducer 

export const {
    initGraphPoints, 
    changePointStatus, 
    changeAllInactivePoints
} = graphPointsSlice.actions

export const graphPointsSelector = (state: RootState) => state.graphPoints

/*extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {
            state.points = [];
        })
    } */