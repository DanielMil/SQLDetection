'use strict'

import Utils from './Utils'

export default class CustomKNN {

    constructor() {
        this.utils = new Utils();
    }

    runKNNModel(testInput, trainingData) {
        const trainingObject = this.utils.generateTrainingObject(trainingData);
        this.getCompatibilityRatings(testInput, trainingObject);
        this.findMostCompatible(trainingObject);
        return trainingObject[0];
    }

    getCompatibilityRatings(testInput, trainingObject) {
        const size = trainingObject.length;
        for (let i = 0; i < size; i++) {
            trainingObject[i]["compatibilityScore"] = this.determinecompatibilityScore(testInput, trainingObject[i].input);
        }
    }

    // Applies Euclidean distance to determine compatibility score
    determinecompatibilityScore(a, b) {
        let compatibilityScore = 0;
        for (let i = 0; i < a.length; i++) {
            let diff = a[i] - b[i];
            let pow = diff * diff; 
            compatibilityScore += pow;
        }
        return this.getInverse(Math.sqrt(compatibilityScore));
    }

    findMostCompatible(trainingObject) {
        return trainingObject.sort((a,b) => {
            return b.compatibilityScore - a.compatibilityScore;
        })[0];
    }

    getInverse(x) {
        return 1 / (1 + x); 
    }

    revertArrayToString(numArray) {
        let charArr = numArray.map((num) => {
            if (num === 0) return '';
            return String.fromCharCode(num*255);
        });
        return charArr.join('').trim('');
    }

    formatOutput(outputObject) {
        const output = outputObject.output[0];
        return {
            "output": output === 1 ? "Likely a SQLInjection" : "Likely a valid input",
            "mostSimilarlyResembles": this.revertArrayToString(outputObject.input), 
            "compatibilityScore": outputObject.compatibilityScore
        }
    }

}