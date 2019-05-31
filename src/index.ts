'use strict';

import express from 'express';
import trainedNet from '../model/trainedNet';
import Utils from './utils/Utils'
import sqlData from '../trainingData/sql';
import validData from '../trainingData/valid';
import bodyParser from 'body-parser';
import CustomKNN from './utils/customKnn'
import { TrainingObject } from './utils/interfaces';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const trainingData: Array<TrainingObject> = [
    ...sqlData,
    ...validData
];

const utilClass = new Utils();
const CustomKnn = new CustomKNN();

// Create different endpoints for the different models
// Maybe also a common endpoint that compares the different models
app.post('/ValidateInput/BrainJs', (req: express.Request, res: express.Response) => {
    const data: String = JSON.stringify(req.body.input);
    const formattedData: String = utilClass.stripQuotesFromInput(data);
    const testData: TrainingObject = utilClass.serializeInputSentence(trainingData, formattedData);
    const result = trainedNet(testData);
    const output: Object = utilClass.formatOutput(result);
    res.json(output);
});

app.post('/ValidateInput/CustomKNN', (req: express.Request, res: express.Response) => {
    const data: String = JSON.stringify(req.body.input);
    const formattedData:String = utilClass.stripQuotesFromInput(data);
    const result: TrainingObject = CustomKnn.runKNNModel(utilClass.serializeInputSentence(trainingData, formattedData), trainingData);
    const output: Object = CustomKnn.formatOutput(result);
    res.json(output);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
