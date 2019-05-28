'use strict';

import sqlData from '../trainingData/sql';
import validData from '../trainingData/valid';
import model from 'brain.js'
import Utils from '../src/utils/Utils';
import fs from 'fs';

const net = new model.NeuralNetwork();
const trainingData = [
    ...sqlData,
    ...validData
];
const utilClass = new Utils();
let serializedData = utilClass.generateTrainingObject(trainingData);
net.train(serializedData, {log: true});
fs.writeFileSync('model/trainedNet.js', `export default ${ net.toFunction().toString() };`);
