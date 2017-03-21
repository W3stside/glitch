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

// Incoming events handling
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;
  //Incoming message here - de-diacritic...ing? and removing "." + "-"
  var messageText = removeDiacritics(message.text.toLowerCase().replace(/[-.]/g,function(match) {return (match==="-" ? " " : "")}));
  var messageAttachments = message.attachments;

///////////////////////////////
//Message Switch Cases
//////////////////////////////  
  
  if (messageText) {
    // If we receive a text message, check to see if it matches a keyword
    // and send back the template example. Otherwise, just echo the text we received.
    switch (messageText) {
        
    ///////////////////////////////////////////////////////
    // Metro Ligne 1 Stops
    ///////////////////////////////////////////////////////    
     
      case 'la defense':
      case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221');
        break;

      case 'esplanade de la defense':
      case 'esplanade':  
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593');
        break;
      
      case 'pont de neuilly':
      case 'neuilly':    
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661');
        break;
        
      case 'les sablons': //Les Sablons [%3AOIF%3ASA%3A59250]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250');
        break;
        
      case 'porte maillot': //Porte Maillot [%3AOIF%3ASA%3A8738102]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102');
        break;
        
      case 'argentine': //Argentine [%3AOIF%3ASA%3A59237]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237');
        break;
        
      case 'charles de gaulle etoile': //Charles de Gaulle-Etoile [%3AOIF%3ASA%3A8775800]
      case 'etoile':  
      case 'charles de gaulle':
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775800');
        break;
        
      case 'georges v': //Georges V [%3AOIF%3ASA%3A59234]
      case 'georges 5':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234');
        break;
      
      case 'franklin roosevelt': //Franklin Roosevelt [%3AOIF%3ASA%3A59232]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59232');
        break;  
        
      case 'champs elysees clemenceau': //Champs Élysées Clemenceau [%3AOIF%3ASA%3A59592]
      case 'champs elysees':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59592');
        break;   
     
      case 'concorde': //Concorde [%3AOIF%3ASA%3A59235]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235');
        break; 
        
      case 'tuileries': //Tuileries [%3AOIF%3ASA%3A59226]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226');
        break; 
        
      case 'palais royal musee du louvre': //Palais royal Musée du Louvre [%3AOIF%3ASA%3A59591]
      case 'musee du louvre':
      case 'palais royal':  
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59591');
        break; 
        
      case 'louvre rivoli': //Louvre Rivoli [%3AOIF%3ASA%3A59231]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231');
        break; 
        
      case 'chatelet': //Châtelet [%3AOIF%3ASA%3A59566]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59566');
        break; 
        
      case 'hotel de ville': //Hôtel de Ville [%3AOIF%3ASA%3A59590]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590');
        break; 
        
      case 'saint paul': //Saint-Paul [%3AOIF%3ASA%3A59225]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225');
        break; 
        
      case 'bastille': //Bastille [%3AOIF%3ASA%3A59238]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238');
        break; 
        
      case 'gare de lyon': //Gare de Lyon [%3AOIF%3ASA%3A8768600]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600');
        break;
        
      case 'reuilly diderot': //Reuilly Diderot [%3AOIF%3ASA%3A59227]
      case 'diderot':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59227');
        break;
        
      case 'nation': //Nation [%3AOIF%3ASA%3A8775810]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810');
        break;
        
      case 'porte de vincennes': //Porte de Vincennes [%3AOIF%3ASA%3A59228]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228');
        break;
        
      case 'saint mande': //Saint Mandé [%3AOIF%3ASA%3A59662]
      case 'st mande':
      case 'stmande':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662');
        break;
        
      case 'berault': //Bérault [%3AOIF%3ASA%3A59596]
      //case 'defense':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596');
        break;
      
      case 'chateau de vincennes': //Château de Vincennes [%3AOIF%3ASA%3A59595]
      case 'chateau de vincene':
        searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595');
        break;  
        
      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

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
//searchStop Function
/////////////////////////////

function timeFormatter (time) {
	var timeArr = time.split('T');
	var finalTime = timeArr[1].slice(0,2) + ':' + timeArr[1].slice(2,4);
	return finalTime;
}

function searchStop (senderID, regionName, lineName, stopName) {
  var jsonData = '';
  //Request to Navitia API
  request({
    uri: 'http://' + process.env.apikey + '@api.navitia.io/v1/coverage/' + regionName + '/lines/line' + lineName + '/stop_areas/stop_area' + stopName + '/departures?',
    //Callback to fill in jsonData with Navitia JSON information
  }, function (error, response, body) {
      if (!error && response.statusCode == 200){
        var data = JSON.parse(body);
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        
        //jsonData being pulled from body of the JSON data and formatted into JSON stringify format + correct time format via the timeFormatter function above 
        jsonData = 'Prochains métro à l\'arret ' + JSON.stringify(data.departures[0].stop_point.name) + ' sur la ligne ' + JSON.stringify(data.departures[0].display_informations.label) + ' ' + String.fromCodePoint(128647)
          + '\n' + '\n' //double line break
          + timeFormatter(JSON.stringify(data.departures[0].stop_date_time.departure_date_time)) + ' ' + '>' + ' ' + 'Direction ' + JSON.stringify(data.departures[0].display_informations.direction)
          + '\n' 
          + timeFormatter(JSON.stringify(data.departures[1].stop_date_time.departure_date_time)) + ' ' + '>' + ' ' + 'Direction ' + JSON.stringify(data.departures[1].display_informations.direction)
          + '\n' 
          + timeFormatter(JSON.stringify(data.departures[2].stop_date_time.departure_date_time)) + ' ' + '>' + ' ' + 'Direction ' + JSON.stringify(data.departures[2].display_informations.direction)
          + '\n' 
          + timeFormatter(JSON.stringify(data.departures[3].stop_date_time.departure_date_time)) + ' ' + '>' + ' ' + 'Direction ' + JSON.stringify(data.departures[3].display_informations.direction);
        jsonData = jsonData.replace(/"/g,''); //removing annoying "" in JSON
        //Calls sendResponse which formats data and sends to callSendAPI
        sendResponse(senderID , jsonData);
      } else {
        console.log(error);
      }    
    })
  sendResponse(senderID , jsonData);
}

/////////////////////////////////////////////////////////////////////////////////////////
//sendResponse = formatting jsonData and sender info before giving info to callSendAPI
/////////////////////////////////////////////////////////////////////////////////////////

function sendResponse(senderID , jsonData) {
  var messageData = {
    recipient: {
      id: senderID
    },
    message: {
      text: jsonData
    }
  }
  callSendAPI(messageData);
}

////////////////////////////////
//Call Send API - last step before FB POSTS message to sender
///////////////////////////////

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
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