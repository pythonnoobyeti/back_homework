import http from "http";

function doRequest(city, bse_url, access_key) {
  return new Promise((resolve, rejects) => {
    let data = "";
    let uri = `${bse_url}/current?access_key=${access_key}&query=${city}`;

    const httpConnect = http.get(uri, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        data = JSON.parse(data).current;
        delete data.weather_icons;
        resolve(data);
      });

      res.on("error", (err) => {
        rejects(`Что-то пошло не так!\n${err}`);
      });
    });

    httpConnect.on("error", (err) => {
      rejects(`Что-то пошло не так!\n${err}`);
    });
  });
}

async function getCurrentWeather(city, bse_url, access_key) {
  let result = await doRequest(city, bse_url, access_key);
  return result;
}

export { getCurrentWeather };
