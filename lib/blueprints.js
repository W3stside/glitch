"use strict";

const request = require ('request');

var Requester = {  
  requester (args) {
    request({
      //request params here
      
    }, (error, response, body) => {
      //if ... ERROR
      if (error) {
        console.log("Error occurred - see below:");
        console.log(error);
      }
      //if ... SUCCESS
      else if (!error && response.statusCode === 200) {
        console.log(body);
      }
    });
  }
}

var PromiseRequester = {
  promiseRequester (args) {
    return new Promise ( (resolve,reject) => {
      request({
        //request args here
      }, (error, response, body) => {
        //if ... ERROR
        if (error) {
          reject(error);
        }
        //if ... SUCCESS
        else if (!error && response.statusCode === 200) {
          resolve(body);
        }
      });
    })
  }
}