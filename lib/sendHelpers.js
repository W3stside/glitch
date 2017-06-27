"use strict";

const request = require('request');
const cities = require('../data/cities.js');

var sendHelpers = {
  
  ////////////////////////////////////////
  // Google maps Nearby Stops
  ////////////////////////////////////////

  nearbyStops (senderID, messageText) {
    var messageData = {
      recipient: {
        id: senderID
      },
      message: {
        text: "Accepter le partage de position:",
        quick_replies:[
          {
            content_type: "location"
          }
        ]  
      }
    }

    this.callSendAPI(messageData);
  },
  ///////////////////////////////////////////////////////////////////////////////////////
  //sendResponse = formatting jsonData and sender info before giving info to callSendAPI
  ///////////////////////////////////////////////////////////////////////////////////////

  sendResponse (senderID , jsonData, lastStopRequested) {
    var messageData = {
      recipient: {
        id: senderID
      },
      message: {
        text: jsonData
      }
    }
    this.callSendAPI(messageData, lastStopRequested);
  },

  //////////////////////////
  // Sending message
  //////////////////////////

  sendTextMessage (recipientID, messageText) {

    var messageData = {
      recipient: {
        id: recipientID
      },
      message: {
        text: messageText
      }
    };
    //return messageData;
    this.callSendAPI(messageData);

  },
  shortcutButtonsPB (
    senderID, 
    text = 'Bonjour c\'est ' + 'Metrobot' + '! 😄' 
           + '\n' +
          'Écrivez simplement votre arrêt et je vous dirai les prochains horaires! 🚋'
    ) {
    var messageData = {
      recipient:{
        id: senderID
      }, 
      message: {
        text: text,
        quick_replies: [
          {
            content_type: "text",
            title: "Etat du Réseau ⚡️",
            payload: "etat du reseau"
          },
          {
            content_type: "text",
            title: "Arrêt proche 📍",
            payload: 'arret proche'
          },
          {
            content_type: "text",
            title: "Plan 🗺",
            payload: "plan"
          }
          /*,
          {
            content_type: "text",
            title: "Partager 🗞",
            payload: "partager"
          }*/
        ]
      }
    }
    this.callSendAPI(messageData);
    //return messageData;
  },

  sendGif (recipientID,url) {
    var messageData = {
      recipient: {
        id: recipientID
      },
      message: {
        attachment: {
          type: "image",
          payload: {
            url: url
          }
        }
      }
    }; 
    this.callSendAPI(messageData);
  },
  
  //////////////////////////////////
  // Card Set
  /////////////////////////////////
  
  sendCityCardSet (senderID) {
    var dynamicArr = [];
       
    (function cityForEach () {
      for (var city in cities) {
        console.log(cities[city].text)
        dynamicArr.push(
          {
            title: cities[city].city,
            subtitle: cities[city].text,
            image_url: cities[city].img_url,
            
            buttons: [
              {
                type: "web_url",
                title: cities[city].link_text,
                url: cities[city].link_url
              }
            ]
          }
        ); //end dynamicArr push
      }; //end for ... in
    })();                 
    console.log(dynamicArr);
    var messageData = {
      recipient: {
        id: senderID
      },
      message: {
      attachment: {
        type:"template",
        payload: {
          template_type:"generic",
          elements: dynamicArr
          }
        }
      }
    }
    this.callSendAPI(messageData);
  },
  
  ////////////////////////////////
  //Call Send API - last step before FB POSTS message to sender
  ///////////////////////////////

  callSendAPI (messageData, lastStopRequested) {

      request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { //query-string 
          access_token: process.env.PAGE_ACCESS_TOKEN 
        },
        method: 'POST',
        json: messageData

      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var recipientId = body.recipient_id;
          var messageId = body.message_id;

          console.log("Successfully sent generic message with id %s to recipient %s", 
            messageId, recipientId);
        } else {
          console.error("Unable to send message.");
          console.log(messageData)
          //console.error(response);
          console.error(error);
        }
      });

  },
  callSendPromise (messageData, lastStopRequested) {
    return new Promise ( (resolve, reject) => {
      request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { //query-string 
          access_token: process.env.PAGE_ACCESS_TOKEN 
        },
        method: 'POST',
        json: messageData

      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var recipientId = body.recipient_id;
          var messageId = body.message_id;
          resolve(
            console.log(body)
          );
          
        } else {
          reject( console.error("Unable to send message.") );
          //console.error(response);
          //console.error(error);
        }
      }); //end req
    }); //end promise
  },
  
  //////////////////////////
  // Sending message
  //////////////////////////

  sendTextMessagePromise (recipientID, messageText) {
    return new Promise ( (resolve, reject) => {
      var messageData = {
        recipient: {
          id: recipientID
        },
        message: {
          text: messageText
        }
      };
      resolve(messageData);
      //reject(console.log('error occurred in sendTextMessagePromise resolving'));
    });
  }
}

module.exports = sendHelpers;