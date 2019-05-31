'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __importDefault(require("./Utils"));
var CustomKNN = /** @class */ (function () {
    function CustomKNN() {
        this.utils = new Utils_1.default();
    }
    CustomKNN.prototype.runKNNModel = function (testInput, trainingData) {
        var trainingObject = this.utils.generateTrainingObject(trainingData);
        this.getCompatibilityRatings(testInput, trainingObject);
        this.findMostCompatible(trainingObject);
        return trainingObject[0];
    };
    CustomKNN.prototype.getCompatibilityRatings = function (testInput, trainingObject) {
        var size = trainingObject.length;
        for (var i = 0; i < size; i++) {
            trainingObject[i]["compatibilityScore"] = this.determinecompatibilityScore(testInput, trainingObject[i].input);
        }
    };
    // Applies Euclidean distance to determine compatibility score
    CustomKNN.prototype.determinecompatibilityScore = function (a, b) {
        var compatibilityScore = 0;
        for (var i = 0; i < a.length; i++) {
            var diff = a[i] - b[i];
            var pow = diff * diff;
            compatibilityScore += pow;
        }
        return this.getInverse(Math.sqrt(compatibilityScore));
    };
    CustomKNN.prototype.findMostCompatible = function (trainingObject) {
        return trainingObject.sort(function (a, b) {
            return b.compatibilityScore - a.compatibilityScore;
        })[0];
    };
    CustomKNN.prototype.getInverse = function (x) {
        return 1 / (1 + x);
    };
    CustomKNN.prototype.revertArrayToString = function (numArray) {
        var charArr = numArray.map(function (num) {
            if (num === 0)
                return '';
            return String.fromCharCode(num * 255);
        });
        return charArr.join('').trim('');
    };
    CustomKNN.prototype.formatOutput = function (outputObject) {
        var output = outputObject.output[0];
        return {
            "output": output === 1 ? "Likely a SQLInjection" : "Likely a valid input",
            "mostSimilarlyResembles": this.revertArrayToString(outputObject.input),
            "compatibilityScore": outputObject.compatibilityScore
        };
    };
    return CustomKNN;
}());
exports.default = CustomKNN;
