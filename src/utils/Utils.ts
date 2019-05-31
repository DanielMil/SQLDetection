'use strict';

import { TrainingObject, TrainingSet } from "./interfaces";

export default class Utils {

    public generateTrainingObject(trainingData: Array<TrainingObject>): Array<TrainingSet>  {
        this.fixSentenceLength(trainingData);
        return trainingData.map((mutableDataSet) => {
            return {
                input: this.encodeNumber(mutableDataSet.input),
                output: mutableDataSet.output
            }
        });
    }

    public serializeInputSentence(trainingData: Array<TrainingObject>, sentence: string): Array<number> {
        let inputArr: Array<string> = this.generateInputArray(trainingData); 
        const maxLength: number = this.getLongestSentenceLength(inputArr);
        return this.encodeNumber(this.serializeSentence(sentence, maxLength));
    }

    public formatOutput(chanceOfSQL: number): Object {
        chanceOfSQL *= 100;
        return {
            '%_chance_of_injection': chanceOfSQL
        }
    }

    public stripQuotesFromInput(inputString: string): string {
        return inputString.replace(/['"]+/g, '');
    }
    
    private encodeNumber(sentence: string): Array<number> {
        return sentence.split('').map(char => {
            if (char == '#') 
                return 0;
            return char.charCodeAt(0) / 255;
        });
    }

    private fixSentenceLength(trainingData: Array<TrainingObject>): void {
        let inputArr: Array<string> = this.generateInputArray(trainingData); 
        const maxLength: number = this.getLongestSentenceLength(inputArr);
        for (let set = 0; set < trainingData.length; set++) {
            if (trainingData[set].input.length != maxLength) {
                trainingData[set].input = this.serializeSentence(trainingData[set].input, maxLength);
            }
        }
    }

    private serializeSentence(sentence: string, maxLength:number):string {
        return sentence.padEnd(maxLength, '#');
    }

    private getLongestSentenceLength(sentenceArr:Array<string>): number {
        let sizeArr: Array<number> = sentenceArr.map(sentence => {
            return sentence.length;
        }).sort((a: number,b: number) => {
            return b-a;
        });
        return sizeArr[0];
    }

    private generateInputArray(trainingData: Array<TrainingObject>): Array<string> {
        return trainingData.map((trainingSet) => {
            return trainingSet.input; 
        });
    }
} 