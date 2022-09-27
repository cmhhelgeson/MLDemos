import React, {useState} from "react";
import { GenericXPWindow } from "../GenericXPWindow";
import { SliderParams } from "../../utils/types";
import { useDispatch } from "react-redux";
import { changeWeight, resetAllWeights } from "../../features/weights/slice";


const Slider = ({label, lowVal, highVal, lowValLabel, highValLabel, action, index}: SliderParams) => {

    const [localState, setLocalState] = useState<number>(0);
    const dispatch = useDispatch();

    const handleChange = (event: any) => {
        setLocalState(event.target.value);
        if (!action) { 
            console.log("No action")
            return;
        }
        switch (action) {
            case changeWeight: 
            case "CHANGE_WEIGHT": {
                console.log(index);
                //Bad code need to find way to distinguish more clearly between weights
                if (index === undefined || index === null) {
                    break;
                }
                //Redudant code to assuage eslint cheeck
                const changeIndex = index;
                console.log(changeIndex);
                dispatch(changeWeight({index: changeIndex, weight: event.target.value}))
            } break;
        }
    }

    const step = (highVal - lowVal) / 200;
    return (<div className="field-row" style={{"width": "100%", "display": "flex", "justifyContent": "space-evenly"}}>
        <div>{label}</div>
        <div className="slider" style={{"display": "flex", "justifyContent": "start"}}>
            <div>{lowValLabel ? lowValLabel : lowVal.toString()}</div>
            <input id="range26" type="range" min={lowVal.toString()} max={highVal.toString()} step={step} value={localState} onChange={handleChange}/>
            <label htmlFor="range27">{highValLabel ? highValLabel : highVal.toString()}</label>
        </div>
    </div>);
}



export type SliderDisplayParams = {
    sliders: SliderParams[], 
    text: string
}
export const SliderDisplay = ({sliders, text}: SliderDisplayParams) => {
    return (<GenericXPWindow width={300} height={300}
        text={text} offsetX={2000} offsetY={20}>
        <div className="slider_block" style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
        {sliders.map((slider, idx) => {
            return (<Slider 
                label={slider.label}
                lowVal={slider.lowVal}
                highVal={slider.highVal}
                lowValLabel={slider.lowValLabel}
                highValLabel={slider.highValLabel}
                index={idx}
                action={slider.action}/>
            )
        })}
            
        </div>
    </GenericXPWindow>);
}


//export const SliderDisplay = connect(null, null)(SliderDisplayComponent)
//Put in when reworking, need to get basics first
//<button onClick={() => dispatch(resetAllWeights)} style={{"marginTop": "10px"}}>Reset</button>
