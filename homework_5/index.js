require("dotenv").config({ path: "../.env" });
const readline = require("readline");
const { getCurrentWeather } = require("./functions");

const ACCESS_KEY = process.env.ACCESS_KEY;
const BASE_URL = "http://api.weatherstack.com";

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
});

const mesage =
    "Могу узнать для вас погоду!\n1 - узнать погоду в Москве;\n2 - ввести другой город;\n";

rl.question(mesage, (answer) => {
    if (answer === "1") {
        getCurrentWeather("Moscow", BASE_URL, ACCESS_KEY)
            .then((weaher) => console.log(weaher))
            .catch((err) => console.log(err));
        rl.close();
    }
    if (answer === "2") {
        rl.question("Enter city in ENG be a good boy:\n", (answer) => {
            getCurrentWeather(answer, BASE_URL, ACCESS_KEY)
                .then((weaher) => console.log(weaher))
                .catch((err) => console.log(err));
            rl.close();
        });
    } else rl.close();
});