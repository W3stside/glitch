const request = require('request');
const sendH = require('./sendHelpers.js');

var getStarted = {
  
  baseURL: "https://graph.facebook.com/v2.6/me",
  
  getStartedBtn: function getStartedBtn () {
    return new Promise ( (resolve, reject) => {
      var baseURL = this.baseURL;
      request ({
        "uri": baseURL + '/messenger_profile?',
        "qs": {
          "access_token": process.env.PAGE_ACCESS_TOKEN
        },
        "method": 'POST',
        "headers": {
          "Content-Type": 'application/json'
        },
        "json": { 
          "get_started": {
            "payload": "get started"
          }
        }
      }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          resolve('Success!');
        }
        else if (err) {
          reject(err);
        }
      })
    });
  }, 
  displayGetStarted: function () {
    //"https://graph.facebook.com/v2.6/me/messenger_profile?fields=get_started&"    
    var baseURL = this.baseURL;
    return new Promise ( (resolve, reject) => {
      request ({
        "uri": baseURL + '/messenger_profile?fields=get_started&',
        "qs": {
          "access_token": process.env.PAGE_ACCESS_TOKEN
        },
        "method": 'GET'
      }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            //console.log(response,body)
            resolve (body);
          }
          else if (err) {
            reject(err);
          }
        });
    });
  },
  setAndGet: function () {
    var p1 = this.getStartedBtn();
    p1
      .then( (resp) => {
        //console.log(resp);
        return this.displayGetStarted();
      })
      .catch( (err) => {
        console.log(err);
      })
  }
}

/*function setIntroText () {
  request({
    "url": "https://graph.facebook.com/v2.6/me/thread_settings?access_token=" + process.env.PAGE_ACCESS_TOKEN,
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "json": {
      "setting_type": "greeting",
      "greeting": {
          "text": "Testing this text!"
      }
    }
  }, function(error, response, body) {
    if (!error) {
      console.log("Success", body);
    } else if (error) {
      console.log(error);
    }
  });
};*/
  
module.exports = getStarted;