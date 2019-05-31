'use strict'

// Interface for the plain-text inputs
export interface TrainingObject {
    input: string,
    output: Array<number>
};

// Interface for the training set that gets processed
export interface TrainingSet {
    input: Array<number>
    output: Array<number>,
    compatibilityScore ?: number | null
};
