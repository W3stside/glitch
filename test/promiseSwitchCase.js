"use strict";

const utils = require('../lib/utils.js');
const stopQ = require('../lib/searchStop.js');

///////////////////////////
// SWITCH CASES
//////////////////////////
var promiseSwitchCases = {
  eDataSetter: function (event) {
    this.senderID = event.sender.id;
    this.messageText = event.message.text;
    this.cleanText = utils.cleanseText(event.message.text);
    this.timeOfMessage = event.timestamp;
    this.messageId = event.message.mid;
    
    Object.defineProperty(this, 'eDataSetter',{
          enumerable: false
    });
  },
  
  switchCaseLignes: {
    //Promise Segmented Switch Case ... aka pSegSC
    pSegSC1: function pSegSC1 (event) {

      return new Promise ( (resolve, reject) => {
        var senderID = event.sender.id;
        var messageText = event.message.text !== undefined ? utils.cleanseText(event.message.text) : new Error ("cleansing error");
        var multiStop = {};  
        ///////////////////////////////
        //Message Switch Cases
        //////////////////////////////  

        if (messageText) {
            // If we receive a text message, check to see if it matches a keyword
            switch (messageText) {

              ///////////////////////////////////////////////////////
              // Ligne M1
              ///////////////////////////////////////////////////////    

              case 'la defense':
              case 'defense':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4));
                break;

              case 'esplanade de la defense':
              case 'esplanade':  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4));
                break;

              case 'pont de neuilly':
              case 'neuilly':    
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4));
                break;

              case 'les sablons':
              //case 'defense':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4));
                break;

              case 'porte maillot':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4));
                break;

              case 'argentine':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4));
                break;

              case 'georges v':
              case 'georges 5':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4));
                break;

              case 'concorde':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4));
                break; 

              case 'tuileries':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4));
                break; 

              case 'louvre rivoli':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4));
                break; 

              case 'hotel de ville':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4));
                break; 

              case 'saint paul':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4));
                break; 

              case 'bastille':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4));
                break; 

              case 'gare de lyon':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4));
                break;

              case 'nation':
                //M1
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
                //M2
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
                //M9
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4));
                break;

              case 'porte de vincennes':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4));
                break;

              case 'saint mande':
              case 'st mande':
              case 'stmande':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4));
                break;

              case 'berault':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4));
                break;

              case 'chateau de vincennes':
              case 'chateau de vincene':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4));
                break;

              default:
                resolve (false);

            }
        }
        reject('error');
      })
    },

    pSegSC2: function pSegSC2 (event) {
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
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59213', 0, 4));
                break;

              case 'victor hugo':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439', '%3AOIF%3ASA%3A59417', 0, 4));
                break;

              case 'ternes':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59416', 0, 4));
                break;          

              case 'courcelles':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59424', 0, 4));
                break;

              case 'monceau':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59422', 0, 4));
                break;

              case 'villiers':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59415', 0, 4));
                break;

              case 'rome':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59418', 0, 4));
                break;

              case 'place de clichy':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59421', 0, 4));
                break;

              case 'blanche':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59428', 0, 4));
                break;

              case 'anvers':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59426', 0, 4));
                break;

              case 'la chapelle':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59218', 0, 4));
                break;

              case 'stalingrad':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59279', 0, 4));
                break;

              case 'jaures':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59635', 0, 4));
                break;

              case 'colonel fabien':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59423', 0, 4));
                break;

              case 'belleville':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59406', 0, 4));
                break;

              case 'couronnes':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59429', 0, 4));
                break;

              case 'menilmontant':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59655', 0, 4));
                break;

              case 'phillipe auguste':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59419', 0, 4));
                break;

              case 'alexandre dumas':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59425', 0, 4));
                break;

              case 'avron':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59427', 0, 4));
                break;

              default:
                resolve (false);

            }
        }
            reject('error');
      })
    },

    pSegSC3: function pSegSC3 (event) {
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
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59589', 0, 4));
                break;

              case 'anatole france':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59447', 0, 4));
                break;

              case 'louise michel':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59446', 0, 4));
                break;

              case 'porte de champerret':
              //case :  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59436', 0, 4));
                break;

              case 'pereire':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59219', 0, 4));
                break;

              case 'wagram':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59439', 0, 4));
                break;

              case 'malesherbes':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59441', 0, 4));
                break;

              case 'villiers':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59415', 0, 4));
                break;

              case 'europe':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59443', 0, 4));
                break;

              case 'quatre septembre':
              case '4 septembre':  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59437', 0, 4));
                break;

              case 'bourse':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59444', 0, 4));
                break;

              case 'sentier':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59440', 0, 4));
                break;

              case 'parmentier':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59434', 0, 4));
                break;  

              case 'rue saint maur':
              case 'rue st maur':  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59670', 0, 4));
                break;  

              case 'gambetta':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59325', 0, 4));
                break;  

              case 'porte de bagnolet':
              case 'bagnolet':  
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59435', 0, 4));
                break;  

              case 'gallieni':
                resolve(stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59448', 0, 4));
                break; 

              default:
                resolve (false);

            }
        }
            reject('error');

      })
    },

    pSegSC4: function pSegSC4 (event) {
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
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59258', 0, 4));
              break;

            case 'simplon':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59622', 0, 4));
              break;

            case 'chateau rouge':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59629', 0, 4));
              break;

            case 'chateau d\'eau':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59630', 0, 4));
              break;

            case 'etienne marcel':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59261', 0, 4));
              break;

            case 'les halles':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59208', 0, 4));
              break;

            case 'chatelet':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59566', 0, 4));
              break;  

            case 'saint michel':
            case 'st michel':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8754731', 0, 4));
              break;  

            case 'saint germain des pres':
            case 'st germain des pres':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59623', 0, 4));
              break;  

            case 'saint sulpice':
            case 'st sulpice':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59257', 0, 4));
              break;  

            case 'saint placide':
            case 'st placide':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59256', 0, 4));
              break;  

            case 'vavin':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59254', 0, 4));
              break;

            case 'mouton duvernet':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59260', 0, 4));
              break;

            case 'alesia':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59631', 0, 4));
              break;

            case 'porte d\'orleans':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59624', 0, 4));
              break;

            case 'mairie de montrouge':
            case 'montrouge':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59776', 0, 4));
              break;

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC5: function pSegSC5 (event) {
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
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59342', 0, 4));
                break;

              case 'bobigny pantin raymon queneau':
              case 'raymon queneau':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59343', 0, 4));
                break;

              case 'eglise de pantin':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59344', 0, 4));
                break;

              case 'hoche':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59345', 0, 4));
                break;

              case 'porte de pantin':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59551', 0, 4));
                break;

              case 'ourcq':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59337', 0, 4));
                break;

              case 'laumiere':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59636', 0, 4));
                break;

              case 'jaures':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59635', 0, 4));
                break;

              case 'jacque bonsergent':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59340', 0, 4));
                break;

              case 'richard lenoir':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59336', 0, 4));
                break;

              case 'breguet sabin':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59637', 0, 4));
                break;

              case 'quai de la rapee':
              case 'quai rapee':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59633', 0, 4));
                break;

              case 'gare d\'austerlitz':
              case 'austerlitz':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8754700', 0, 4));
                break;

              case 'saint marcel':
              case 'st marcel':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59335', 0, 4));
                break;  

              case 'campo formio':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59339', 0, 4));
                break;

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC6: function pSegSC6 (event) {
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
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59650', 0, 4));
            break;

          case 'boissiere':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59652', 0, 4));
            break;

          case 'passy':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59451', 0, 4));
            break;

          case 'bir-hakeim':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59205', 0, 4));
            break;

          case 'dupleix':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59455', 0, 4));
            break;

          case 'cambronne':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59459', 0, 4));
            break;

          case 'sevres lecourbe':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59648', 0, 4));
            break;

          case 'pasteur':
          //case '':
            //M6
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59452', 0, 4));
            //M12
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59452', 0, 4));
            break;

          case 'edgar quinet':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59456', 0, 4));
            break;

          case 'saint jacques':
          case 'st jacques':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59449', 0, 4));
            break;

          case 'glaciere':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59651', 0, 4));
            break;

          case 'corvisart':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59458', 0, 4));
            break;

          case 'nationale':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59454', 0, 4));
            break;

          case 'chevaleret':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59457', 0, 4));
            break;

          case 'quai de la gare':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59450', 0, 4));
            break;

          case 'dugommier':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59461', 0, 4));
            break;

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC7: function pSegSC7 (event) {
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
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59320', 0, 4));
            break;   

          case 'fort d\'aubervilliers':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59316', 0, 4));
            break;

          case 'aubervilliers pantin 4 chemins':
          case 'aubervilliers pantin':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59318', 0, 4));
            break;

          case 'porte de la villette':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59288', 0, 4));
            break;

          case 'corentin cariou':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59302', 0, 4));
            break;

          case 'crimee':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59570', 0, 4));
            break;

          case 'riquet':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59285', 0, 4));
            break;

          case 'louis blanc':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59296', 0, 4));
            break;

          case 'chateau landon':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59572', 0, 4));
            break;

          case 'poissonniere':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59574', 0, 4));
            break;

          case 'cadet':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59304', 0, 4));
            break;

          case 'le peletier':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59292', 0, 4));
            break;

          case 'palais royal musee du louvre':
          case 'musee du louvre':  
          case 'palais royal':
          case 'louvre':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4));
            break;

          case 'pont neuf':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59664', 0, 4));
            break;

          case 'pont marie':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59576', 0, 4));
            break;

          case 'sully moriand':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59281', 0, 4));
            break;

          case 'place monge':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59277', 0, 4));
            break;

          case 'censier daubenton':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59306', 0, 4));
            break;

          case 'les gobelins':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59294', 0, 4));
            break;

          case 'tolbiac':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59283', 0, 4));
            break;

          case 'maison blanche':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59298', 0, 4));
            break; 

          case 'porte d\'italie':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59666', 0, 4));
            break; 

          case 'porte de choisy':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59663', 0, 4));
            break; 

          case 'porte d\'ivry':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59287', 0, 4));
            break; 

          case 'pierre et marie curie':
          case 'marie curie':  
          case 'curie':   
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59556', 0, 4));
            break; 

          case 'mairie d\'ivry':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59322', 0, 4));
            break;

          case 'le kremlin bicetre':
          case 'le kremlin':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59578', 0, 4));
            break;

          case 'villejuif leo lagrange':
          case 'leo lagrange':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4));
            break;

          case 'paul vaillant couturier':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59579', 0, 4));
            break;  

          case 'villejuif louis aragon':
          case 'louis aragon':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4));
            break; 

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC8: function pSegSC8 (event) {
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
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59477', 0, 4));
            break;    

          case 'lourmel':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59478', 0, 4));
            break;    

          case 'boucicaut':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59476', 0, 4));
            break;    

          case 'felix faure':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59560', 0, 4));
            break;    

          case 'commerce':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59474', 0, 4));
            break;    

          case 'ecoles militaire':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59470', 0, 4));
            break;    

          case 'la tour maubourg':
          case 'maubourg':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59658', 0, 4));
            break;    

          case 'filles du calvaire':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59472', 0, 4));
            break;    

          case 'saint sebastien froissart':
          case 'st sebastien froissart':  
          case 'sebastien froissart':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59558', 0, 4));
            break;    

          case 'chemin vert':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59473', 0, 4));
            break;    

          case 'ledru rollin':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59468', 0, 4));
            break;    

          case 'faidherbe chaligny':
          case 'faidherbe':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59471', 0, 4));
            break;    

          case 'montgallet':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59467', 0, 4));
            break;    

          case 'michel bizot':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59466', 0, 4));
            break;    

          case 'porte doree':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59559', 0, 4));
            break;    

          case 'porte de charenton':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59465', 0, 4));
            break;    

          case 'liberte':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59562', 0, 4));
            break;    

          case 'charenton ecoles':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59482', 0, 4));
            break;    

          case 'ecole veterinaire de maisons alfort':
          case 'ecole veterinaire':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59565', 0, 4));
            break;    

          case 'maisons alfort stade':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59484', 0, 4));
            break;    

          case 'maisons alfort les juilliottes':
          case 'les juilliottes':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59483', 0, 4));
            break;    

          case 'creteil l\'echat':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59563', 0, 4));
            break;    

          case 'creteil universite':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59564', 0, 4));
            break;    

          case 'creteil prefecture':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59204', 0, 4));
            break;    

          case 'creteil pointe du lac':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59686', 0, 4));
            break; 

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC9: function pSegSC9 (event) {
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
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59621', 0, 4));
            break;    

          case 'billancourt':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59504', 0, 4));
            break;    

          case 'marcel sembat':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59505', 0, 4));
            break;    

          case 'porte de saint cloud':
          case 'porte st cloud':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59492', 0, 4));
            break;    

          case 'jasmin':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59495', 0, 4));
            break;    

          case 'ranelagh':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59493', 0, 4));
            break;    

          case 'la muette':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59207', 0, 4));
            break;    

          case 'rue de la pompe':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59485', 0, 4));
            break;    

          case 'iena':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59619', 0, 4));
            break;    

          case 'alma marceau':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59500', 0, 4));
            break;    

          case 'saint philippe du roule':
          case 'st philippe du roule':
          case 'philippe du roule':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59490', 0, 4));
            break;    

          case 'saint augustin':
          case 'st augustin':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59489', 0, 4));
            break;    

          case 'saint ambroise':
          case 'st ambroise':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59562', 0, 4));
            break;    

          case 'voltaire':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59616', 0, 4));
            break;    

          case 'charonne':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59499', 0, 4));
            break;    

          case 'rue des boulets':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59486', 0, 4));
            break;    

          case 'buzenval':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59498', 0, 4));
            break;    

          case 'maraichers':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59501', 0, 4));
            break;    

          case 'porte de montreuil':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59491', 0, 4));
            break;    

          case 'robespierre':
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59508', 0, 4));
            break;    

          case 'croix de chavaux':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59506', 0, 4));
            break;    

          case 'mairie de montreuil':
          //case '':  
            resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59507', 0, 4));
            break; 

          default:
            resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC10: function pSegSC10 (event) {
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
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59400', 0, 4));
              break;    

            case 'boulogne jean jaures':
            case 'boulogne jaures':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59398', 0, 4));
              break;    

            case 'porte d\'auteuil':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59668', 0, 4));
              break;    

            case 'eglise d\'auteuil':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59667', 0, 4));
              break;    

            case 'chardon lagache':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59383', 0, 4));
              break;    

            case 'mirabeau':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59374', 0, 4));
              break;    

            case 'javel andre citroën':
            case 'andre citroën':  
            case 'javel':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59548', 0, 4));
              break;    

            case 'charles michels':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59386', 0, 4));
              break;    

            case 'avenue emile zola':
            case 'emile zola':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59389', 0, 4));
              break;    

            case 'segur':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59368', 0, 4));
              break;    

            case 'vaneau':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59365', 0, 4));
              break;    

            case 'mabillon':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59353', 0, 4));
              break;    

            case 'cluny la sorbonne':
            case 'la sorbonne':
            case 'cluny':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59377', 0, 4));
              break;    

            case 'maubert mutualite':
            case 'mutualite':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59357', 0, 4));
              break;    

            case 'cardinal lemoine':
            //case '':  
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59380', 0, 4));
              break;   

            default:
              resolve (false);

            }
          }
        reject('failed');
      })
    },

    pSegSC11: function pSegSC11 (event) {
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
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59590', 0, 4));
              break;    

            case 'rambuteau':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59403', 0, 4));
              break;    

            case 'goncourt':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59640', 0, 4));
              break;    

            case 'belleville':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59406', 0, 4));
              break;    

            case 'pyrenees':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59402', 0, 4));
              break;    

            case 'jourdain':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59405', 0, 4));
              break;    

            case 'place des fetes':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59638', 0, 4));
              break;    

            case 'telegraphe':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59404', 0, 4));
              break;    

            case 'porte des lilas':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59327', 0, 4));
              break;    

            case 'mairie des lilas':
              resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59408', 0, 4));
              break;   

            default:
              resolve (false);
          }
        }
        reject('failed');
      })
    },

    pSegSC12: function pSegSC12 (event) {
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
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59513', 0, 4));
                break;    

              case 'marx dormoy':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59517', 0, 4));
                break;    

              case 'jules joffrin':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59518', 0, 4));
                break;    

              case 'lamarck caulaincourt':
              case 'caulaincourt':
              case 'lamarck':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59519', 0, 4));
                break;    

              case 'abbesses':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59521', 0, 4));
                break;    

              case 'saint georges':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59512', 0, 4));
                break;    

              case 'notre dame de lorette':
              case 'dame de lorette':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59515', 0, 4));
                break;    

              case 'trinite d\'estienne d\'orves':
              case 'trinite':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59600', 0, 4));
                break;    

              case 'assemblee nationale':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59603', 0, 4));
                break;    

              case 'solferino':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59599', 0, 4));
                break;    

              case 'rue du bac':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59511', 0, 4));
                break;    

              case 'rennes':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59510', 0, 4));
                break;    

              case 'notre dame des champs':
              case 'dame des champs':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59516', 0, 4));
                break;    

              case 'falguiere':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59602', 0, 4));
                break;    

              case 'volontaires':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59509', 0, 4));
                break;    

              case 'vaugirard':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59601', 0, 4));
                break;    

              case 'convention':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59520', 0, 4));
                break;    

              case 'porte de versailles':
              case 'versailles':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59514', 0, 4));
                break;    

              case 'corentin celton':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59523', 0, 4));
                break;    

              case 'mairie d\'issy':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59522', 0, 4));
                break; 

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC13: function pSegSC13 (event) {
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
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59540', 0, 4));
                break;    

              case 'basilique st denis':
              case 'basilique de saint denis':
              case 'basilique saint denis':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59541', 0, 4));
                break;    

              case 'saint denis porte de paris':
              case 'st denis porte de paris':
              case 'porte de paris':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59542', 0, 4));
                break;    

              case 'carrefour pleyel':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59544', 0, 4));
                break;    

              case 'mairie de saint ouen':
              case 'mairie st ouen':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59545', 0, 4));
                break;    

              case 'garibaldi':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59543', 0, 4));
                break;    

              case 'porte de saint ouen':
              case 'porte st ouen':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59526', 0, 4));
                break;    

              case 'guy moquet':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59608', 0, 4));
                break;    

              case 'asnieres gennevilliers les courtilles':
              case 'asnieres gennevilliers':
              case 'asnieres':
              case 'les courtilles':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59582', 0, 4));
                break;    

              case 'les agnettes':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59597', 0, 4));
                break;    

              case 'gabriel peri':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59613', 0, 4));
                break;    

              case 'mairie de clichy':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59583', 0, 4));
                break;    

              case 'porte de clichy':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8711127', 0, 4));
                break;    

              case 'brochant':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59535', 0, 4));
                break;    

              case 'la fourche':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59533', 0, 4));
                break;    

              case 'place de clichy':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59421', 0, 4));
                break;    

              case 'liege':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59606', 0, 4));
                break;    

              case 'varenne':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59531', 0, 4));
                break;    

              case 'saint francois xavier':
              case 'st francois xavier':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59524', 0, 4));
                break;    

              case 'gaite':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59609', 0, 4));
                break;    

              case 'pernety':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59604', 0, 4));
                break;    

              case 'plaisance':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59529', 0, 4));
                break;    

              case 'porte de vanves':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59527', 0, 4));
                break;    

              case 'malakoff rue etienne dolet':
              //case 'malakoff':  
              //case 'rue etienne dolet':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59538', 0, 4));
                break;    

              case 'chatillon montrouge':
              //case '':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59614', 0, 4));
                break;    

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    },

    pSegSC14: function pSegSC14 (event) {
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
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8768600', 0, 4));
                break;    

              case 'cour saint emilion':
              case 'cour st emilion':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59411', 0, 4));
                break;    

              case 'bibliotheque francois mitterand':
              case 'francois mitterand':
              case 'bibliotheque francois':  
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8732832', 0, 4));
                break;    

              case 'olympiades':
                resolve( stopQ.pSearchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59552', 0, 4));
                break; 

              default:
                resolve (false);

            }
        }
        reject('failed');
      })
    }
  }
    
}

module.exports = promiseSwitchCases;
