"use strict";

const request = require('request');
const sendH = require('./sendHelpers.js');

var googleSearchAPI = {
  ////////////////////////////////////////
  // Google maps Nearby Stops
  ////////////////////////////////////////

  nearbyStops: function (senderID, messageText) {
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

    sendH.callSendAPI(messageData);
  },

  ///////////////////////////////////////
  // Google map Query
  /////////////////////////////////////

  googleMapsSearch: function ( coordinates, placeID ) {
    //return a Promise to    
    return new Promise ( (resolve, reject) => {
          const apiKey = process.env.googleMapsAPI;
          //keyword used in url1 to specify what is being searched
          const keyword = 'arret metro';
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
      },

  ////////////////////////////////////
  // Nearby Stops + GMaps Query Promise
  ///////////////////////////////////
  fullGoogleSearch: function (coordinates, placeID, senderID) {

    //googleMapsSearch here returns Response JSON object which contains results earned from user sent in Coordinates
    this.googleMapsSearch(coordinates, placeID)
      .then( response => {
        var loopLimiter = response.results.length <= 5 ? response.results.length : 5;               
        //create empty array to fill with forEach results of results[i].place_id
        var placeResults = [];

        for (let i = 0; i < loopLimiter; i++) {
            placeResults.push( this.googleMapsSearch (null, response.results[i].place_id) );
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
          sendH.callSendAPI(messageData);
      })
      .catch( error => {
          console.log(error);
      });
  }
}

module.exports = googleSearchAPI;