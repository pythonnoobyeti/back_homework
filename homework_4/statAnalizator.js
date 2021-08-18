#!/usr/bin/env node

const path = require("path");
const { getStats } = require("./additionalFunc");

const pathToSatats = path.join(__dirname, "stats");
const stats = getStats(pathToSatats);
console.log(stats)