const utils = require('../lib/utils.js');
const bot = require('../bot.js');

///////////////////////////////////////
// Object Literal, "Hash Table" Lookup
//////////////////////////////////////

exports.findStopTest = function findStop (choice, senderID) {
    var messageText = utils.cleanseText(choice);
  //return new Promise ( (resolve,reject) => {
    var region = 'fr-idf';
    var line = ['0','1','2','3','4','5'];

    var printStop = function (senderID, regionID, lineID, stopID) {
      console.log( 'You chose ' + messageText + ' which has regionID: ' + regionID + ', lineID: ' + lineID + ', and stopID: ' + stopID);
    }
    
    //console.log(messageText);
  
    var stops = {
      'etoile': printStop,
      'charles de gaulle': printStop,
      'charles de gaulle etoile': printStop,

      /*'la defense': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4),
      'defense': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4),


      'esplanade de la defense': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4),
      'esplanade': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4),


      'pont de neuilly': 	utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4),
      'neuilly': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4),

      'les sablons': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4),

      'porte maillot': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4),

      'argentine': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4),

      'georges v': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4),
      'georges 5': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4),

      'concorde': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4),

      'tuileries': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4),

      'louvre rivoli': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4),

      'hotel de ville': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4),	 

      'saint paul': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4),

      'bastille': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4),

      'gare de lyon': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4),

      'nation': 
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4),
      'nation':
        //M2
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4),
      'nation':
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4),

      'porte de vincennes': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4),

      'saint mande': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4),
      'st mande': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4),
      'stmande': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4),

      'berault': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4),

      'chateau de vincennes': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4),
      'chateau de vincene': utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4),

      'default': 'No stop found, please try again.'*/
    }
  console.log(choice);
  stops[messageText]() || stops['default'];
    
}

/*exports.stopSearchTest = function stopSearch (stop) {
    findStop(stop).then( response => {
        return new Promise ( (resolve, reject) => {
            setTimeout( () => {
                resolve(console.log(response));
            }, 3000);
        });
    }).then(response =>{
        utils.callSendAPI();
    });
}*/





///////////////////////////
// SWITCH CASES
//////////////////////////

