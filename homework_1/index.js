#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const allowParams = {
  date: ["date", "d"],
  month: ["month", "m"],
  year: ["year", "y"],
};

const argv = yargs(hideBin(process.argv)).argv;
const [key, value] = getKeyByValue(argv, allowParams);
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
  if (key == "year") date.setFullYear(date.getFullYear() + value * direction);
  if (key == "month") date.setMonth(date.getMonth() + value * direction);
  if (key == "date") date.setDate(date.getDate() + value * direction);
  return date.toISOString();
}

function doGetDate() {
  const date = new Date();
  if (key == "year") return date.getFullYear();
  if (key == "month") return date.getMonth() + 1;
  if (key == "date") return date.getDate();
  return date.toISOString();
}

function getKeyByValue(argv, obj) {
  const argvKeys = Object.keys(argv).slice(1, -1);
  const objKeys = Object.keys(obj);
  let firstAllowKey;
  let firstAllValue;

  argvKeys.forEach((param) => {
    objKeys.forEach((key) => {
      if (allowParams[key].includes(param)) {
        firstAllowKey = key;
        firstAllValue = argv[param];
        return;
      }
    });
    if (firstAllowKey != undefined) return;
  });
  return [firstAllowKey, firstAllValue];
}
