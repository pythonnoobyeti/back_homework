const fs = require("fs");
const path = require("path");

function getRandomNumber(minimum, maximum) {
  const min = minimum;
  const max = maximum;
  let randInt = Math.floor(min + Math.random() * (max + 1 - min));
  return randInt;
}

function changeNameIfDouble(fileName, path) {
  createDirIfNotExist(path);
  const files = fs.readdirSync(path);
  while (true) {
    if (files.includes(`${fileName}.json`)) {
      fileName = `${fileName}${getRandomNumber(1, 1000)}`;
    } else break;
  }
  return fileName;
}

function createDirIfNotExist(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function createJSON(gameTryWins, gameTryLose) {
  return JSON.stringify({
    totalTry: gameTryWins + gameTryLose,
    gameTryWins: gameTryWins,
    gameTryLose: gameTryLose,
    procentage: (gameTryWins * 100) / (gameTryWins + gameTryLose),
  });
}

function getStats(pathToSatats) {
  let stats = { 
    totalGame: 0, 
    totalGameTry: 0, 
    totalGameTryWins: 0, 
    totalGameTryLose: 0, 
    totalProcentage: 0,
  }
  
  if (!fs.existsSync(pathToSatats)) {
    console.log("Пака не обнаружена")
    return {};
  }
  const files = fs.readdirSync(pathToSatats);
  files.forEach((file) => {
    const currentPath = path.join(pathToSatats, file);
    const rowData = fs.readFileSync(currentPath, "utf-8")
      const parsedData = JSON.parse(rowData);
      stats.totalGame += 1;
      stats.totalGameTry += parsedData["totalTry"];
      stats.totalGameTryWins += parsedData["gameTryWins"];
      stats.totalGameTryLose += parsedData["gameTryLose"];
    });
    stats.totalProcentage = parseFloat(
      ((stats.totalGameTryWins * 100) / (stats.totalGameTryWins + stats.totalGameTryLose))
      .toFixed(2));
  return stats;
}

module.exports = {
  getRandomNumber,
  changeNameIfDouble,
  createJSON,
  getStats,
};
