// index.js
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const IP = '66.207.199.230';
// //let myCoord = {};

// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log('Error obtaining coords: ', error);
//   } else {
//     console.log('Data for coords: ', data);
//     //myCoord = data;
//   }
// });

// //console.log('dafa', myCoord, '55555555')

// const testCoord = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(testCoord, (error, data) => {
//   if (error) {
//     console.log('Error: ', error);
//   } else {
//     console.log('Data: ', data);
//   }
// });

nextISSTimesForMyLocation((error, description) => {
  if (error) {

  } else {
    console.log(description);
  }
});