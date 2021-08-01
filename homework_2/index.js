#!/usr/bin/env node
const readline = require("readline");

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let breakCounter = 0;
const [min, max, number] = getRandomNumber();
console.log(
  `I'm thinking of a number from ${min} to ${max}. Try to guess!\nIf you gave up, enter exit.`
);

input.on("line", (data) => {
  if (data === "exit") {
    console.log("Congratulations you are a looser!");
    process.exit(0);
  } else if (Number(data) === number) {
    console.log("Congratulations you are winner!");
    process.exit(0);
  } else if (Number(data) > number) {
    console.log("Number is smaller!");
  } else if (Number(data) < number) {
    console.log("Number is bigger!");
  } else {
    if (breakCounter > 0) {
      console.log("It Was At This Moment He Knew... He Fucked Up.");
      process.exit(0);
    }
    console.log("Since this is your first time I'll give you a break!");
    breakCounter = breakCounter + 1;
  }
});

input.on("close", () => console.log("Congratulations you are a looser!"));

function getRandomNumber() {
  const min = Math.floor(Math.random() * 10000);
  const max = min + Math.floor(Math.random() * 10000);
  let randInt = Math.floor(min + Math.random() * (max + 1 - min));
  return [min, max, randInt];
}