exports.stopSwitch = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          ///////////////////////////////////////////////////////
          // Ligne M1
          ///////////////////////////////////////////////////////    

          case 'la defense':
          case 'defense':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4));
            break;

          case 'esplanade de la defense':
          case 'esplanade':  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4));
            break;

          case 'pont de neuilly':
          case 'neuilly':    
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4));
            break;

          case 'les sablons':
          //case 'defense':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4));
            break;

          case 'porte maillot':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4));
            break;

          case 'argentine':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4));
            break;

          case 'georges v':
          case 'georges 5':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4));
            break;

          case 'concorde':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4));
            break; 

          case 'tuileries':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4));
            break; 

          case 'louvre rivoli':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4));
            break; 

          case 'hotel de ville':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4));
            break; 

          case 'saint paul':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4));
            break; 

          case 'bastille':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4));
            break; 

          case 'gare de lyon':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4));
            break;

          case 'nation':
            //M1
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
            //M2
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
            //M9
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
            break;

          case 'porte de vincennes':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4));
            break;

          case 'saint mande':
          case 'st mande':
          case 'stmande':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4));
            break;

          case 'berault':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4));
            break;

          case 'chateau de vincennes':
          case 'chateau de vincene':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4));
            break;

          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch2 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

        //////////////////////////////////////////////////
        // Ligne M2
        ///////////////////////////////////////////////////

          case 'porte dauphine':
          case 'dauphine':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59213', 0, 4));
            break;

          case 'victor hugo':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439', '%3AOIF%3ASA%3A59417', 0, 4));
            break;

          case 'ternes':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59416', 0, 4));
            break;          

          case 'courcelles':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59424', 0, 4));
            break;

          case 'monceau':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59422', 0, 4));
            break;

          case 'villiers':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59415', 0, 4));
            break;

          case 'rome':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59418', 0, 4));
            break;

          case 'place de clichy':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59421', 0, 4));
            break;

          case 'blanche':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59428', 0, 4));
            break;

          case 'anvers':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59426', 0, 4));
            break;

          case 'la chapelle':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59218', 0, 4));
            break;

          case 'stalingrad':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59279', 0, 4));
            break;

          case 'jaures':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59635', 0, 4));
            break;

          case 'colonel fabien':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59423', 0, 4));
            break;

          case 'belleville':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59406', 0, 4));
            break;

          case 'couronnes':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59429', 0, 4));
            break;

          case 'menilmontant':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59655', 0, 4));
            break;

          case 'phillipe auguste':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59419', 0, 4));
            break;

          case 'alexandre dumas':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59425', 0, 4));
            break;

          case 'avron':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59427', 0, 4));
            break;
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch3 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

        /////////////////////////////////////////////////////////////
        // Ligne M3
        ////////////////////////////////////////////////////////////
          case 'pont de levallois becon':
          case 'pont de levallois': 
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59589', 0, 4));
            break;

          case 'anatole france':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59447', 0, 4));
            break;

          case 'louise michel':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59446', 0, 4));
            break;

          case 'porte de champerret':
          //case :  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59436', 0, 4));
            break;

          case 'pereire':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59219', 0, 4));
            break;

          case 'wagram':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59439', 0, 4));
            break;

          case 'malesherbes':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59441', 0, 4));
            break;

          case 'villiers':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59415', 0, 4));
            break;

          case 'europe':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59443', 0, 4));
            break;

          case 'quatre septembre':
          case '4 septembre':  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59437', 0, 4));
            break;

          case 'bourse':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59444', 0, 4));
            break;

          case 'sentier':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59440', 0, 4));
            break;

          case 'parmentier':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59434', 0, 4));
            break;  

          case 'rue saint maur':
          case 'rue st maur':  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59670', 0, 4));
            break;  

          case 'gambetta':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59325', 0, 4));
            break;  

          case 'porte de bagnolet':
          case 'bagnolet':  
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59435', 0, 4));
            break;  

          case 'gallieni':
            resolve(utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59448', 0, 4));
            break; 
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch4 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

        case 'porte de clignancourt':
        case 'clignancourt':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59258', 0, 4));
          break;

        case 'simplon':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59622', 0, 4));
          break;

        case 'chateau rouge':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59629', 0, 4));
          break;

        case 'chateau d\'eau':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59630', 0, 4));
          break;

        case 'etienne marcel':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59261', 0, 4));
          break;

        case 'les halles':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59208', 0, 4));
          break;

        case 'chatelet':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59566', 0, 4));
          break;  

        case 'saint michel':
        case 'st michel':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8754731', 0, 4));
          break;  

        case 'saint germain des pres':
        case 'st germain des pres':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59623', 0, 4));
          break;  

        case 'saint sulpice':
        case 'st sulpice':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59257', 0, 4));
          break;  

        case 'saint placide':
        case 'st placide':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59256', 0, 4));
          break;  

        case 'vavin':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59254', 0, 4));
          break;

        case 'mouton duvernet':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59260', 0, 4));
          break;

        case 'alesia':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59631', 0, 4));
          break;

        case 'porte d\'orleans':
        //case '':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59624', 0, 4));
          break;

        case 'mairie de montrouge':
        case 'montrouge':  
          resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59776', 0, 4));
          break;
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch5 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'bobigny pablo picasso':
          case 'bobigny picasso':
          case 'bobigny pablo':
          case 'pablo picasso':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59342', 0, 4));
            break;

          case 'bobigny pantin raymon queneau':
          case 'raymon queneau':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59343', 0, 4));
            break;

          case 'eglise de pantin':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59344', 0, 4));
            break;

          case 'hoche':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59345', 0, 4));
            break;

          case 'porte de pantin':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59551', 0, 4));
            break;

          case 'ourcq':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59337', 0, 4));
            break;

          case 'laumiere':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59636', 0, 4));
            break;

          case 'jaures':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59635', 0, 4));
            break;

          case 'jacque bonsergent':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59340', 0, 4));
            break;

          case 'richard lenoir':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59336', 0, 4));
            break;

          case 'breguet sabin':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59637', 0, 4));
            break;

          case 'quai de la rapee':
          case 'quai rapee':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59633', 0, 4));
            break;

          case 'gare d\'austerlitz':
          case 'austerlitz':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8754700', 0, 4));
            break;

          case 'saint marcel':
          case 'st marcel':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59335', 0, 4));
            break;  

          case 'campo formio':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59339', 0, 4));
            break;
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch6 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

        case 'kleber':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59650', 0, 4));
        break;

      case 'boissiere':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59652', 0, 4));
        break;

      case 'passy':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59451', 0, 4));
        break;

      case 'bir-hakeim':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59205', 0, 4));
        break;

      case 'dupleix':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59455', 0, 4));
        break;

      case 'cambronne':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59459', 0, 4));
        break;

      case 'sevres lecourbe':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59648', 0, 4));
        break;

      case 'pasteur':
      //case '':
        //M6
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59452', 0, 4));
        //M12
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59452', 0, 4));
        break;

      case 'edgar quinet':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59456', 0, 4));
        break;

      case 'saint jacques':
      case 'st jacques':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59449', 0, 4));
        break;

      case 'glaciere':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59651', 0, 4));
        break;

      case 'corvisart':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59458', 0, 4));
        break;

      case 'nationale':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59454', 0, 4));
        break;

      case 'chevaleret':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59457', 0, 4));
        break;

      case 'quai de la gare':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59450', 0, 4));
        break;

      case 'dugommier':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59461', 0, 4));
        break;
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch7 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'la courneuve 8 mai 1945':
      case 'la courneuve':  
      case '8 mai 1945':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59320', 0, 4));
        break;   

      case 'fort d\'aubervilliers':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59316', 0, 4));
        break;

      case 'aubervilliers pantin 4 chemins':
      case 'aubervilliers pantin':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59318', 0, 4));
        break;

      case 'porte de la villette':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59288', 0, 4));
        break;

      case 'corentin cariou':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59302', 0, 4));
        break;

      case 'crimee':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59570', 0, 4));
        break;

      case 'riquet':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59285', 0, 4));
        break;

      case 'louis blanc':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59296', 0, 4));
        break;

      case 'chateau landon':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59572', 0, 4));
        break;

      case 'poissonniere':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59574', 0, 4));
        break;

      case 'cadet':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59304', 0, 4));
        break;

      case 'le peletier':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59292', 0, 4));
        break;

      case 'palais royal musee du louvre':
      case 'musee du louvre':  
      case 'palais royal':
      case 'louvre':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4));
        break;

      case 'pont neuf':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59664', 0, 4));
        break;

      case 'pont marie':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59576', 0, 4));
        break;

      case 'sully moriand':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59281', 0, 4));
        break;

      case 'place monge':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59277', 0, 4));
        break;

      case 'censier daubenton':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59306', 0, 4));
        break;

      case 'les gobelins':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59294', 0, 4));
        break;

      case 'tolbiac':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59283', 0, 4));
        break;

      case 'maison blanche':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59298', 0, 4));
        break; 

      case 'porte d\'italie':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59666', 0, 4));
        break; 

      case 'porte de choisy':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59663', 0, 4));
        break; 

      case 'porte d\'ivry':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59287', 0, 4));
        break; 

      case 'pierre et marie curie':
      case 'marie curie':  
      case 'curie':   
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59556', 0, 4));
        break; 

      case 'mairie d\'ivry':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59322', 0, 4));
        break;

      case 'le kremlin bicetre':
      case 'le kremlin':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59578', 0, 4));
        break;

      case 'villejuif leo lagrange':
      case 'leo lagrange':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4));
        break;

      case 'paul vaillant couturier':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59579', 0, 4));
        break;  

      case 'villejuif louis aragon':
      case 'louis aragon':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4));
        break; 
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch8 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'balard':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59477', 0, 4));
        break;    

      case 'lourmel':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59478', 0, 4));
        break;    

      case 'boucicaut':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59476', 0, 4));
        break;    

      case 'felix faure':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59560', 0, 4));
        break;    

      case 'commerce':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59474', 0, 4));
        break;    

      case 'ecoles militaire':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59470', 0, 4));
        break;    

      case 'la tour maubourg':
      case 'maubourg':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59658', 0, 4));
        break;    

      case 'filles du calvaire':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59472', 0, 4));
        break;    

      case 'saint sebastien froissart':
      case 'st sebastien froissart':  
      case 'sebastien froissart':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59558', 0, 4));
        break;    

      case 'chemin vert':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59473', 0, 4));
        break;    

      case 'ledru rollin':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59468', 0, 4));
        break;    

      case 'faidherbe chaligny':
      case 'faidherbe':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59471', 0, 4));
        break;    

      case 'montgallet':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59467', 0, 4));
        break;    

      case 'michel bizot':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59466', 0, 4));
        break;    

      case 'porte doree':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59559', 0, 4));
        break;    

      case 'porte de charenton':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59465', 0, 4));
        break;    

      case 'liberte':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59562', 0, 4));
        break;    

      case 'charenton ecoles':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59482', 0, 4));
        break;    

      case 'ecole veterinaire de maisons alfort':
      case 'ecole veterinaire':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59565', 0, 4));
        break;    

      case 'maisons alfort stade':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59484', 0, 4));
        break;    

      case 'maisons alfort les juilliottes':
      case 'les juilliottes':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59483', 0, 4));
        break;    

      case 'creteil l\'echat':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59563', 0, 4));
        break;    

      case 'creteil universite':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59564', 0, 4));
        break;    

      case 'creteil prefecture':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59204', 0, 4));
        break;    

      case 'creteil pointe du lac':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59686', 0, 4));
        break; 
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch9 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'pont de sevres':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59621', 0, 4));
        break;    

      case 'billancourt':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59504', 0, 4));
        break;    

      case 'marcel sembat':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59505', 0, 4));
        break;    

      case 'porte de saint cloud':
      case 'porte st cloud':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59492', 0, 4));
        break;    

      case 'jasmin':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59495', 0, 4));
        break;    

      case 'ranelagh':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59493', 0, 4));
        break;    

      case 'la muette':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59207', 0, 4));
        break;    

      case 'rue de la pompe':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59485', 0, 4));
        break;    

      case 'iena':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59619', 0, 4));
        break;    

      case 'alma marceau':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59500', 0, 4));
        break;    

      case 'saint philippe du roule':
      case 'st philippe du roule':
      case 'philippe du roule':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59490', 0, 4));
        break;    

      case 'saint augustin':
      case 'st augustin':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59489', 0, 4));
        break;    

      case 'saint ambroise':
      case 'st ambroise':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59562', 0, 4));
        break;    

      case 'voltaire':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59616', 0, 4));
        break;    

      case 'charonne':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59499', 0, 4));
        break;    

      case 'rue des boulets':
      //case '':  
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59486', 0, 4));
        break;    

      case 'buzenval':
        resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59498', 0, 4));
      break;    

    case 'maraichers':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59501', 0, 4));
      break;    

    case 'porte de montreuil':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59491', 0, 4));
      break;    

    case 'robespierre':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59508', 0, 4));
      break;    

    case 'croix de chavaux':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59506', 0, 4));
      break;    

    case 'mairie de montreuil':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59507', 0, 4));
      break; 
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch10 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'boulogne pont de saint cloud':
    case 'boulogne pont de st cloud':
    case 'boulogne st cloud':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59400', 0, 4));
      break;    

    case 'boulogne jean jaures':
    case 'boulogne jaures':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59398', 0, 4));
      break;    

    case 'porte d\'auteuil':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59668', 0, 4));
      break;    

    case 'eglise d\'auteuil':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59667', 0, 4));
      break;    

    case 'chardon lagache':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59383', 0, 4));
      break;    

    case 'mirabeau':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59374', 0, 4));
      break;    

    case 'javel andre citroën':
    case 'andre citroën':  
    case 'javel':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59548', 0, 4));
      break;    

    case 'charles michels':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59386', 0, 4));
      break;    

    case 'avenue emile zola':
    case 'emile zola':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59389', 0, 4));
      break;    

    case 'segur':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59368', 0, 4));
      break;    

    case 'vaneau':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59365', 0, 4));
      break;    

    case 'mabillon':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59353', 0, 4));
      break;    

    case 'cluny la sorbonne':
    case 'la sorbonne':
    case 'cluny':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59377', 0, 4));
      break;    

    case 'maubert mutualite':
    case 'mutualite':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59357', 0, 4));
      break;    

    case 'cardinal lemoine':
    //case '':  
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59380', 0, 4));
      break;   
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch11 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'hotel de ville':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59590', 0, 4));
      break;    

    case 'rambuteau':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59403', 0, 4));
      break;    

    case 'goncourt':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59640', 0, 4));
      break;    

    case 'belleville':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59406', 0, 4));
      break;    

    case 'pyrenees':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59402', 0, 4));
      break;    

    case 'jourdain':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59405', 0, 4));
      break;    

    case 'place des fetes':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59638', 0, 4));
      break;    

    case 'telegraphe':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59404', 0, 4));
      break;    

    case 'porte des lilas':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59327', 0, 4));
      break;    

    case 'mairie des lilas':
      resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59408', 0, 4));
      break;   
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch12 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'porte de la chapelle':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59513', 0, 4));
            break;    

          case 'marx dormoy':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59517', 0, 4));
            break;    

          case 'jules joffrin':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59518', 0, 4));
            break;    

          case 'lamarck caulaincourt':
          case 'caulaincourt':
          case 'lamarck':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59519', 0, 4));
            break;    

          case 'abbesses':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59521', 0, 4));
            break;    

          case 'saint georges':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59512', 0, 4));
            break;    

          case 'notre dame de lorette':
          case 'dame de lorette':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59515', 0, 4));
            break;    

          case 'trinite d\'estienne d\'orves':
          case 'trinite':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59600', 0, 4));
            break;    

          case 'assemblee nationale':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59603', 0, 4));
            break;    

          case 'solferino':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59599', 0, 4));
            break;    

          case 'rue du bac':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59511', 0, 4));
            break;    

          case 'rennes':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59510', 0, 4));
            break;    

          case 'notre dame des champs':
          case 'dame des champs':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59516', 0, 4));
            break;    

          case 'falguiere':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59602', 0, 4));
            break;    

          case 'volontaires':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59509', 0, 4));
            break;    

          case 'vaugirard':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59601', 0, 4));
            break;    

          case 'convention':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59520', 0, 4));
            break;    

          case 'porte de versailles':
          case 'versailles':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59514', 0, 4));
            break;    

          case 'corentin celton':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59523', 0, 4));
            break;    

          case 'mairie d\'issy':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59522', 0, 4));
            break; 
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch13 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'saint denis universite':
          case 'st denis universite':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59540', 0, 4));
            break;    

          case 'basilique st denis':
          case 'basilique de saint denis':
          case 'basilique saint denis':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59541', 0, 4));
            break;    

          case 'saint denis porte de paris':
          case 'st denis porte de paris':
          case 'porte de paris':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59542', 0, 4));
            break;    

          case 'carrefour pleyel':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59544', 0, 4));
            break;    

          case 'mairie de saint ouen':
          case 'mairie st ouen':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59545', 0, 4));
            break;    

          case 'garibaldi':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59543', 0, 4));
            break;    

          case 'porte de saint ouen':
          case 'porte st ouen':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59526', 0, 4));
            break;    

          case 'guy moquet':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59608', 0, 4));
            break;    

          case 'asnieres gennevilliers les courtilles':
          case 'asnieres gennevilliers':
          case 'asnieres':
          case 'les courtilles':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59582', 0, 4));
            break;    

          case 'les agnettes':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59597', 0, 4));
            break;    

          case 'gabriel peri':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59613', 0, 4));
            break;    

          case 'mairie de clichy':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59583', 0, 4));
            break;    

          case 'porte de clichy':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8711127', 0, 4));
            break;    

          case 'brochant':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59535', 0, 4));
            break;    

          case 'la fourche':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59533', 0, 4));
            break;    

          case 'place de clichy':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59421', 0, 4));
            break;    

          case 'liege':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59606', 0, 4));
            break;    

          case 'varenne':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59531', 0, 4));
            break;    

          case 'saint francois xavier':
          case 'st francois xavier':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59524', 0, 4));
            break;    

          case 'gaite':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59609', 0, 4));
            break;    

          case 'pernety':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59604', 0, 4));
            break;    

          case 'plaisance':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59529', 0, 4));
            break;    

          case 'porte de vanves':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59527', 0, 4));
            break;    

          case 'malakoff rue etienne dolet':
          //case 'malakoff':  
          //case 'rue etienne dolet':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59538', 0, 4));
            break;    

          case 'chatillon montrouge':
          //case '':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59614', 0, 4));
            break;    
            
          default:
            reject (false);

        }
    }
  })
}

exports.stopSwitch14 = function stopSwitch (event) {
  return new Promise ( (resolve, reject) => {
    var senderID = event.sender.id;
    var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("messageText error");
    var multiStop = {};  
    ///////////////////////////////
    //Message Switch Cases
    //////////////////////////////  

    //switch statement full
    if (messageText) {
        // If we receive a text message, check to see if it matches a keyword
        switch (messageText) {

          case 'gare de lyon':
          case 'gare lyon':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8768600', 0, 4));
            break;    

          case 'cour saint emilion':
          case 'cour st emilion':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59411', 0, 4));
            break;    

          case 'bibliotheque francois mitterand':
          case 'francois mitterand':
          case 'bibliotheque francois':  
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8732832', 0, 4));
            break;    

          case 'olympiades':
            resolve( utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59552', 0, 4));
            break; 
            
          default:
            reject (false);

        }
    }
  })
}