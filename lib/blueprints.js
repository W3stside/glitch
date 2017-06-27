"use strict";

const request = require ('request');

var Requester = {  
  requester (args) {
    request(args, (error, response, body) => {
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

exports.PromiseRequester = {
  promiseRequester (args) {
    return new Promise ( (resolve,reject) => {
      
      request(
        args, 
        function (error, response, body) {
          //if ... SUCCESS
          if (!error && response.statusCode === 200) {
            resolve(JSON.parse(body));
          } 
          else {
            reject(response,error);
          }
      });
    
    })
  }
}
