'use strict'

import Utils from './Utils'
import { TrainingObject, TrainingSet } from "./interfaces";

export default class CustomKNN {

    private utils = new Utils();

    public runKNNModel(testInput: Array<number>, trainingData: Array<TrainingObject>): TrainingSet {
        const trainingObject: Array<TrainingSet> = this.utils.generateTrainingObject(trainingData);
        this.getCompatibilityRatings(testInput, trainingObject);
        this.findMostCompatible(trainingObject);
        return trainingObject[0];
    }

    private getCompatibilityRatings(testInput: Array<number>, trainingObject: Array<TrainingSet>): void {
        const size: number = trainingObject.length;
        for (let i = 0; i < size; i++) {
            trainingObject[i]["compatibilityScore"] = this.determinecompatibilityScore(testInput, trainingObject[i].input);
        }
    }

    // Applies Euclidean distance to determine compatibility score
    private determinecompatibilityScore(a: Array<number>, b: Array<number>): number {
        let compatibilityScore: number = 0;
        for (let i = 0; i < a.length; i++) {
            let diff: number = a[i] - b[i];
            let pow: number = diff * diff; 
            compatibilityScore += pow;
        }
        return this.getInverse(Math.sqrt(compatibilityScore));
    }

    private findMostCompatible(trainingObject: Array<TrainingSet>): TrainingSet {
        return trainingObject.sort((a: TrainingSet, b: TrainingSet) => {
            if (b.compatibilityScore && a.compatibilityScore)
                return b.compatibilityScore - a.compatibilityScore;
            return -1; 
        })[0];
    }

    private getInverse(x: number): number {
        return 1 / (1 + x); 
    }

    private revertArrayToString(numArray: Array<number>): string {
        let charArr: Array<string> = numArray.map((num: number) => {
            if (num === 0) return '';
            return String.fromCharCode(num*255);
        });
        return charArr.join('').trim();
    }

    public formatOutput(outputObject: TrainingSet): Object {
        const output: Object = outputObject.output[0];
        return {
            "output": output === 1 ? "Likely a SQLInjection" : "Likely a valid input",
            "mostSimilarlyResembles": this.revertArrayToString(outputObject.input), 
            "compatibilityScore": outputObject.compatibilityScore
        }
    }

}