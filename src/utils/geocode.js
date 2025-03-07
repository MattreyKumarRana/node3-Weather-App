// Using a geocode.js file for getting the coordinates
const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoibWF0dHJleTE5MjMiLCJhIjoiY203bnczYnA0MDVvejJrb3Bnc3Q2cDZneCJ9.W4Uid2_xonYyLf7mgd1q3Q&limit=1`;

  request(
    {
      url,
      json: true,
    },
    (error, response) => {
      const { features } = response.body;

      if (error) {
        callback("Unable to connect to the Geocoding Service", undefined);
      } else if (features.length === 0) {
        callback("Unable to find the location. Try another search", undefined);
      } else {
        callback(undefined, {
          latitude: features[0].properties.coordinates.latitude,
          longitude: features[0].properties.coordinates.longitude,
          location: features[0].properties.full_address,
        });
      }
    }
  );
};

module.exports = geocode;
