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
console.log(CustomKnn.determineCompatabilityScore(2,3));

app.post('/ValidateInput', (req,res) => {
    const data = JSON.stringify(req.body.input);
    const testData = utilClass.serializeInputSentence(trainingData, data);
    const result = trainedNet(testData);
    const output = utilClass.formatOutput(result);
    res.json(output);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
