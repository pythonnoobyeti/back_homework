#!/usr/bin/env node

import path from "path";
import { getStats } from "./additionalFunc.js";

const __dirname = path.resolve();
const pathToSatats = path.join(__dirname, "homework_4", "stats");
const stats = getStats(pathToSatats);
console.log(stats);
