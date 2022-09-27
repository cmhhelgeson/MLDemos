import {createAction} from "@reduxjs/toolkit"
import { GraphPointStatus } from "../utils/types"

/* type EndStrokePayload = {
    stroke: Stroke,
    historyIndex: number
}
export const endStroke = createAction<EndStrokePayload>("endStroke"); */

type ClearScreenPayload = {
    graphPoints: GraphPointStatus[][];
}

export const ClearScreenPayload = createAction<ClearScreenPayload>("clearScreen");