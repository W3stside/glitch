"use strict";
const blueprints = require('./blueprints.js');
const request = require('request');
const GetUserDet = Object.create(blueprints.PromiseRequester);

exports.buildUserDetObj = function (senderID) {
   GetUserDet.queryInfo = {
      fullUrl:'https://graph.facebook.com/v2.6/' + senderID + '?fields=first_name&access_token=' + process.env.PAGE_ACCESS_TOKEN, 
      uri: 'https://graph.facebook.com/v2.6/',
      qs: {
        USER_ID: senderID,
        fields: 'first_name',
        access_token: process.env.PAGE_ACCESS_TOKEN
      }
   }
  return GetUserDet.promiseRequester(GetUserDet.queryInfo.fullUrl)
}

var getUserDetails = {
  
  getUserDetails: function getUserDetails (senderID) {
    const baseUrl = 'https://graph.facebook.com/v2.6/';
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
//module.exports = getUserDetails;