import { initGraphPoints, changePointStatus, changeAllInactivePoints} from "./features/graphPoints/slice";
import { resetAllWeights, changeWeight } from "./features/weights/slice";

export type AppAction = 
    typeof initGraphPoints | 
    typeof changePointStatus | 
    typeof changeAllInactivePoints |
    typeof resetAllWeights |
    typeof changeWeight
    

