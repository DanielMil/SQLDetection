'use strict'

import Utils from './Utils'

export default class CustomKNN {

    constructor() {
        this.utils = new Utils();
    }

    runKNNModel(testInput, trainingData) {
        const inputAsNumber = this.utils.encodeNumber(testInput);
        const trainingObject = this.utils.generateTrainingObject(trainingData);
        const compatibilityRatings = this.getCompatibilityRatings(inputAsNumber, trainingObject);
        
    }

    getCompatibilityRatings(testInput, trainingObject) {
        for (let i = 0; i < size; i++) {
            this.determineCompatabilityScore(testInput, trainingObject[i].input);
        }
    }

    // Applies Euclidean distance to determine compatibility score
    determineCompatabilityScore(a, b) {
        let compatabilityScore = 0;
        for (let i = 0; i < a.length; i++) {
            let diff = a[i] - b[i];
            let pow = diff * diff; 
            compatabilityScore += pow;
        }
        return Math.sqrt(compatabilityScore);
    }

}