const request = require('request');

var sendHelpers = {
  
  ////////////////////////////////////////
  // Google maps Nearby Stops
  ////////////////////////////////////////

  nearbyStops: function nearbyStops (senderID, messageText) {
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

  sendResponse: function sendResponse (senderID , jsonData, lastStopRequested) {
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

  sendTextMessage: function sendTextMessage (recipientID, messageText) {

    var messageData = {
      recipient: {
        id: recipientID
      },
      message: {
        text: messageText
      }
    };
    return messageData;
    //this.callSendAPI(messageData);

  },
  shortcutButtonsPB: function (senderID) {
    var messageData = {
      recipient:{
        id: senderID
      }, 
      message: {
        text: "Here are some other available options:",
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
          },
          {
            content_type: "text",
            title: "Partager 🗞",
            payload: "partager"
          }
        ]
      }
    }
    return messageData;
  },
  sendGenericMessage: function sendGenericMessage (recipientID) {
    var messageData = {
      recipient: {
        id: recipientID
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "rift",
              subtitle: "Next-generation virtual reality",
              item_url: "https://www.oculus.com/en-us/rift/",               
              image_url: "http://messengerdemo.parseapp.com/img/rift.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/rift/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for first bubble",
              }],
            }, {
              title: "touch",
              subtitle: "Your Hands, Now in VR",
              item_url: "https://www.oculus.com/en-us/touch/",               
              image_url: "http://messengerdemo.parseapp.com/img/touch.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/touch/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for second bubble",
              }]
            }]
          }
        }
      }
    };  

    this.callSendAPI(messageData);
  },

  ////////////////////////////////
  //Call Send API - last step before FB POSTS message to sender
  ///////////////////////////////

  callSendAPI: function callSendAPI(messageData, lastStopRequested) {

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
          //console.error(response);
          //console.error(error);
        }
      });

  }
}

module.exports = sendHelpers;