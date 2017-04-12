//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const removeDiacritics = require('diacritics').remove;

var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script></body></html>";

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

//storing last Stop requested

var lastStop = [];
var lastStopRequested = null; 
// Incoming events handling
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;
  //Incoming message here - de-diacritic...ing? and removing "." + "-"
  var messageText = removeDiacritics(message.text.toLowerCase().replace(/[-.]/g,function(match) {return (match==="-" ? " " : "")}));
  var messageAttachments = message.attachments;
  var multiStop = {};  
  ///////////////////////////////
  //Message Switch Cases
  //////////////////////////////  
  
  //switch statement full
  if (messageText) {
      // If we receive a text message, check to see if it matches a keyword
      // and send back the template example. Otherwise, just echo the text we received.
      switch (messageText) {
      /////////////////////////////////////////////////////////
      // User requests more times
      ////////////////////////////////////////////////////////    
        case 'plus':
        case 'more times':
        case 'more':  
        case 'plus d\'horaires':  
          moreTimes(senderID, messageText/*, addVariableToIdentifyForMultipleStopsHere*/);
          break;    
      
      ///////////////////////////////////////////////////////
      // All Lignes - MultiStop Areas
      ///////////////////////////////////////////////////////    
    
        case 'charles de gaulle etoile': //Charles de Gaulle-Etoile [%3AOIF%3ASA%3A8775800]
        case 'etoile':  
        case 'charles de gaulle':
          multiStop = {    
            stopInfo: [{
              lineStr: 'M1',
              senderID: senderID,
              region: 'fr-idf',
              line: '%3AOIF%3A100110001%3A1OIF439',
              stop: '%3AOIF%3ASA%3A8775800',
              startIterator: 0,
              loopLimit: 4,
              key: 0
            },
            {
              lineStr: 'M2',
              senderID: senderID,
              region: 'fr-idf',
              line: '%3AOIF%3A100110002%3A2OIF439',
              stop: '%3AOIF%3ASA%3A8775800',
              startIterator: 0,
              loopLimit: 4,
              key: 1
            },
            {
              lineStr: 'M6',
              senderID: senderID,
              region: 'fr-idf',
              line: '%3AOIF%3A100110006%3A6OIF439',
              stop: '%3AOIF%3ASA%3A8775800',
              startIterator: 0,
              loopLimit: 4,
              key: 2
            }           
          ]};
          //multiSearchStop(multiStop);
          multiStop.stopInfo.forEach(multiSearchStop);
          /*//M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775800', 0, 4, 0);
          //M2
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775800', 0, 4, 1);
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439' , '%3AOIF%3ASA%3A8775800', 0, 4, 2);*/
          break;
          
        case 'reuilly diderot':
        case 'diderot':
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
          break;  
          
        case 'franklin roosevelt':
        //case 'diderot':
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A8OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
          break;
          
        case 'palais royal musee du louvre':
        case 'musee du louvre':
        case 'palais royal':  
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
          break;  
        
        case 'chatelet':
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
          //M11
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
          //M14
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
          break;
        
        case 'champs elysees clemenceau':
        case 'champs elysees':
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59592', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439' , '%3AOIF%3ASA%3a59592', 0, 4);
          break;   
         
        case 'barbes rochechouart':
        case 'rochechouart':
        case 'barbes':
          //M2
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59632', 0, 4);
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3A59632', 0, 4);
          break;  
          
        case 'pigalle':
          //M2
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59420', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59420', 0, 4);
          break;
          
        case 'pere lachaise':
        case 'lachaise':
          //M2
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59584', 0, 4);
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59584', 0, 4);
          break;  
        
        case 'opera':
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59209', 0, 4);
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59209', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59209', 0, 4);
          break;
            
        case 'saint lazare':
        case 'st lazare':
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
          //M14
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
          break;  
          
        case 'havre caumartin':
        case 'caumartin':  
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59442', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59442', 0, 4);
          break;
            
        case 'reaumur sebastopol':
        case 'sebastopol': 
        case 'reaumur':
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59586', 0, 4);
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59586', 0, 4);
          break;
         
        case 'arts et metiers':
        case 'arts metiers':
        case 'temple':  
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59588', 0, 4);
          //M11
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59588', 0, 4);
          break;  
            
        case 'republique':
        case 'repu':  
          //M3
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59557', 0, 4);
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59557', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59557', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59557', 0, 4);
          //M11
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59557', 0, 4);
          break;
        
        case 'raspail':
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59251', 0, 4);
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59251', 0, 4);
          break;
          
        case 'marcadet poissonniers':
        case 'marcadet':  
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59252', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59252', 0, 4);
          break;
          
        case 'gare du nord':
        case 'gare nord':  
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
          break;
          
        case 'gare de l\'est':
        case 'gare est':
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
          break;  
          
        case 'strasbourg saint denis':
        case 'strasbourg st denis':
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59253', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59253', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59253', 0, 4);
          break;
          
        case 'montparnasse bienvenue':
        case 'montparnasse':
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
          break;    
          
        case 'odeon':
        //case '':  
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59263', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59263', 0, 4);
          break;  
          
        case 'denfert rochereau':
        //case '':  
          //M4
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
          break;
             
        case 'gare d\'austerlitz':
        case 'austerlitz':  
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
          break;
          
        case 'stalingrad':
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59279', 0, 4);
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59279', 0, 4);
          break;
          
        case 'place d\'italie':
        //case '':
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59275', 0, 4);
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59275', 0, 4);
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59275', 0, 4);
          break;  
          
        case 'oberkampf':
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59338', 0, 4);
          //M11
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59338', 0, 4);
          break;
         
        case 'bastille':
          //M5
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59238', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59238', 0, 4);
          break;
            
        case 'motte picquet grenelle':
        case 'la motte picquet':
        case 'grenelle picquet':  
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3A59346', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59346', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59346', 0, 4);
          break;  
           
        case 'trocadero':
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59617', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59617', 0, 4);
          break;
           
        case 'bercy':
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
          //M14
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
          break;
          
        case 'daumesnil':
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59561', 0, 4);
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59561', 0, 4);
          break;
          
        case 'chaussee d\'antin la fayette':
        case 'chaussee d\'antin':
        case 'la fayette':  
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59568', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59568', 0, 4);
          break;  
          
        case 'pyramides':
        //case '':
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
          //M14
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59290', 0, 4);
          break;
          
        case 'jussieu':
        //case '':  
          //M7
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59300', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59300', 0, 4);
          break;
          
        case 'invalides':
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
          break;    
          
        case 'richelieu drouot':
        case 'drouot':  
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59463', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59463', 0, 4);
          break; 
          
        case 'concorde':
        //case '': 
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59235', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59235', 0, 4);
          break;    
          
        case 'madeleine':
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59412', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59412', 0, 4);
          //M14
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59412', 0, 4);
          break;    
        
        case 'grands boulevards':
        case 'grands boulevard':
        case 'grand boulevard':
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59464', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59464', 0, 4);
          
        case 'bonne nouvelle':
          //M8
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59475', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59475', 0, 4);  
          
        case 'michel ange molitor':
        case 'molitor':  
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59371', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59371', 0, 4);
          break; 
          
        case 'sevres babylone':
        case 'babylone':  
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59362', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59362', 0, 4);
          break;   
           
        case 'michel ange auteuil':
        //case '':  
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59360', 0, 4);
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59360', 0, 4);
          break;              
           
        case 'miromesnil':
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59494', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59494', 0, 4);
          break;    
           
        case 'duroc':
          //M10
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59349', 0, 4);
          //M13
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59349', 0, 4);
          break;    
                                 
      ///////////////////////////////////////////////////////
      // Ligne M1
      ///////////////////////////////////////////////////////    

        case 'la defense':
        case 'defense':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4);
          break;

        case 'esplanade de la defense':
        case 'esplanade':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4);
          break;

        case 'pont de neuilly':
        case 'neuilly':    
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4);
          break;

        case 'les sablons':
        //case 'defense':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4);
          break;

        case 'porte maillot':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4);
          break;

        case 'argentine':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4);
          break;

        case 'georges v':
        case 'georges 5':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4);
          break;

        case 'concorde':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4);
          break; 

        case 'tuileries':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4);
          break; 

        case 'louvre rivoli':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4);
          break; 

        case 'hotel de ville':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4);
          break; 

        case 'saint paul':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4);
          break; 

        case 'bastille':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4);
          break; 

        case 'gare de lyon':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4);
          break;

        case 'nation':
          //M1
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
          //M2
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
          //M9
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
          break;

        case 'porte de vincennes':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4);
          break;

        case 'saint mande':
        case 'st mande':
        case 'stmande':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4);
          break;

        case 'berault':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4);
          break;

        case 'chateau de vincennes':
        case 'chateau de vincene':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4);
          break;  

      //////////////////////////////////////////////////
      // Ligne M2
      ///////////////////////////////////////////////////
        
        case 'porte dauphine':
        case 'dauphine':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59213', 0, 4);
          break;

        case 'victor hugo':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439', '%3AOIF%3ASA%3A59417', 0, 4);
          break;

        case 'ternes':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59416', 0, 4);
          break;          
          
        case 'courcelles':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59424', 0, 4);
          break;
          
        case 'monceau':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59422', 0, 4);
          break;
          
        case 'villiers':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59415', 0, 4);
          break;
          
        case 'rome':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59418', 0, 4);
          break;
          
        case 'place de clichy':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59421', 0, 4);
          break;
          
        case 'blanche':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59428', 0, 4);
          break;
          
        case 'anvers':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59426', 0, 4);
          break;
                  
        case 'la chapelle':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59218', 0, 4);
          break;
          
        case 'stalingrad':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59279', 0, 4);
          break;
          
        case 'jaures':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59635', 0, 4);
          break;
          
        case 'colonel fabien':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59423', 0, 4);
          break;
          
        case 'belleville':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59406', 0, 4);
          break;
          
        case 'couronnes':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59429', 0, 4);
          break;
          
        case 'menilmontant':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59655', 0, 4);
          break;
                    
        case 'phillipe auguste':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59419', 0, 4);
          break;
          
        case 'alexandre dumas':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59425', 0, 4);
          break;
          
        case 'avron':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59427', 0, 4);
          break;
        
      /////////////////////////////////////////////////////////////
      // Ligne M3
      ////////////////////////////////////////////////////////////
        case 'pont de levallois becon':
        case 'pont de levallois': 
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59589', 0, 4);
          break;
          
        case 'anatole france':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59447', 0, 4);
          break;
          
        case 'louise michel':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59446', 0, 4);
          break;
          
        case 'porte de champerret':
        //case :  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59436', 0, 4);
          break;
          
        case 'pereire':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59219', 0, 4);
          break;
          
        case 'wagram':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59439', 0, 4);
          break;
          
        case 'malesherbes':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59441', 0, 4);
          break;
          
        case 'villiers':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59415', 0, 4);
          break;
          
        case 'europe':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59443', 0, 4);
          break;
        
        case 'quatre septembre':
        case '4 septembre':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59437', 0, 4);
          break;
          
        case 'bourse':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59444', 0, 4);
          break;
          
        case 'sentier':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59440', 0, 4);
          break;
                
        case 'parmentier':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59434', 0, 4);
          break;  
          
        case 'rue saint maur':
        case 'rue st maur':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59670', 0, 4);
          break;  
          
        case 'gambetta':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59325', 0, 4);
          break;  
          
        case 'porte de bagnolet':
        case 'bagnolet':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59435', 0, 4);
          break;  
          
        case 'gallieni':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59448', 0, 4);
          break;  
          
      /////////////////////////////////////////////////////////////
      // Ligne M4
      ////////////////////////////////////////////////////////////
        
        case 'porte de clignancourt':
        case 'clignancourt':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59258', 0, 4);
          break;
          
        case 'simplon':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59622', 0, 4);
          break;
         
        case 'chateau rouge':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59629', 0, 4);
          break;
          
        case 'chateau d\'eau':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59630', 0, 4);
          break;
        
        case 'etienne marcel':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59261', 0, 4);
          break;
          
        case 'les halles':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59208', 0, 4);
          break;
          
        case 'chatelet':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59566', 0, 4);
          break;  
          
        case 'saint michel':
        case 'st michel':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8754731', 0, 4);
          break;  
        
        case 'saint germain des pres':
        case 'st germain des pres':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59623', 0, 4);
          break;  
          
        case 'saint sulpice':
        case 'st sulpice':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59257', 0, 4);
          break;  
          
        case 'saint placide':
        case 'st placide':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59256', 0, 4);
          break;  
       
        case 'vavin':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59254', 0, 4);
          break;
        
        case 'mouton duvernet':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59260', 0, 4);
          break;
          
        case 'alesia':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59631', 0, 4);
          break;
          
        case 'porte d\'orleans':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59624', 0, 4);
          break;
          
        case 'mairie de montrouge':
        case 'montrouge':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59776', 0, 4);
          break;
          
      /////////////////////////////////////////////////////////////
      // Ligne M5
      ////////////////////////////////////////////////////////////
          
        case 'bobigny pablo picasso':
        case 'bobigny picasso':
        case 'bobigny pablo':
        case 'pablo picasso':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59342', 0, 4);
          break;
          
        case 'bobigny pantin raymon queneau':
        case 'raymon queneau':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59343', 0, 4);
          break;
          
        case 'eglise de pantin':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59344', 0, 4);
          break;
          
        case 'hoche':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59345', 0, 4);
          break;
          
        case 'porte de pantin':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59551', 0, 4);
          break;
          
        case 'ourcq':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59337', 0, 4);
          break;
          
        case 'laumiere':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59636', 0, 4);
          break;
          
        case 'jaures':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59635', 0, 4);
          break;
          
        case 'jacque bonsergent':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59340', 0, 4);
          break;
         
        case 'richard lenoir':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59336', 0, 4);
          break;
          
        case 'breguet sabin':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59637', 0, 4);
          break;
          
        case 'quai de la rapee':
        case 'quai rapee':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59633', 0, 4);
          break;
                    
        case 'gare d\'austerlitz':
        case 'austerlitz':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8754700', 0, 4);
          break;
          
        case 'saint marcel':
        case 'st marcel':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59335', 0, 4);
          break;  
          
        case 'campo formio':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59339', 0, 4);
          break;
                              
      /////////////////////////////////////////////////////////////
      // Ligne M6
      ////////////////////////////////////////////////////////////
        
        case 'kleber':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59650', 0, 4);
          break;
          
        case 'boissiere':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59652', 0, 4);
          break;
       
        case 'passy':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59451', 0, 4);
          break;
          
        case 'bir-hakeim':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59205', 0, 4);
          break;
          
        case 'dupleix':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59455', 0, 4);
          break;
          
        case 'cambronne':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59459', 0, 4);
          break;
          
        case 'sevres lecourbe':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59648', 0, 4);
          break;
          
        case 'pasteur':
        //case '':
          //M6
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59452', 0, 4);
          //M12
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59452', 0, 4);
          break;
          
        case 'edgar quinet':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59456', 0, 4);
          break;
          
        case 'saint jacques':
        case 'st jacques':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59449', 0, 4);
          break;
          
        case 'glaciere':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59651', 0, 4);
          break;
          
        case 'corvisart':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59458', 0, 4);
          break;
          
        case 'nationale':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59454', 0, 4);
          break;
          
        case 'chevaleret':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59457', 0, 4);
          break;
          
        case 'quai de la gare':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59450', 0, 4);
          break;
          
        case 'dugommier':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59461', 0, 4);
          break;
          
      /////////////////////////////////////////////////////////////
      // Ligne M7
      ////////////////////////////////////////////////////////////    
        
        case 'la courneuve 8 mai 1945':
        case 'la courneuve':  
        case '8 mai 1945':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59320', 0, 4);
          break;   
          
        case 'fort d\'aubervilliers':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59316', 0, 4);
          break;
          
        case 'aubervilliers pantin 4 chemins':
        case 'aubervilliers pantin':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59318', 0, 4);
          break;
          
        case 'porte de la villette':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59288', 0, 4);
          break;
          
        case 'corentin cariou':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59302', 0, 4);
          break;
          
        case 'crimee':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59570', 0, 4);
          break;
          
        case 'riquet':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59285', 0, 4);
          break;
          
        case 'louis blanc':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59296', 0, 4);
          break;
          
        case 'chateau landon':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59572', 0, 4);
          break;
          
        case 'poissonniere':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59574', 0, 4);
          break;
          
        case 'cadet':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59304', 0, 4);
          break;
          
        case 'le peletier':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59292', 0, 4);
          break;
          
        case 'palais royal musee du louvre':
        case 'musee du louvre':  
        case 'palais royal':
        case 'louvre':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
          break;
          
        case 'pont neuf':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59664', 0, 4);
          break;
          
        case 'pont marie':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59576', 0, 4);
          break;
          
        case 'sully moriand':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59281', 0, 4);
          break;
          
        case 'place monge':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59277', 0, 4);
          break;
          
        case 'censier daubenton':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59306', 0, 4);
          break;
          
        case 'les gobelins':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59294', 0, 4);
          break;
          
        case 'tolbiac':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59283', 0, 4);
          break;
          
        case 'maison blanche':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59298', 0, 4);
          break; 
          
        case 'porte d\'italie':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59666', 0, 4);
          break; 
          
        case 'porte de choisy':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59663', 0, 4);
          break; 
          
        case 'porte d\'ivry':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59287', 0, 4);
          break; 
          
        case 'pierre et marie curie':
        case 'marie curie':  
        case 'curie':   
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59556', 0, 4);
          break; 
          
        case 'mairie d\'ivry':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59322', 0, 4);
          break;
          
        case 'le kremlin bicetre':
        case 'le kremlin':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59578', 0, 4);
          break;
          
        case 'villejuif leo lagrange':
        case 'leo lagrange':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
          break;
          
        case 'paul vaillant couturier':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59579', 0, 4);
          break;  
          
        case 'villejuif louis aragon':
        case 'louis aragon':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
          break;  
          
      /////////////////////////////////////////////////////////////
      // Ligne M8
      ////////////////////////////////////////////////////////////
          
        case 'balard':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59477', 0, 4);
          break;    
          
        case 'lourmel':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59478', 0, 4);
          break;    
          
        case 'boucicaut':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59476', 0, 4);
          break;    
          
        case 'felix faure':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59560', 0, 4);
          break;    
          
        case 'commerce':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59474', 0, 4);
          break;    
          
        case 'ecoles militaire':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59470', 0, 4);
          break;    
          
        case 'la tour maubourg':
        case 'maubourg':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59658', 0, 4);
          break;    
          
        case 'filles du calvaire':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59472', 0, 4);
          break;    
          
        case 'saint sebastien froissart':
        case 'st sebastien froissart':  
        case 'sebastien froissart':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59558', 0, 4);
          break;    
          
        case 'chemin vert':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59473', 0, 4);
          break;    
          
        case 'ledru rollin':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59468', 0, 4);
          break;    
          
        case 'faidherbe chaligny':
        case 'faidherbe':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59471', 0, 4);
          break;    
          
        case 'montgallet':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59467', 0, 4);
          break;    
          
        case 'michel bizot':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59466', 0, 4);
          break;    
          
        case 'porte doree':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59559', 0, 4);
          break;    
          
        case 'porte de charenton':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59465', 0, 4);
          break;    
          
        case 'liberte':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59562', 0, 4);
          break;    
          
        case 'charenton ecoles':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59482', 0, 4);
          break;    
          
        case 'ecole veterinaire de maisons alfort':
        case 'ecole veterinaire':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59565', 0, 4);
          break;    
          
        case 'maisons alfort stade':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59484', 0, 4);
          break;    
          
        case 'maisons alfort les juilliottes':
        case 'les juilliottes':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59483', 0, 4);
          break;    
          
        case 'creteil l\'echat':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59563', 0, 4);
          break;    
          
        case 'creteil universite':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59564', 0, 4);
          break;    
          
        case 'creteil prefecture':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59204', 0, 4);
          break;    
          
        case 'creteil pointe du lac':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59686', 0, 4);
          break;    
          
      /////////////////////////////////////////////////////////////
      // Ligne M9
      ////////////////////////////////////////////////////////////
          
        case 'pont de sevres':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59621', 0, 4);
          break;    
          
        case 'billancourt':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59504', 0, 4);
          break;    
           
        case 'marcel sembat':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59505', 0, 4);
          break;    
           
        case 'porte de saint cloud':
        case 'porte st cloud':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59492', 0, 4);
          break;    
           
        case 'jasmin':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59495', 0, 4);
          break;    
           
        case 'ranelagh':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59493', 0, 4);
          break;    
           
        case 'la muette':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59207', 0, 4);
          break;    
           
        case 'rue de la pompe':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59485', 0, 4);
          break;    
           
        case 'iena':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59619', 0, 4);
          break;    
           
        case 'alma marceau':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59500', 0, 4);
          break;    
           
        case 'saint philippe du roule':
        case 'st philippe du roule':
        case 'philippe du roule':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59490', 0, 4);
          break;    
          
        case 'saint augustin':
        case 'st augustin':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59489', 0, 4);
          break;    
           
        case 'saint ambroise':
        case 'st ambroise':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59562', 0, 4);
          break;    
           
        case 'voltaire':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59616', 0, 4);
          break;    
           
        case 'charonne':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59499', 0, 4);
          break;    
           
        case 'rue des boulets':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59486', 0, 4);
          break;    
           
        case 'buzenval':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59498', 0, 4);
          break;    
           
        case 'maraichers':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59501', 0, 4);
          break;    
           
        case 'porte de montreuil':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59491', 0, 4);
          break;    
           
        case 'robespierre':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59508', 0, 4);
          break;    
           
        case 'croix de chavaux':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59506', 0, 4);
          break;    
           
        case 'mairie de montreuil':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59507', 0, 4);
          break;    
              
      /////////////////////////////////////////////////////////////
      // Ligne M10
      ////////////////////////////////////////////////////////////
           
        case 'boulogne pont de saint cloud':
        case 'boulogne pont de st cloud':
        case 'boulogne st cloud':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59400', 0, 4);
          break;    
           
        case 'boulogne jean jaures':
        case 'boulogne jaures':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59398', 0, 4);
          break;    
           
        case 'porte d\'auteuil':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59668', 0, 4);
          break;    
           
        case 'eglise d\'auteuil':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59667', 0, 4);
          break;    
           
        case 'chardon lagache':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59383', 0, 4);
          break;    
           
        case 'mirabeau':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59374', 0, 4);
          break;    
           
        case 'javel andre citroën':
        case 'andre citroën':  
        case 'javel':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59548', 0, 4);
          break;    
           
        case 'charles michels':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59386', 0, 4);
          break;    
           
        case 'avenue emile zola':
        case 'emile zola':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59389', 0, 4);
          break;    
           
        case 'segur':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59368', 0, 4);
          break;    
         
        case 'vaneau':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59365', 0, 4);
          break;    
           
        case 'mabillon':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59353', 0, 4);
          break;    
           
        case 'cluny la sorbonne':
        case 'la sorbonne':
        case 'cluny':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59377', 0, 4);
          break;    
           
        case 'maubert mutualite':
        case 'mutualite':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59357', 0, 4);
          break;    
           
        case 'cardinal lemoine':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59380', 0, 4);
          break;    
            
      /////////////////////////////////////////////////////////////
      // Ligne M11
      ////////////////////////////////////////////////////////////
         
        case 'hotel de ville':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59590', 0, 4);
          break;    
         
        case 'rambuteau':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59403', 0, 4);
          break;    
         
        case 'goncourt':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59640', 0, 4);
          break;    
         
        case 'belleville':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59406', 0, 4);
          break;    
         
        case 'pyrenees':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59402', 0, 4);
          break;    
         
        case 'jourdain':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59405', 0, 4);
          break;    
         
        case 'place des fetes':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59638', 0, 4);
          break;    
         
        case 'telegraphe':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59404', 0, 4);
          break;    
         
        case 'porte des lilas':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59327', 0, 4);
          break;    
         
        case 'mairie des lilas':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59408', 0, 4);
          break;    
            
      /////////////////////////////////////////////////////////////
      // Ligne M12
      ////////////////////////////////////////////////////////////
         
        case 'porte de la chapelle':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59513', 0, 4);
          break;    
         
        case 'marx dormoy':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59517', 0, 4);
          break;    
         
        case 'jules joffrin':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59518', 0, 4);
          break;    
         
        case 'lamarck caulaincourt':
        case 'caulaincourt':
        case 'lamarck':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59519', 0, 4);
          break;    
         
        case 'abbesses':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59521', 0, 4);
          break;    
         
        case 'saint georges':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59512', 0, 4);
          break;    
         
        case 'notre dame de lorette':
        case 'dame de lorette':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59515', 0, 4);
          break;    
         
        case 'trinite d\'estienne d\'orves':
        case 'trinite':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59600', 0, 4);
          break;    
         
        case 'assemblee nationale':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59603', 0, 4);
          break;    
         
        case 'solferino':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59599', 0, 4);
          break;    
         
        case 'rue du bac':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59511', 0, 4);
          break;    
         
        case 'rennes':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59510', 0, 4);
          break;    
         
        case 'notre dame des champs':
        case 'dame des champs':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59516', 0, 4);
          break;    
         
        case 'falguiere':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59602', 0, 4);
          break;    
         
        case 'volontaires':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59509', 0, 4);
          break;    
         
        case 'vaugirard':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59601', 0, 4);
          break;    
         
        case 'convention':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59520', 0, 4);
          break;    
         
        case 'porte de versailles':
        case 'versailles':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59514', 0, 4);
          break;    
         
        case 'corentin celton':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59523', 0, 4);
          break;    
         
        case 'mairie d\'issy':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59522', 0, 4);
          break;    
             
      /////////////////////////////////////////////////////////////
      // Ligne M13
      ////////////////////////////////////////////////////////////
        
        case 'saint denis universite':
        case 'st denis universite':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59540', 0, 4);
          break;    
        
        case 'basilique st denis':
        case 'basilique de saint denis':
        case 'basilique saint denis':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59541', 0, 4);
          break;    
        
        case 'saint denis porte de paris':
        case 'st denis porte de paris':
        case 'porte de paris':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59542', 0, 4);
          break;    
        
        case 'carrefour pleyel':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59544', 0, 4);
          break;    
        
        case 'mairie de saint ouen':
        case 'mairie st ouen':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59545', 0, 4);
          break;    
        
        case 'garibaldi':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59543', 0, 4);
          break;    
        
        case 'porte de saint ouen':
        case 'porte st ouen':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59526', 0, 4);
          break;    
        
        case 'guy moquet':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59608', 0, 4);
          break;    
        
        case 'asnieres gennevilliers les courtilles':
        case 'asnieres gennevilliers':
        case 'asnieres':
        case 'les courtilles':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59582', 0, 4);
          break;    
       
        case 'les agnettes':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59597', 0, 4);
          break;    
        
        case 'gabriel peri':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59613', 0, 4);
          break;    
        
        case 'mairie de clichy':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59583', 0, 4);
          break;    
        
        case 'porte de clichy':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8711127', 0, 4);
          break;    
        
        case 'brochant':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59535', 0, 4);
          break;    
        
        case 'la fourche':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59533', 0, 4);
          break;    
        
        case 'place de clichy':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59421', 0, 4);
          break;    
        
        case 'liege':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59606', 0, 4);
          break;    
        
        case 'varenne':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59531', 0, 4);
          break;    
        
        case 'saint francois xavier':
        case 'st francois xavier':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59524', 0, 4);
          break;    
        
        case 'gaite':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59609', 0, 4);
          break;    
        
        case 'pernety':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59604', 0, 4);
          break;    
        
        case 'plaisance':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59529', 0, 4);
          break;    
        
        case 'porte de vanves':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59527', 0, 4);
          break;    
        
        case 'malakoff rue etienne dolet':
        //case 'malakoff':  
        //case 'rue etienne dolet':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59538', 0, 4);
          break;    
        
        case 'chatillon montrouge':
        //case '':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59614', 0, 4);
          break;    
             
      /////////////////////////////////////////////////////////////
      // Ligne M14
      ////////////////////////////////////////////////////////////    
      
        case 'gare de lyon':
        case 'gare lyon':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8768600', 0, 4);
          break;    
        
        case 'cour saint emilion':
        case 'cour st emilion':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59411', 0, 4);
          break;    
        
        case 'bibliotheque francois mitterand':
        case 'francois mitterand':
        case 'bibliotheque francois':  
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8732832', 0, 4);
          break;    
        
        case 'olympiades':
          searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59552', 0, 4);
          break;    
            
        default:
          sendTextMessage(senderID, messageText);
      }
    } else if (messageAttachments) {
      sendTextMessage(senderID, "Message with attachment received");
    }
  
  } //receivedMessage end

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}

