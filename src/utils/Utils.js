'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.encodeNumber = function (sentence) {
        return sentence.split('').map(function (char) {
            if (char == '#')
                return 0;
            return char.charCodeAt(0) / 255;
        });
    };
    Utils.prototype.fixSentenceLength = function (trainingData) {
        var inputArr = this.generateInputArray(trainingData);
        var maxLength = this.getLongestSentenceLength(inputArr);
        for (var set = 0; set < trainingData.length; set++) {
            if (trainingData[set].input.length != maxLength) {
                trainingData[set].input = this.serializeSentence(trainingData[set].input, maxLength);
            }
        }
    };
    Utils.prototype.serializeSentence = function (sentence, maxLength) {
        return sentence.padEnd(maxLength, '#');
    };
    Utils.prototype.getLongestSentenceLength = function (sentenceArr) {
        var sizeArr = sentenceArr.map(function (sentence) {
            return sentence.length;
        }).sort(function (a, b) {
            return b - a;
        });
        return sizeArr[0];
    };
    Utils.prototype.generateTrainingObject = function (trainingData) {
        var _this = this;
        var mutableData = trainingData;
        this.fixSentenceLength(mutableData);
        return mutableData.map(function (mutableDataSet) {
            return {
                input: _this.encodeNumber(mutableDataSet.input),
                output: mutableDataSet.output
            };
        });
    };
    Utils.prototype.generateInputArray = function (trainingData) {
        return trainingData.map(function (trainingSet) {
            return trainingSet.input;
        });
    };
    Utils.prototype.serializeInputSentence = function (trainingData, sentence) {
        var inputArr = this.generateInputArray(trainingData);
        var maxLength = this.getLongestSentenceLength(inputArr);
        return this.encodeNumber(this.serializeSentence(sentence, maxLength));
    };
    Utils.prototype.formatOutput = function (chanceOfSQL) {
        chanceOfSQL *= 100;
        return {
            '%_chance_of_injection': chanceOfSQL
        };
    };
    Utils.prototype.stripQuotesFromInput = function (inputString) {
        return inputString.replace(/['"]+/g, '');
    };
    return Utils;
}());
exports.default = Utils;
