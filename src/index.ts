'use strict';

import express from 'express';
import trainedNet from '../model/trainedNet';
import Utils from './utils/Utils'
import sqlData from '../trainingData/sql';
import validData from '../trainingData/valid';
import bodyParser from 'body-parser';
import CustomKNN from './utils/customKnn'
import { TrainingObject, TrainingSet } from './utils/interfaces';

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

app.get('/TrainingData', (req: express.Request, res: express.Response) => {
    res.json(trainingData);
});

app.post('/ValidateInput/BrainJs', (req: express.Request, res: express.Response) => {
    const data: string = JSON.stringify(req.body.input);
    const formattedData: string = utilClass.stripQuotesFromInput(data);
    const testData: Array<number> = utilClass.serializeInputSentence(trainingData, formattedData);
    const result: number = trainedNet(testData)[0];
    const output: Object = utilClass.formatOutput(result);
    res.json(output);
});

app.post('/ValidateInput/CustomKNN', (req: express.Request, res: express.Response) => {
    const data: string = JSON.stringify(req.body.input);
    const formattedData:string = utilClass.stripQuotesFromInput(data);
    const result: TrainingSet = CustomKnn.runKNNModel(utilClass.serializeInputSentence(trainingData, formattedData), trainingData);
    const output: Object = CustomKnn.formatOutput(result);
    res.json(output);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