//////////////////////////
// Sending helpers
//////////////////////////

function sendTextMessage(recipientID, messageText) {
  var messageData = {
    recipient: {
      id: recipientID
    },
    message: {
      text: 'Écrivez simplement votre arrêt et je vous dirai les prochains horaires !'
    }
  };

  callSendAPI(messageData);
}

function sendGenericMessage(recipientID) {
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

  callSendAPI(messageData);
}

//////////////////////////////
//Format Time before SearchStop Function
/////////////////////////////

function timeFormatter (time) {
	var timeArr = time.split('T');
	var finalTime = timeArr[1].slice(0,2) + ':' + timeArr[1].slice(2,4);
	return finalTime;
}

//////////////////////////////
//searchStop Function
/////////////////////////////

function searchStop (senderID, regionName, lineName, stopName, startIterator, loopLimit, key) {
  
  lastStopRequested = {
    sender: senderID,
    region: regionName,
    line: lineName,
    stop: stopName,
    startIterator: startIterator,
    loopLimit: loopLimit,
    key: key
  };
  
  lastStop = Array.from(arguments);
  console.log(lastStop);
    
  var jsonData = '';
  //Request to Navitia API
  request({
    uri: 'http://' + process.env.apikey + '@api.navitia.io/v1/coverage/' + regionName + '/lines/line' + lineName + '/stop_areas/stop_area' + stopName + '/departures?',
    //Callback to fill in jsonData with Navitia JSON information
  }, function (error, response, body) {
    //If api returns A-OK, continue
      if (!error && response.statusCode == 200){
        //set body of return JSON as var data
        var data = JSON.parse(body);
        //Log the response headers
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        //Start return message content Loop
        //Start with setting default intro message
        for (let i = startIterator; i < loopLimit; i++) {
          if (loopLimit === 4) {
            jsonData = 'Prochains métro à l\'arret ' + JSON.stringify(data.departures[i].stop_point.name) + ' sur la ligne M' + JSON.stringify(data.departures[i].display_informations.label) + ' ' + String.fromCodePoint(128647) + '\n\n';
            //Begin second loop for Hours
            for (let i = startIterator; i < loopLimit; i++) {
              data.departures[i] ? jsonData += timeFormatter(data.departures[i].stop_date_time.departure_date_time) + ' ' + '>' + ' ' + 'Direction ' + data.departures[i].display_informations.direction + '\n' : '';
              //data.departures[i] ? jsonData += 'Hello' + ' ' + i : null;
            }; //end 2nd For Loop     
          //On "plus" send back all times  
          } 
          else if (loopLimit === 8) {
            jsonData = 'Horaires additionnelles:'  + '\n\n';
            for (let i = startIterator; i < data.departures.length; i++) {
              jsonData += timeFormatter(data.departures[i].stop_date_time.departure_date_time) + ' ' + '>' + ' ' + 'Direction ' + data.departures[i].display_informations.direction + '\n';
              //data.departures[i] ? jsonData += 'Hello' + ' ' + i : null;
            }; //end 2nd For Loop
          }
          //If data.departures[i] === non existant, simply send back msg below  
          else {
            jsonData = 'Plus d\'horaires additionnelles';
          }
        } //end 1st For Loop
        jsonData = jsonData.replace(/"/g,''); //removing annoying "" in JSON

        //Calls sendResponse which formats data and sends to callSendAPI
        sendResponse(senderID , jsonData, lastStopRequested);
        } else {
          console.log(error);
        }    
    })
}

//////////////////////////////
//MultiStop Function
/////////////////////////////

function multiSearchStop (item, index, multiStop) {
  searchStop(item.senderID,item.region,item.line,item.stop,item.startIterator,item.loopLimit,item.key);
}  

//////////////////////////////////////////////////////////////////////////////////////////
// moreTimes = if user messages 'plus'
//////////////////////////////////////////////////////////////////////////////////////////

function moreTimes(senderID, messageText) {
  if (lastStopRequested === null) {
    sendTextMessage(senderID, messageText);
  } else {
    //create var lastStopRequested to store last requested stop (duh) and pass it into the next message
    //function moreTimes() will use lastStopRequested to send more times if requested
    searchStop(senderID, lastStopRequested.region, lastStopRequested.line, lastStopRequested.stop, lastStopRequested.startIterator + 4, lastStopRequested.loopLimit + 4);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////
//sendResponse = formatting jsonData and sender info before giving info to callSendAPI
/////////////////////////////////////////////////////////////////////////////////////////

function sendResponse(senderID , jsonData, lastStopRequested) {
  var messageData = {
    recipient: {
      id: senderID
    },
    message: {
      text: jsonData
    }
  }
  callSendAPI(messageData, lastStopRequested);
}

////////////////////////////////
//Call Send API - last step before FB POSTS message to sender
///////////////////////////////

function callSendAPI(messageData, lastStopRequested) {
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
      //console.error("Unable to send message.");
      //console.error(response);
      //console.error(error);
    }
  });  
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});