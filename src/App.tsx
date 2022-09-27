/* REACT IMPORTS */
import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
/* UTILITIES */
import {clearCanvas, setCanvasSize} from "./utils/drawUtils"
/* COMPONENTS */
import { GenericXPWindow } from './components/GenericXPWindow';
import {generateGraphPoints} from "./utils/graphUtils"
import { changePointStatus, graphPointsSelector, changeAllInactivePoints } from './features/graphPoints/slice';
import {Point} from "./utils/types"
import { drawGraph } from './utils/drawUtils';
import { SliderDisplay } from './components/SliderDisplay';
import { SliderParams } from './utils/types';
import { changeWeight } from './features/weights/slice';
import { connect } from 'http2';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const WINDOW_WIDTH = 1000;
const WINDOW_HEIGHT = 900;

const GRAPH_WIDTH = 700;
const GRAPH_HEIGHT = 600;

type WeightIndexes = {
  weight1_1: number,
  weight2_1: number, 
  weight1_2: number,
  weight2_2: number
}


const sliderArray: SliderParams[] = [
  {
    label: "W1 to O1",
    lowVal: -1,
    highVal: 1, 
    action: "CHANGE_WEIGHT"
  }, 
  {
    label: "W2 to O1",
    lowVal: -1,
    highVal: 1,
    action: "CHANGE_WEIGHT"
  }, 
  {
    label: "W1 to O2",
    lowVal: -1,
    highVal: 1,
    action: "CHANGE_WEIGHT"
  }, 
  {
    label: "W2 to O2",
    lowVal: -1,
    highVal: 1,
    action: "CHANGE_WEIGHT"
  } 
]

function App() {
  /* JSX ELEMENT REFS */
  //#region 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //const canvasRef = useCanvas();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  /* REDUX UTILITIES */
  const graphPoints = useSelector(graphPointsSelector);
  const dispatch = useDispatch();


  @connect 
  const indirectDispatchHandler = () => {

  }

  const [graphCenter, setGraphCenter] = useState<Point>({x: 100, y: CANVAS_HEIGHT - 200});
  const [widthInterval, setWidthInterval] = useState<number>((CANVAS_WIDTH - 100) / 20);
  const [heightInterval, setHeightInterval] = useState<number>((CANVAS_HEIGHT - 200) / 20);
  const [highlightedX, setHighlightedX] = useState<number>(-1);
  const [highlightedY, setHighlightedY] = useState<number>(-1);
  
  //#endregion

  /* UTILITIES */
  //#region
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {canvas, context: canvas?.getContext("2d")}
  }

  const handleMouseMove = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    const collisionBoundary = 20 / 2;
    if (offsetX < graphCenter.x && offsetY > graphCenter.y) {
      return;
    }
    const mouseXFromGraphCenter = offsetX - graphCenter.x;
    const mouseYFromGraphCenter = graphCenter.y - offsetY;

    //Find how close the number is to a product of the intervals

    //If center is 100, 600, widthInterval 35, cursor x: 127 then prev = 27 & next = 8
    const distanceFromPreviousX = mouseXFromGraphCenter % widthInterval;
    const distanceFromNextX = widthInterval - distanceFromPreviousX;

    if (distanceFromPreviousX <= widthInterval / 2) {
      setHighlightedX(Math.floor(mouseXFromGraphCenter / 35));

    } else {
      setHighlightedX(Math.floor(mouseXFromGraphCenter / 35 + 1));
    }

    const distanceFromPreviousY = mouseYFromGraphCenter % heightInterval;
    const distanceFromNextY = heightInterval - distanceFromPreviousY;

    if (distanceFromPreviousY <= heightInterval / 2) {
      setHighlightedY(Math.floor(mouseYFromGraphCenter / 35));

    } else {
      setHighlightedY(Math.floor(mouseYFromGraphCenter / 35) + 1);
    }
  }

  const handleMouseClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (highlightedX < 0 || highlightedY < 0 || highlightedX >= graphPoints.length || highlightedY >= graphPoints[0].length) {
      return;
    }
    dispatch(changePointStatus({point: {x: highlightedX, y: highlightedY}, status: "good"}));
  }

  const initInactivePoints = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(changeAllInactivePoints("bad"));
  }
  //#endregion
  /*CONDITIONAL EFFECTS */
  //#region
  useEffect(() => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    setCanvasSize(canvas, {
      width: CANVAS_WIDTH, height: CANVAS_HEIGHT, 
      styleHeight: `${CANVAS_HEIGHT}px`, styleWidth: `${CANVAS_WIDTH}px`
    })
    if (!canvas || !context) {
      return;
    }
    drawGraph({
      canvas: canvas, 
      context: context, 
      center: {x: graphCenter.x, y: graphCenter.y }, 
      limit: 20,
      highlightedX: 0,
      highlightedY: 0,
      graphPoints: graphPoints
    });

  }, [])

  useEffect(() => {
    const {canvas, context} = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    drawGraph({
      canvas: canvas, 
      context: context,
      center: {x: graphCenter.x, y: graphCenter.y},
      limit: 20,
      highlightedX: highlightedX,
      highlightedY: highlightedY,
      graphPoints: graphPoints
    })
  }, [highlightedX, highlightedY, graphPoints]);

  
  return (<div>
    <GenericXPWindow 
      text={"ML Demonstrations"}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}
      >
      <div 
        className="canvas_wrapper" 
        style={{
          "width": CANVAS_WIDTH, 
          "height": CANVAS_HEIGHT,
          "zIndex": 8,
          "marginLeft": "75px",
          "marginRight": "75px",
          "marginTop": "20px"}}
        ref={canvasContainerRef}
      >
        <canvas 
          ref={canvasRef} 
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseClick}/>
      </div>
    </GenericXPWindow>
    <SliderDisplay text="Weight Sliders" sliders={sliderArray}/>
    <button onClick={initInactivePoints}>Initialize Inactive Points</button>
    </div>
  );
}

export default App;