const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://ipvigilante.com/8.8.8.8', (error, resp, body) => {
    if (error) {
      return callback(error, null);
    } else if (resp.statusCode !== 200) {
      return callback(Error(`Status Code ${resp.statusCode} when fetching IP: ${body}`), null);
    } else {
      const latitude = JSON.parse(body).data.latitude;
      const longitude = JSON.parse(body).data.longitude;
      return callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, resp, body) => {
    if (error) {
      return callback(error, null);
    } else if (resp.statusCode !== 200) {
      return callback(Error(`Status Code ${resp.statusCode} when fetching IP: ${body}`), null);
    } else {
      return callback(null, JSON.parse(body).response);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return callback(error, null);
    }
    console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log('Error obtaining coords: ', error);
      } else {
        console.log('Data for coords: ', data);
        //myCoord = data;
        fetchISSFlyOverTimes(data, (error, data) => {
          if (error) {
            console.log('Error: ', error);
          } else {
            console.log('Data: ', data);
          }
        });
      }
    });
  });
};


module.exports = { nextISSTimesForMyLocation };