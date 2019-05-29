'use strict';

export default class Utils {

    encodeNumber(sentence) {
        return sentence.split('').map(char => {
            if (char == '#') 
                return 0;
            return char.charCodeAt(0) / 255;
        });
    }

    fixSentenceLength(trainingData) {
        let inputArr = this.generateInputArray(trainingData); 
        const maxLength = this.getLongestSentenceLength(inputArr);
        for (let set = 0; set < trainingData.length; set++) {
            if (trainingData[set].input.length != maxLength) {
                trainingData[set].input = this.serializeSentence(trainingData[set].input, maxLength);
            }
        }
    }

    serializeSentence(sentence, maxLength) {
        return sentence.padEnd(maxLength, '#');
    }

    getLongestSentenceLength(sentenceArr) {
        let sizeArr = sentenceArr.map(sentence => {
            return sentence.length;
        }).sort((a,b) => {
            return b-a;
        });
        return sizeArr[0];
    }

    generateTrainingObject(trainingData) {
        let mutableData = trainingData;
        this.fixSentenceLength(mutableData);
        return mutableData.map((mutableDataSet) =>{
            return {
                input: this.encodeNumber(mutableDataSet.input),
                output: mutableDataSet.output
            }
        });
    }

    generateInputArray(trainingData) {
        return trainingData.map((trainingSet) => {
            return trainingSet.input; 
        });
    }

    serializeInputSentence(trainingData, sentence) {
        let inputArr = this.generateInputArray(trainingData); 
        const maxLength = this.getLongestSentenceLength(inputArr);
        return this.encodeNumber(this.serializeSentence(sentence, maxLength));
    }

    formatOutput(chanceOfSQL) {
        chanceOfSQL *= 100;
        return {
            '%_chance_of_injection': chanceOfSQL
        }
    }

    stripQuotesFromInput(inputString) {
        return inputString.replace(/['"]+/g, '');
    }
} 