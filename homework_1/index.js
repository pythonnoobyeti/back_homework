#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const allowParams = {
  date: ["date", "d"],
  month: ["month", "m"],
  year: ["year", "y"],
};

const argv = yargs(hideBin(process.argv)).argv;
const targetParams = getKeyByValue(argv, allowParams);
const current = argv._.includes("current");
const add = argv._.includes("add");
const sub = argv._.includes("sub");

if (current) {
  let date;
  if (add) date = doAddSub(1);
  else if (sub) date = doAddSub(-1);
  else date = doGetDate();
  console.log(date);
}

function doAddSub(direction) {
  const date = new Date();
  Object.keys(targetParams).forEach((key) => {
    if (key == "year")
      date.setFullYear(date.getFullYear() + targetParams[key] * direction);
    if (key == "month")
      date.setMonth(date.getMonth() + targetParams[key] * direction);
    if (key == "date")
      date.setDate(date.getDate() + targetParams[key] * direction);
  });
  return date.toISOString();
}

function doGetDate() {
  const date = new Date();
  if (isEmpty(targetParams)) return date.toISOString();
  let answer = [];
  Object.keys(targetParams).forEach((key) => {
    if (key == "year") answer.push(date.getFullYear());
    if (key == "month") answer.push(date.getMonth() + 1);
    if (key == "date") answer.push(date.getDate());
  });
  return answer;
}

function getKeyByValue(argv, obj) {
  const argvKeys = Object.keys(argv).slice(1, -1);
  const objKeys = Object.keys(obj);
  let targetParams = {};

  argvKeys.forEach((param) => {
    objKeys.forEach((key) => {
      if (allowParams[key].includes(param)) {
        targetParams[key] = argv[param];
      }
    });
  });
  return targetParams;
}

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
