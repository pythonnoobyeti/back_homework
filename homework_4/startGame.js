#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import {
  getRandomNumber,
  changeNameIfDouble,
  createJSON,
} from "./additionalFunc.js";

const __dirname = path.resolve();
const pathToSatats = path.join(__dirname, "homework_4", "stats");

let logFileName = changeNameIfDouble(process.argv[2], pathToSatats);

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Let's game!\nI'am guessing a number (1 or 2), and you're trying to guess it.\nIf it gets boring enter exit."
);

let gameTryWins = 0;
let gameTryLose = 0;

input.on("line", (inData) => {
  if (inData === "exit") input.close();

  const currentGuesInt = getRandomNumber(1, 2);
  const inputNumber = Number(inData);

  if (!isNaN(inputNumber)) {
    if (inputNumber === currentGuesInt) {
      console.log("You win! Enter exit to stop.");
      gameTryWins += 1;
    } else {
      console.log('Try again or enter "exit".');
      gameTryLose += 1;
    }
  }
});

input.on("close", () => {
  const writer = fs.createWriteStream(
    path.join(pathToSatats, `${logFileName}.json`)
  );
  const statistic = createJSON(gameTryWins, gameTryLose);
  writer.write(statistic);
  console.log("Bye! Have a nice day!");
});
