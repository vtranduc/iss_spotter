const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  //console.log(455555555555555555555555555555555555)
  return request(`https://ipvigilante.com/json/${JSON.parse(ip).ip}`);
};

const fetchISSFlyOverTimes = function(coord) {
  
  const coords = JSON.parse(coord).data;
  // console.log('0000000000000000000000000')
  // console.log(coords)
  // console.log('0000000000000000000000000')
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      console.log(JSON.parse(data).response);
    })
    .catch(error => {
      console.log("It didn't work: ", error.message);
    });
};


module.exports = {nextISSTimesForMyLocation};