import { GraphPointStatus, Point } from "./types";
import { NeuralNetwork } from "./neuralUtils";
import { NNConstructorProps } from "./neuralUtils";
import { DrawPixel } from "./drawUtils";


//Thank god Typescript supports 2d Arrays 
export const generateGraphPoints = (limit: number): GraphPointStatus[][] => {
    const activePoints: GraphPointStatus[][] = [];
    for (let i = 0; i < limit; i++) {
      activePoints[i] = new Array(limit);
      for (let j = 0; j < limit; j++) {
        activePoints[i][j] = "inactive";
      }
    }
    console.log(activePoints);
    return activePoints as GraphPointStatus[][];
}



//TODO: Reconsider how canvas is considered since upside-down canvas makes switching between
//Canvas space and coordinate space difficult
//Start from the bottom-left of the graph
type AnalyzeGraphParams = {
  endPoint: Point,
  weight1_1: number, 
  weight2_1: number, 
  weight1_2: number,
  weight2_2: number
}
export const analyzeGraph = ({
  startPoint, endPoint, 
  weight1_1, weight2_1, 
  weight1_2, weight2_2
}: AnalyzeGraphParams) => {

  const nn = new NeuralNetwork(weight1_1, weight2_1, weight1_2, weight2_2);
  for (let x = 0; x < endPoint.x; x++) {
    for (let y = 0; y < endPoint.y; y++) {
      const pixelAnalyzed = nn.Classify(x, y);
      if (pixelAnalyzed === 0) {
        //DrawPixel(100 + x, 600 - y, "aquamarine", 0.2 opacity);
      } else {
        //DrawPixel(100 + x, 600 - y, "redish", 0.2 opacity)
      }
    }
  }
}
