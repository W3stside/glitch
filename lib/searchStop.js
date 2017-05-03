const request = require('request');
const utils = require('./utils.js');
const sendH = require('./sendHelpers.js');

var stopQuery = {
  //create some sense of history of stops 
  _lastStop: [],
  _lastStopRequested: null,
  
  //////////////////////////////////////////////////////////////
  //Take input and return stop info requested - PROMISE
  //////////////////////////////////////////////////////////////
  searchStop: function searchStop (senderID, regionName, lineName, stopName, startIterator, loopLimit, key) {
    
    this._lastStopRequested = {
      sender: senderID,
      region: regionName,
      line: lineName,
      stop: stopName,
      startIterator: startIterator,
      loopLimit: loopLimit,
      key: key
    };

    this._lastStop = Array.from(arguments);
   //console.log(_lastStop);
    
    //return new Promise ( (resolve, reject) => {
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
                  data.departures[i] ? jsonData += utils.timeFormatter(data.departures[i].stop_date_time.departure_date_time) + ' ' + '>' + ' ' + 'Direction ' + data.departures[i].display_informations.direction + '\n' : '';
                  //data.departures[i] ? jsonData += 'Hello' + ' ' + i : null;
                }; //end 2nd For Loop     
              //On "plus" send back all times  
              } 
              else if (loopLimit === 8) {
                jsonData = 'Horaires additionnelles:'  + '\n\n';
                for (let i = startIterator; i < data.departures.length; i++) {
                  jsonData += utils.timeFormatter(data.departures[i].stop_date_time.departure_date_time) + ' ' + '>' + ' ' + 'Direction ' + data.departures[i].display_informations.direction + '\n';
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
            sendH.sendTextMessage(jsonDataObj.senderID, jsonDataObj.text);
            //resolve(jsonDataObj);
            //Calls sendResponse which formats data and sends to callSendAPI
            //sendResponse(senderID , jsonData, _lastStopRequested);
            } else if (error) {
              console.log(error);
              //reject(error);
            }    
        })
  //  }); //end Prom
  },

  //////////////////////////////
  //MultiStop Function
  /////////////////////////////
  multiSearchStop: function multiSearchStop (item, index, multiStop) {
    this.searchStop(item.senderID,item.region,item.line,item.stop,item.startIterator,item.loopLimit,item.key);
  },

  ///////////////////////////////////////
  // moreTimes = if user messages 'plus'
  //////////////////////////////////////
  moreTimes: function moreTimes(senderID, messageText) {
    if (this._lastStopRequested === null) {
      sendH.sendTextMessage(senderID, messageText);
    } else {
      //create var lastStopRequested to store last requested stop (duh) and pass it into the next message
      //function moreTimes() will use lastStopRequested to send more times if requested
      this.searchStop(senderID, this._lastStopRequested.region, this._lastStopRequested.line, this._lastStopRequested.stop, this._lastStopRequested.startIterator + 4, this._lastStopRequested.loopLimit + 4);
    }
  }
}

module.exports = stopQuery;