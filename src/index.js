'use strict';

import express from 'express';
import trainedNet from '../model/trainedNet';
import Utils from './utils/Utils'
import sqlData from '../trainingData/sql';
import validData from '../trainingData/valid';
import bodyParser from 'body-parser';
import CustomKNN from './utils/customKnn'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const trainingData = [
    ...sqlData,
    ...validData
];

const utilClass = new Utils();
const CustomKnn = new CustomKNN();

// Create different endpoints for the different models
// Maybe also a common endpoint that compares the different models
app.post('/ValidateInput/BrainJs', (req,res) => {
    const data = JSON.stringify(req.body.input);
    const formattedData = utilClass.stripQuotesFromInput(data);
    const testData = utilClass.serializeInputSentence(trainingData, formattedData);
    const result = trainedNet(testData);
    const output = utilClass.formatOutput(result);
    res.json(output);
});

app.post('/ValidateInput/CustomKNN', (req, res) => {
    const data = JSON.stringify(req.body.input);
    const formattedData = utilClass.stripQuotesFromInput(data);
    const result = CustomKnn.runKNNModel(utilClass.serializeInputSentence(trainingData, formattedData), trainingData);
    const output = CustomKnn.formatOutput(result);
    res.json(output);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
