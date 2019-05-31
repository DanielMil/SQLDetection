import { TrainingObject } from "../src/utils/interfaces";

const sqlData: Array<TrainingObject> = [
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
export default sqlData; 