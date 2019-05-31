'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var trainedNet_1 = __importDefault(require("../model/trainedNet"));
var Utils_1 = __importDefault(require("./utils/Utils"));
var sql_1 = __importDefault(require("../trainingData/sql"));
var valid_1 = __importDefault(require("../trainingData/valid"));
var body_parser_1 = __importDefault(require("body-parser"));
var customKnn_1 = __importDefault(require("./utils/customKnn"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
var trainingData = sql_1.default.concat(valid_1.default);
var utilClass = new Utils_1.default();
var CustomKnn = new customKnn_1.default();
// Create different endpoints for the different models
// Maybe also a common endpoint that compares the different models
app.post('/ValidateInput/BrainJs', function (req, res) {
    var data = JSON.stringify(req.body.input);
    var formattedData = utilClass.stripQuotesFromInput(data);
    var testData = utilClass.serializeInputSentence(trainingData, formattedData);
    var result = trainedNet_1.default(testData);
    var output = utilClass.formatOutput(result);
    res.json(output);
});
app.post('/ValidateInput/CustomKNN', function (req, res) {
    var data = JSON.stringify(req.body.input);
    var formattedData = utilClass.stripQuotesFromInput(data);
    var result = CustomKnn.runKNNModel(utilClass.serializeInputSentence(trainingData, formattedData), trainingData);
    var output = CustomKnn.formatOutput(result);
    res.json(output);
});
app.listen(3000, function () { return console.log('Server listening on port 3000!'); });
