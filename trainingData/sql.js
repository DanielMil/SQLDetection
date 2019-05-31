"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlData = [
    {
        input: "SELECT * FROM USER WHERE NAME=TOM",
        output: [1]
    },
    {
        input: "DROP TABLE USER",
        output: [1]
    },
    {
        input: "INSERT INTO PROFILES",
        output: [1]
    }
];
exports.default = sqlData;
