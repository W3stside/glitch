"use strict";

const request = require('request');

var getUserDetails = {
  
  getUserDetails: function getUserDetails (senderID) {
    const baseUrl = ' https://graph.facebook.com/v2.6/';
    var qs = senderID + '?access_token=' + process.env.PAGE_ACCESS_TOKEN
    
    return new Promise ( (resolve, reject) => {
      request(baseUrl + qs, function (err, response, body) {
        if (err) {
          reject(err)
        }
        else if (!err && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } 
      });
    })
  }  
}

module.exports = getUserDetails;