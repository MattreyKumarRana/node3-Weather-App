// Creating a weather forecast.js
const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5576ce388bc5af0f00b4bc493e30c72e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    const { body } = response;
    const { current } = body;
    if (error) {
      callback("Unable to connect to the forecast services!", undefined);
    } else if (body.error) {
      callback("Unable to find the location. Try another search", undefined);
    } else {
      callback(undefined, {
        temperature: current.temperature,
        feelsLike: current.feelslike,
        message: `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity}`,
      });
    }
  });
};

module.exports = forecast;
