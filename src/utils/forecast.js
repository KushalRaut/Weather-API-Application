const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e0658fdcbe15227258ccbd41df821eb7&query=" +
    latitude +
    "," +
    longitude;

  request({ url }, (error, { body } = {}) => {
    const fetchedData = JSON.parse(body);
    console.log(fetchedData);
    if (error) {
      callback("The connection could not be established", undefined);
    } else if (fetchedData.request) {
      console.log("123");

      const data = JSON.parse(body);

      callback(
        undefined,
        "The weather currently is " +
          data.current.weather_descriptions[0] +
          " with the temperature currently being " +
          data.current.temperature +
          " degree celsius but it feels like  " +
          data.current.feelslike +
          " degree celsius and the chances of precipitation is " +
          data.current.precip +
          "%"
      );
    } else {
      console.log("Last condition of forecast called");
      callback("Error condition", undefined);
    }
  });
};

module.exports = forecast;
