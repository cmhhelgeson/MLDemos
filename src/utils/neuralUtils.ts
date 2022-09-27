export type NeuralLayer = {

}

export type NeuralNode = {

}

type NeuralOutput = {

}

type NeuralInput = {

}


export type NNConstructorProps = {
    _weight1_1: number,
    _weight2_1: number
    _weight1_2: number,
    _weight2_2: number,
}
export class NeuralNetwork {
    private weight1_1: number; private weight2_1: number
    private weight1_2: number; private weight2_2: number
    constructor(_weight1_1: number, _weight2_1: number, _weight1_2: number, _weight2_2: number) {
        this.weight1_1 = _weight1_1;
        this.weight2_1 = _weight2_1;
        this.weight1_2 = _weight1_2;
        this.weight2_2 = _weight2_2;
    }

    public Classify = (input_1: number, input_2: number): number => {
        const output_1: number = input_1 * this.weight1_1 + input_2 * this.weight2_1;
        const output_2: number = input_1 * this.weight1_2 + input_2 * this.weight2_2
        return output_1 > output_2 ? 0 : 1
    }

    public Visualize = (graphX: number, graphY: number) => {
        const predictedClass: number = this.Classify(graphX, graphY);
        if (predictedClass === 0) {
            
            
        } else {
            //set color of graph point to false
        }
    } 
}


