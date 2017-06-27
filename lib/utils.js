"use strict";

const removeDiacritics = require('diacritics').remove;
const request = require('request');
//const pSegCases = require('../test/promiseSwitchCase.js');

var utils = {
  
  /**
  * Resolve all promises in Object via for ... in loop
  * @param {object} obj - The object containing function properties => Switch cases that resolve
  */
  switchCasePromiseResolver: function switchCasePromiseResolver (obj, event) {
    
    //Promise Resolver For...In Loop - returns out to Var as Array
    let i = -1;
    var promisesArr = [];
    //Loop through the segmented Switch Cases (test is an obj with each Switch Case as a property)
    for (var ligneFn in obj) {
      //console.log(ligneFn);
      i++;
      //resolve each switch case with the event.message.text and return resolve
      promisesArr[i] = Promise.resolve( obj[ligneFn](event) );
    }
    /**
    * Returns newly filled in Arr from loop
    * @return {array} - returns array with promise status (resolve, false) in array
    */
    return promisesArr;
    
  },
  
    //////////////////
   // Text Cleaners
  //////////////////
  
  cleanseText: function cleanseText (text) {
    return removeDiacritics(
      text.toLowerCase()
        .replace(/\s\s+|[.-]/g, function (match) { return (match === "-" || "  " ? " " : "") }
       ).trim())
    //([\uD800-\uDBFF][\uDC00-\uDFFF]) to remove emojis
  }, 

  //////////////////////////////////////////
  //Format Time before SearchStop Function
  /////////////////////////////////////////
  
  timeFormatter (time) {
    var timeArr = time.split('T');
    var finalTime = timeArr[1].slice(0,2) + ':' + timeArr[1].slice(2,4);
    return finalTime;
  },
  
  //Random Number between 2 values
  
  randNum (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  
  //Whitelist them domains bruh
  setWhiteList(domains) { 
    if (!Array.isArray(domains)) {
      throw "Error ... domains param MUST be an array. You passed in: " + typeof domains;
    } else {
      request(
        {
          method: 'POST',
          uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=' + process.env.PAGE_ACCESS_TOKEN,
          headers: { 
            'content-type': 'application/json' 
          },
          body: {
            whitelisted_domains: domains
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
    };
  }
}
module.exports = utils;