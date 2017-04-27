const utils = require('./lib/utils.js');
const bot = require('./bot.js');

exports.stopSwitch = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        // and send back the template example. Otherwise, just echo the text we received.
        switch (messageText) {

          case 'test_this':
            utils.sendTextMessage(event.sender.id, 'test_this worked, SON');
            break;

          default:
            utils.sendTextMessage(event.sender.id, 'Écrivez simplement votre arrêt et je vous dirai les prochains horaires !');

        }
    }
  })
}