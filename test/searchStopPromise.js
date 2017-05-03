const utils = require('../lib/utils.js');
const bot = require('../bot.js');
const request = require('request');

//////////////////////////////
//searchStop Function
/////////////////////////////

var searchStop = exports.searchStop = function searchStop (senderID, regionName, lineName, stopName, startIterator, loopLimit, key) {
  
  var _lastStopRequested = {
    sender: senderID,
    region: regionName,
    line: lineName,
    stop: stopName,
    startIterator: startIterator,
    loopLimit: loopLimit,
    key: key
  };
  
  var _lastStop = Array.from(arguments);
  //console.log(_lastStop);
    
  var jsonData = '';
  //Request to Navitia API
  request({
    uri: 'http://' + process.env.apikey + '@api.navitia.io/v1/coverage/' + regionName + '/lines/line' + lineName + '/stop_areas/stop_area' + stopName + '/departures?',
    //Callback to fill in jsonData with Navitia JSON information
  }, function (error, response, body) {
      // IF SUCCESS then ...
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
        jsonData = jsonData.replace(/"/g,''); //removing annoying "" in JSON

        //Calls sendResponse which formats data and sends to callSendAPI
        utils.sendResponse(senderID , jsonData, _lastStopRequested);
        
        // IF REJECTION aka ERROR then ...
      } else if (error) {
        console.log(error);
      }    
    })
}