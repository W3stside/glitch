const removeDiacritics = require('diacritics').remove;

var utils = {
  ///////////////////
  // Text Cleaners
  //////////////////
  cleanseText: function cleanseText (text) {
    return removeDiacritics(
      text.toLowerCase()
        .replace(/\s\s+|[.-]/g, function (match) { return (match === "-" || "  " ? " " : "") }
       ))
  }, 

  //////////////////////////////////////////
  //Format Time before SearchStop Function
  /////////////////////////////////////////
  timeFormatter: function timeFormatter (time) {
    var timeArr = time.split('T');
    var finalTime = timeArr[1].slice(0,2) + ':' + timeArr[1].slice(2,4);
    return finalTime;
  }

/*/////////////////////////////
//searchStop Function
/////////////////////////////

var searchStop = exports.searchStop = function searchStop (senderID, regionName, lineName, stopName, startIterator, loopLimit, key) {
  return new Promise ( (resolve, reject) => {
  _lastStopRequested = {
    sender: senderID,
    region: regionName,
    line: lineName,
    stop: stopName,
    startIterator: startIterator,
    loopLimit: loopLimit,
    key: key
  };
  
  _lastStop = Array.from(arguments);
  //console.log(_lastStop);
    
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

        var jsonDataObj = {
          senderID: senderID,
          text: jsonData.replace(/"/g,'') //removing annoying "" in JSON
        }

        resolve(jsonDataObj);
        //Calls sendResponse which formats data and sends to callSendAPI
        //sendResponse(senderID , jsonData, _lastStopRequested);
        } else if (error) {
          reject(error);
        }    
    })
  }); //end Prom
}

//////////////////////////////
//MultiStop Function
/////////////////////////////

exports.multiSearchStop = function multiSearchStop (item, index, multiStop) {
  searchStop(item.senderID,item.region,item.line,item.stop,item.startIterator,item.loopLimit,item.key);
}  

///////////////////////////////////////
// moreTimes = if user messages 'plus'
//////////////////////////////////////

exports.moreTimes = function moreTimes(senderID, messageText) {
  if (_lastStopRequested === null) {
    sendTextMessage(senderID, messageText);
  } else {
    //create var lastStopRequested to store last requested stop (duh) and pass it into the next message
    //function moreTimes() will use lastStopRequested to send more times if requested
    searchStop(senderID, _lastStopRequested.region, _lastStopRequested.line, _lastStopRequested.stop, _lastStopRequested.startIterator + 4, _lastStopRequested.loopLimit + 4);
  }
}

////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////
// Google maps Nearby Stops
////////////////////////////////////////

var shareLocation = exports.shareLocation = function nearbyStops(senderID, messageText) {
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
  
  callSendAPI(messageData);
};

///////////////////////////////////////
// Google map Query
/////////////////////////////////////

var googleMapsSearch = exports.googleMapsSearch = function googleMapsSearch( coordinates, placeID ) {
  //return a Promise to    
  return new Promise ( (resolve, reject) => {
        const apiKey = process.env.googleMapsAPI;
        //keyword used in url1 to specify what is being searched
        var keyword = 'arret metro';
        const baseUrl = 'https://maps.googleapis.com/maps/api/place/';
        //depending on args - create url || url1 = initial search with COORDS && url2 = search AFTER promise resolves for places_id
        var url1 = baseUrl + 'nearbysearch/json?location=' + coordinates + '&keyword=' + keyword + '&rankby=distance&key=' + apiKey;  
        var url2 = baseUrl + 'details/json?placeid=' + placeID + '&key=' + apiKey;
        //create finalUrl depending on situation
        const finalUrl = placeID ? url2 : url1;
        
        //request at finalUrl and resolve if response : error;        
        request(finalUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            resolve ( JSON.parse(body) );
          } else if (error) {
            reject (console.log('Error: ' + error) );
          }
        });
      }); //end Promise
    }

////////////////////////////////////
// Nearby Stops + GMaps Query Promise
///////////////////////////////////
exports.fullGoogleSearch = function fullGoogleSearch (coordinates, placeID, senderID) {
  
  //googleMapsSearch here returns Response JSON object which contains results earned from user sent in Coordinates
  googleMapsSearch(coordinates, placeID)
    .then( response => {
      var loopLimiter = response.results.length <= 5 ? response.results.length : 5;               
      //create empty array to fill with forEach results of results[i].place_id
      var placeResults = [];

      for (let i = 0; i < loopLimiter; i++) {
          placeResults.push( googleMapsSearch (null, response.results[i].place_id) );
        }
      //Wait for all loops to finish and results to be pushed into placeResults[]
      return Promise.all(placeResults).then(values => {
        return values;
      }).catch(err => {
        console.log(err);
      });
    //Pass returned placeResults[] from Promise.all
    })
    .then (response => {
    console.log(response);
      var dynamicArr = [];
      response.forEach( result => {
        dynamicArr.push (
          {
            title: result.result.name,
            subtitle: result.result.formatted_address + '\n'
                   + (result.result.formatted_phone_number ? result.result.formatted_phone_number + '\n' 
                   + 'Voir les horaires' : result.result.international_phone_number ? result.result.international_phone_number + '\n' + 'Voir les horaires' : '\n' + 'Voir les horaires'),
            buttons: [
              {
                type: "postback",
                title: result.result.name,
                payload: result.result.name
              }
            ]
          });              
      })

      var messageData = {
          recipient:{
            id: senderID
          }, 
          message: {
            attachment: {
              //req
              type: "template",
              payload: {
                //req
                template_type: "generic",
                elements: dynamicArr
              }
            }
          }
        }
        callSendAPI(messageData);
    })
    .catch( error => {
        console.log(error);
    });
}

//////////////////////////
// Sending helpers
//////////////////////////

var sendTextMessage = exports.sendTextMessage = function sendTextMessage(recipientID, messageText) {
   
  var messageData = {
    recipient: {
      id: recipientID
    },
    message: {
      text: messageText
    }
  };
  
  callSendAPI(messageData);
   
}

exports.sendGenericMessage = function sendGenericMessage(recipientID) {
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

////////////////////////////////
//Call Send API - last step before FB POSTS message to sender
///////////////////////////////

var callSendAPI = exports.callSendAPI = function callSendAPI(messageData, lastStopRequested) {
  
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
*/
}
module.exports = utils;