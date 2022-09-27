import {CanvasSize, GraphPointStatus, Point} from "./types"


type SnapshotMethod = "DATA_URL" | "IMAGE_DATA"

/* GENERAL CANVAS UTILS */
//#region
export const updateCanvas = () => {
    const canvas = document.getElementById('c');
}

export const clearCanvas = (canvas: HTMLCanvasElement, color: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return
    }
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


export const setCanvasSize = (canvas: HTMLCanvasElement, cs: CanvasSize): void => {
    canvas.width = cs.width;
    canvas.height = cs.height;
    canvas.style.width = `${cs.styleWidth}px`
    canvas.style.height = `${cs.styleHeight}px`
    canvas.getContext("2d")?.scale(1, 1);
}


export const restoreSnapshot = (canvas: HTMLCanvasElement, method: SnapshotMethod = "DATA_URL", snapshot: ImageData | string): void => {
    switch(method) {
        case "DATA_URL": {
            if (typeof snapshot !== 'string') {
                console.error("Snapshot has incompatible data type for chosen method");
                return;
            }
            const img = new Image();
            const ctx = canvas.getContext("2d");
            img.onload = () => ctx?.drawImage(img, 0, 0)
            img.src = snapshot;
            return;
        }
        case "IMAGE_DATA": {
            const ctx = canvas.getContext("2d");
            if (snapshot instanceof ImageData) {
                ctx?.putImageData(snapshot, 0, 0);
            } else {
                console.error("Snapshot has incompatible data type for chosen method");
                return;
            }
        }
    }


}

export const drawStroke = (
    context: CanvasRenderingContext2D,
    points: Point[],
    color: string
  ) => {
    if (!points.length) {
      return
    }
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    //context.beginPath();
    points.forEach((point, idx) => {
      context.lineTo(point.x, point.y);
    })
    //Callings stroke ater moving the line to new point significantly
    //Improves performance
    context.stroke();
    context.closePath();
}

//#endregion


export const DrawPixel = (
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D, 
    x: number, y: number, 
    color: string, opacity: number) => {
        context.fillStyle = color;
        context.globalAlpha = opacity;
        context.fillRect(x, y, 1, 1);
        context.globalAlpha = 1;
}

/* GRAPH DRAWING FUNCTIONS */
//#region
type DrawGraphParams = {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    center: Point
    limit: number,
    highlightedX: number,
    highlightedY: number,
    graphPoints: GraphPointStatus[][]
}

export const drawGraph = ({
    canvas, context, 
    center, limit, 
    highlightedX, highlightedY,
    graphPoints
}: DrawGraphParams) => {
    clearCanvasForGraph({canvas, context});
    const widthInterval = (canvas.width - center.x) / limit;
    const heightInterval = center.y / limit;
    drawGraphLines({canvas, context, center, limit, widthInterval, heightInterval})
    drawActivePoints({canvas, context, center, limit, graphPoints})
    drawHighlightedPoint({canvas, context, center, limit, highlightedX, highlightedY})
    //shadeGraphRegion({canvas: canvas, context: context, center: center, limit: limit, start: {x: 200, y: 600}, end: {x: -100, y: -100}});
}

type ClearCanvasForGraphParams = Pick<DrawGraphParams, "canvas" | "context">
const clearCanvasForGraph = ({canvas, context}: ClearCanvasForGraphParams) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fill();
}


type DrawGraphLinesParams = Pick<DrawGraphParams, "canvas" | "context" | "center" | "limit"> & {
    widthInterval: number
    heightInterval: number
}
const drawGraphLines = ({canvas, context, center, limit}: DrawGraphLinesParams) => {
    context.beginPath();
    context.strokeStyle = "blue"
    context.direction = "ltr"
    context.lineWidth = 5;
    //Left Side of Screen
    context.moveTo(0, center.y);
    //Right Side of Screen
    context.lineTo(canvas.width, center.y);
    //Center Point
    context.moveTo(center.x, center.y);
    //Top of Screen
    context.lineTo(center.x, 0);
    //Bottom of Screen
    context.lineTo(center.x, canvas.height);
    //Draw
    context.stroke();
    //Draw Graph Guidelines
    context.beginPath();
    const widthInterval = (canvas.width - center.x) / limit;
    const heightInterval = center.y / limit;
    context.strokeStyle = "gray";
    context.lineWidth = 2;
    context.globalAlpha = 0.2;
    for (let i = 1; i <= limit; i++) {
      context.moveTo(center.x + (i * widthInterval), 0);
      context.lineTo(center.x + (i * widthInterval), center.y);
      context.moveTo(center.x, center.y - (i * heightInterval))
      context.lineTo(canvas.width, center.y - (i * heightInterval));
    }
    context.stroke();  
    context.closePath();
    context.globalAlpha = 1;

}


const drawHighlightedPoint = ({canvas, context, center, limit, highlightedX, highlightedY}: Omit<DrawGraphParams, "graphPoints">) => {
    const widthInterval = (canvas.width - center.x) / limit;
    const heightInterval = center.y / limit;
    context.globalAlpha = 1;
    if (highlightedX === undefined || highlightedY === undefined || highlightedX < 0 || highlightedY < 0) {
        return;
    } else {
    context.beginPath();
    context.fillStyle = "green";
    context.arc(center.x + widthInterval * highlightedX, center.y - heightInterval * highlightedY, 4, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    }
}


type DrawActivePointsParams = {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    center: Point
    limit: number
    graphPoints: GraphPointStatus[][]
}

const DrawCircle = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    context.arc(x, y, radius, 0, 2 * Math.PI);
}

const drawActivePoints = ({canvas, context, center, limit, graphPoints}: DrawActivePointsParams) => {
    const widthInterval = (canvas.width - center.x) / limit;
    const heightInterval = center.y / limit;
    console.log(widthInterval);
    console.log(heightInterval);
    for (let x = 0; x < graphPoints.length; x++) {
        for (let y = 0; y < graphPoints.length; y++) {
            if (graphPoints[x][y] === "inactive") {
                continue;
            } else {
                context.beginPath();
                context.fillStyle = graphPoints[x][y] === "good" ? "blue" : "red";
                DrawCircle(context, center.x + widthInterval * x, center.y - heightInterval * y, 4);
                context.fill();
                context.closePath();
            } 
        }
    }   
}



type ShadeGraphRegionParams = {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    center: Point
    limit: number
    start: Point
    end: Point
}
const shadeGraphRegion = ({canvas, context, center, limit, start, end}: ShadeGraphRegionParams) => {
    context.beginPath()
    context.globalAlpha = 0.3;
    const widthInterval = (canvas.width - center.x) / limit;
    const heightInterval = center.y / limit;
    context.fillStyle = "aquamarine"
    context.rect(start.x, start.y, end.x, end.y);
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
}
//const drawPredictiveArea = ({canvas, context, center, limit, graphPoints})


//#endregion
//export const clearCanvas = fillCanvas(canvas, "white");