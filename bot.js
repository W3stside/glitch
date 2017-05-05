// This is main file containing code implementing the Express server and functionality for the Express echo bot.
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
//const removeDiacritics = require('diacritics').remove;
const utils = require('./lib/utils.js');
const gAPI = require('./lib/googleAPI.js');
const stopQ = require('./lib/searchStop.js');
const sendH = require('./lib/sendHelpers.js');
const lignesAll = require('./lignes/allStops.js');
const userDeets = require('./lib/getUserDetails.js');
const cta = require('./lib/getStarted.js');
//const hash = require('./lignes/allStops-HashTable.js');
//const tool = require ('./test/tools.js');
const pSegCases = require('./test/promiseSwitchCase.js');

var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script></body></html>";

//Whitelist them domains bruh
function setWhiteList () {
  request(
    {
      method: 'POST',
      uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=' + process.env.PAGE_ACCESS_TOKEN,
      headers: { 
        'content-type': 'application/json' 
      },
      body: {
        whitelisted_domains: ["http://google.com","https://imgur.com","https://giphy.com, http://i.giphy.com", "https://facebots.fr"]
      },
      json: true
    }, function (error, response, body) {
      if (!error) {
        request(
          {
            method: 'GET',
            uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?fields=whitelisted_domains&access_token=' + process.env.PAGE_ACCESS_TOKEN
          }, function (error, response, body) {
            if (!error) {
              console.log('Displaying whitelisted sites:');
              console.log(body);
            } else if (error) {
              console.error (error);
            }
        })
      } else if (error) {
        console.error(error);
      }
    }
  );
}
//setWhiteList();

// The rest of the code implements the routes for our Express server.
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Webhook validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

// Display the web page
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(messengerButton);
  res.end();
});

//sets get started button
//cta.setOrDeleteGreet('DELETE'); 

// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

// Incoming events handling
function receivedMessage(event) {
  
  var eData = {
    senderID: event.sender.id,
    recipientID: event.recipient.id,
    messageText: event.message.text,
    cleanText: utils.cleanseText(event.message.text),
    timeOfMessage: event.timestamp,
    messageId: event.message.mid
  }
  
  console.log("Received message for user %d and page %d at %d with message:", eData.senderID, eData.recipientID, eData.timeOfMessage);
  console.log(JSON.stringify(eData.messageText));
    
  //Simply loops through Obj with Switch-Cases as Properties and Resolves each one by one 
  //Returns to Var as Array
  //var promiseResolveArr = utils.switchCasePromiseResolver(pSegCases.switchCaseLignes, event);
  
  //Take all Resolved Promises from above
  /*
  Promise.all(promiseResolveArr)
     //Check values of promiseResolverArr and: IF there are NO values as a result of _isNull
     // return default. ELSE send stop info
    .then(pArrValues => {
      //create null checker if needed, else do nothing
      !Array.prototype._isNull ? Array.prototype._isNull = function () { return this.join().replace(/[false,]/g,'')} : null;
    
      return pArrValues._isNull().length === 0 ? [{senderID: eData.senderID, text: 'No stop found'}] : pArrValues.filter(function (value) {return value !== false;})
    })
    .then(values => {
      sendH.sendTextMessage(values[0].senderID, values[0].text);
    })
   */
  
  //Original, full Switch Statement
  lignesAll.switchAllStops(event);        
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  //Fire switch case with Postback
  lignesAll.switchAllStops(event);
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});