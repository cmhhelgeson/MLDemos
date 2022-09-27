import { AppAction } from "../actions";

export type GraphPointStatus = "inactive" | "good" | "bad";


export type Point = {
    x: number
    y: number
}

export type CanvasSize = {
    width: number
    height: number
    styleWidth: string
    styleHeight: string
}


export type RootState = {
    graphPoints: GraphPointStatus[][];
    weights: number[]
}


//TODO: Take out intialValue if not working
export type SliderParams = {
    label: string,
    lowVal: number,
    highVal: number,
    lowValLabel?: string,
    highValLabel?: string,
    action?: string | AppAction
    index?: number
}

