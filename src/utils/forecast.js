const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1a518c27c5092e4d919327257f1b214e&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        " The weather currently is " +
          body.current.weather_descriptions[0] +
          " and it is " +
          body.current.temperature +
          " degrees outside, while the humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = forecast;
