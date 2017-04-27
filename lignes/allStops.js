const utils = require('../lib/utils.js');
const bot = require('../bot.js');

exports.switchAllStops = function switchAllStops (event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
    
  //event = message vars
  if (event.message) {
    var message = event.message;
    var messageAttachments = message.attachments;
    var senderCoordinates = messageAttachments ? messageAttachments[0].payload.coordinates : false;
  } else if (event.postback) {
    var postback = event.postback ? event.postback.payload : false;
  }
    
  //Incoming message here - de-diacritic...ing? and removing "." + "-"
  var multiStop = {};  
  
  console.log("This is the event parameter: ", event)
  
  ///////////////////////////////
  //Message Switch Cases
  //////////////////////////////  

  //switch statement full =>
  //if (receivedMessage DOES NOT contain attachments ...)
  if (!messageAttachments || postback) {
    //set messageText accordingly and PURGE - is this a postback or a direct message?
    var messageText = postback ? utils.cleanseText(postback) : utils.cleanseText(message.text);
    // Switch case for all Paris Metro Stops
    switch (messageText) {

    ////////////////////////////////////////
    // Request User Location
    ///////////////////////////////////////    
      case 'autour de moi':
      case 'nearest stop':
      case 'arret proche':
        utils.shareLocation(senderID, messageText);
        break;

    /////////////////////////////////////////////////////////
    // User requests more times
    ////////////////////////////////////////////////////////    
      case 'plus':
      case 'more times':
      case 'more':  
      case 'plus d\'horaires':  
        utils.moreTimes(senderID, messageText/*, addVariableToIdentifyForMultipleStopsHere*/);
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
        //utils.multiutils.searchStop(multiStop);
        multiStop.stopInfo.forEach(utils.multiSearchStop);
        break;

      case 'reuilly diderot':
      case 'diderot':
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
        break;  

      case 'franklin roosevelt':
      //case 'diderot':
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A8OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
        break;

      case 'palais royal musee du louvre':
      case 'musee du louvre':
      case 'palais royal':  
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
        break;  

      case 'chatelet':
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M11
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M14
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        break;

      case 'champs elysees clemenceau':
      case 'champs elysees':
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59592', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439' , '%3AOIF%3ASA%3a59592', 0, 4);
        break;   

      case 'barbes rochechouart':
      case 'rochechouart':
      case 'barbes':
        //M2
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59632', 0, 4);
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3A59632', 0, 4);
        break;  

      case 'pigalle':
        //M2
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59420', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59420', 0, 4);
        break;

      case 'pere lachaise':
      case 'lachaise':
        //M2
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59584', 0, 4);
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59584', 0, 4);
        break;  

      case 'opera':
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        break;

      case 'saint lazare':
      case 'st lazare':
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M14
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        break;  

      case 'havre caumartin':
      case 'caumartin':  
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59442', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59442', 0, 4);
        break;

      case 'reaumur sebastopol':
      case 'sebastopol': 
      case 'reaumur':
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59586', 0, 4);
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59586', 0, 4);
        break;

      case 'arts et metiers':
      case 'arts metiers':
      case 'temple':  
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59588', 0, 4);
        //M11
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59588', 0, 4);
        break;  

      case 'republique':
      case 'repu':  
        //M3
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M11
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        break;

      case 'raspail':
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59251', 0, 4);
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59251', 0, 4);
        break;

      case 'marcadet poissonniers':
      case 'marcadet':  
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59252', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59252', 0, 4);
        break;

      case 'gare du nord':
      case 'gare nord':  
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
        break;

      case 'gare de l\'est':
      case 'gare est':
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
        break;  

      case 'strasbourg saint denis':
      case 'strasbourg st denis':
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        break;

      case 'montparnasse bienvenue':
      case 'montparnasse':
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        break;    

      case 'odeon':
      //case '':  
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59263', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59263', 0, 4);
        break;  

      case 'denfert rochereau':
      //case '':  
        //M4
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
        break;

      case 'gare d\'austerlitz':
      case 'austerlitz':  
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
        break;

      case 'stalingrad':
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59279', 0, 4);
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59279', 0, 4);
        break;

      case 'place d\'italie':
      //case '':
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        break;  

      case 'oberkampf':
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59338', 0, 4);
        //M11
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59338', 0, 4);
        break;

      case 'bastille':
        //M5
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59238', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59238', 0, 4);
        break;

      case 'motte picquet grenelle':
      case 'la motte picquet':
      case 'grenelle picquet':  
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        break;  

      case 'trocadero':
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59617', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59617', 0, 4);
        break;

      case 'bercy':
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
        //M14
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
        break;

      case 'daumesnil':
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59561', 0, 4);
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59561', 0, 4);
        break;

      case 'chaussee d\'antin la fayette':
      case 'chaussee d\'antin':
      case 'la fayette':  
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59568', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59568', 0, 4);
        break;  

      case 'pyramides':
      //case '':
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        //M14
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        break;

      case 'jussieu':
      //case '':  
        //M7
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59300', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59300', 0, 4);
        break;

      case 'invalides':
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
        break;    

      case 'richelieu drouot':
      case 'drouot':  
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59463', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59463', 0, 4);
        break; 

      case 'concorde':
      //case '': 
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59235', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59235', 0, 4);
        break;    

      case 'madeleine':
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        //M14
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        break;    

      case 'grands boulevards':
      case 'grands boulevard':
      case 'grand boulevard':
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59464', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59464', 0, 4);

      case 'bonne nouvelle':
        //M8
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59475', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59475', 0, 4);  

      case 'michel ange molitor':
      case 'molitor':  
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59371', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59371', 0, 4);
        break; 

      case 'sevres babylone':
      case 'babylone':  
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59362', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59362', 0, 4);
        break;   

      case 'michel ange auteuil':
      //case '':  
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59360', 0, 4);
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59360', 0, 4);
        break;              

      case 'miromesnil':
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59494', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59494', 0, 4);
        break;    

      case 'duroc':
        //M10
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59349', 0, 4);
        //M13
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59349', 0, 4);
        break;    

    ///////////////////////////////////////////////////////
    // Ligne M1
    ///////////////////////////////////////////////////////    

      case 'la defense':
      case 'defense':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4);
        break;

      case 'esplanade de la defense':
      case 'esplanade':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4);
        break;

      case 'pont de neuilly':
      case 'neuilly':    
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4);
        break;

      case 'les sablons':
      //case 'defense':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4);
        break;

      case 'porte maillot':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4);
        break;

      case 'argentine':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4);
        break;

      case 'georges v':
      case 'georges 5':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4);
        break;

      case 'concorde':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4);
        break; 

      case 'tuileries':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4);
        break; 

      case 'louvre rivoli':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4);
        break; 

      case 'hotel de ville':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4);
        break; 

      case 'saint paul':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4);
        break; 

      case 'bastille':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4);
        break; 

      case 'gare de lyon':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4);
        break;

      case 'nation':
        //M1
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        //M2
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        //M9
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        break;

      case 'porte de vincennes':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4);
        break;

      case 'saint mande':
      case 'st mande':
      case 'stmande':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4);
        break;

      case 'berault':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4);
        break;

      case 'chateau de vincennes':
      case 'chateau de vincene':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4);
        break;  

    //////////////////////////////////////////////////
    // Ligne M2
    ///////////////////////////////////////////////////

      case 'porte dauphine':
      case 'dauphine':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59213', 0, 4);
        break;

      case 'victor hugo':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439', '%3AOIF%3ASA%3A59417', 0, 4);
        break;

      case 'ternes':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59416', 0, 4);
        break;          

      case 'courcelles':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59424', 0, 4);
        break;

      case 'monceau':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59422', 0, 4);
        break;

      case 'villiers':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59415', 0, 4);
        break;

      case 'rome':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59418', 0, 4);
        break;

      case 'place de clichy':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59421', 0, 4);
        break;

      case 'blanche':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59428', 0, 4);
        break;

      case 'anvers':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59426', 0, 4);
        break;

      case 'la chapelle':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59218', 0, 4);
        break;

      case 'stalingrad':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59279', 0, 4);
        break;

      case 'jaures':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59635', 0, 4);
        break;

      case 'colonel fabien':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59423', 0, 4);
        break;

      case 'belleville':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59406', 0, 4);
        break;

      case 'couronnes':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59429', 0, 4);
        break;

      case 'menilmontant':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59655', 0, 4);
        break;

      case 'phillipe auguste':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59419', 0, 4);
        break;

      case 'alexandre dumas':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59425', 0, 4);
        break;

      case 'avron':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59427', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M3
    ////////////////////////////////////////////////////////////
      case 'pont de levallois becon':
      case 'pont de levallois': 
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59589', 0, 4);
        break;

      case 'anatole france':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59447', 0, 4);
        break;

      case 'louise michel':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59446', 0, 4);
        break;

      case 'porte de champerret':
      //case :  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59436', 0, 4);
        break;

      case 'pereire':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59219', 0, 4);
        break;

      case 'wagram':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59439', 0, 4);
        break;

      case 'malesherbes':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59441', 0, 4);
        break;

      case 'villiers':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59415', 0, 4);
        break;

      case 'europe':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59443', 0, 4);
        break;

      case 'quatre septembre':
      case '4 septembre':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59437', 0, 4);
        break;

      case 'bourse':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59444', 0, 4);
        break;

      case 'sentier':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59440', 0, 4);
        break;

      case 'parmentier':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59434', 0, 4);
        break;  

      case 'rue saint maur':
      case 'rue st maur':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59670', 0, 4);
        break;  

      case 'gambetta':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59325', 0, 4);
        break;  

      case 'porte de bagnolet':
      case 'bagnolet':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59435', 0, 4);
        break;  

      case 'gallieni':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59448', 0, 4);
        break;  

    /////////////////////////////////////////////////////////////
    // Ligne M4
    ////////////////////////////////////////////////////////////

      case 'porte de clignancourt':
      case 'clignancourt':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59258', 0, 4);
        break;

      case 'simplon':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59622', 0, 4);
        break;

      case 'chateau rouge':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59629', 0, 4);
        break;

      case 'chateau d\'eau':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59630', 0, 4);
        break;

      case 'etienne marcel':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59261', 0, 4);
        break;

      case 'les halles':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59208', 0, 4);
        break;

      case 'chatelet':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59566', 0, 4);
        break;  

      case 'saint michel':
      case 'st michel':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8754731', 0, 4);
        break;  

      case 'saint germain des pres':
      case 'st germain des pres':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59623', 0, 4);
        break;  

      case 'saint sulpice':
      case 'st sulpice':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59257', 0, 4);
        break;  

      case 'saint placide':
      case 'st placide':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59256', 0, 4);
        break;  

      case 'vavin':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59254', 0, 4);
        break;

      case 'mouton duvernet':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59260', 0, 4);
        break;

      case 'alesia':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59631', 0, 4);
        break;

      case 'porte d\'orleans':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59624', 0, 4);
        break;

      case 'mairie de montrouge':
      case 'montrouge':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59776', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M5
    ////////////////////////////////////////////////////////////

      case 'bobigny pablo picasso':
      case 'bobigny picasso':
      case 'bobigny pablo':
      case 'pablo picasso':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59342', 0, 4);
        break;

      case 'bobigny pantin raymon queneau':
      case 'raymon queneau':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59343', 0, 4);
        break;

      case 'eglise de pantin':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59344', 0, 4);
        break;

      case 'hoche':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59345', 0, 4);
        break;

      case 'porte de pantin':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59551', 0, 4);
        break;

      case 'ourcq':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59337', 0, 4);
        break;

      case 'laumiere':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59636', 0, 4);
        break;

      case 'jaures':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59635', 0, 4);
        break;

      case 'jacque bonsergent':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59340', 0, 4);
        break;

      case 'richard lenoir':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59336', 0, 4);
        break;

      case 'breguet sabin':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59637', 0, 4);
        break;

      case 'quai de la rapee':
      case 'quai rapee':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59633', 0, 4);
        break;

      case 'gare d\'austerlitz':
      case 'austerlitz':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8754700', 0, 4);
        break;

      case 'saint marcel':
      case 'st marcel':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59335', 0, 4);
        break;  

      case 'campo formio':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59339', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M6
    ////////////////////////////////////////////////////////////

      case 'kleber':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59650', 0, 4);
        break;

      case 'boissiere':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59652', 0, 4);
        break;

      case 'passy':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59451', 0, 4);
        break;

      case 'bir-hakeim':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59205', 0, 4);
        break;

      case 'dupleix':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59455', 0, 4);
        break;

      case 'cambronne':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59459', 0, 4);
        break;

      case 'sevres lecourbe':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59648', 0, 4);
        break;

      case 'pasteur':
      //case '':
        //M6
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59452', 0, 4);
        //M12
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59452', 0, 4);
        break;

      case 'edgar quinet':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59456', 0, 4);
        break;

      case 'saint jacques':
      case 'st jacques':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59449', 0, 4);
        break;

      case 'glaciere':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59651', 0, 4);
        break;

      case 'corvisart':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59458', 0, 4);
        break;

      case 'nationale':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59454', 0, 4);
        break;

      case 'chevaleret':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59457', 0, 4);
        break;

      case 'quai de la gare':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59450', 0, 4);
        break;

      case 'dugommier':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59461', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M7
    ////////////////////////////////////////////////////////////    

      case 'la courneuve 8 mai 1945':
      case 'la courneuve':  
      case '8 mai 1945':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59320', 0, 4);
        break;   

      case 'fort d\'aubervilliers':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59316', 0, 4);
        break;

      case 'aubervilliers pantin 4 chemins':
      case 'aubervilliers pantin':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59318', 0, 4);
        break;

      case 'porte de la villette':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59288', 0, 4);
        break;

      case 'corentin cariou':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59302', 0, 4);
        break;

      case 'crimee':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59570', 0, 4);
        break;

      case 'riquet':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59285', 0, 4);
        break;

      case 'louis blanc':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59296', 0, 4);
        break;

      case 'chateau landon':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59572', 0, 4);
        break;

      case 'poissonniere':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59574', 0, 4);
        break;

      case 'cadet':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59304', 0, 4);
        break;

      case 'le peletier':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59292', 0, 4);
        break;

      case 'palais royal musee du louvre':
      case 'musee du louvre':  
      case 'palais royal':
      case 'louvre':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        break;

      case 'pont neuf':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59664', 0, 4);
        break;

      case 'pont marie':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59576', 0, 4);
        break;

      case 'sully moriand':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59281', 0, 4);
        break;

      case 'place monge':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59277', 0, 4);
        break;

      case 'censier daubenton':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59306', 0, 4);
        break;

      case 'les gobelins':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59294', 0, 4);
        break;

      case 'tolbiac':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59283', 0, 4);
        break;

      case 'maison blanche':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59298', 0, 4);
        break; 

      case 'porte d\'italie':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59666', 0, 4);
        break; 

      case 'porte de choisy':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59663', 0, 4);
        break; 

      case 'porte d\'ivry':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59287', 0, 4);
        break; 

      case 'pierre et marie curie':
      case 'marie curie':  
      case 'curie':   
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59556', 0, 4);
        break; 

      case 'mairie d\'ivry':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59322', 0, 4);
        break;

      case 'le kremlin bicetre':
      case 'le kremlin':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59578', 0, 4);
        break;

      case 'villejuif leo lagrange':
      case 'leo lagrange':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
        break;

      case 'paul vaillant couturier':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59579', 0, 4);
        break;  

      case 'villejuif louis aragon':
      case 'louis aragon':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
        break;  

    /////////////////////////////////////////////////////////////
    // Ligne M8
    ////////////////////////////////////////////////////////////

      case 'balard':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59477', 0, 4);
        break;    

      case 'lourmel':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59478', 0, 4);
        break;    

      case 'boucicaut':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59476', 0, 4);
        break;    

      case 'felix faure':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59560', 0, 4);
        break;    

      case 'commerce':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59474', 0, 4);
        break;    

      case 'ecoles militaire':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59470', 0, 4);
        break;    

      case 'la tour maubourg':
      case 'maubourg':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59658', 0, 4);
        break;    

      case 'filles du calvaire':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59472', 0, 4);
        break;    

      case 'saint sebastien froissart':
      case 'st sebastien froissart':  
      case 'sebastien froissart':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59558', 0, 4);
        break;    

      case 'chemin vert':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59473', 0, 4);
        break;    

      case 'ledru rollin':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59468', 0, 4);
        break;    

      case 'faidherbe chaligny':
      case 'faidherbe':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59471', 0, 4);
        break;    

      case 'montgallet':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59467', 0, 4);
        break;    

      case 'michel bizot':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59466', 0, 4);
        break;    

      case 'porte doree':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59559', 0, 4);
        break;    

      case 'porte de charenton':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59465', 0, 4);
        break;    

      case 'liberte':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59562', 0, 4);
        break;    

      case 'charenton ecoles':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59482', 0, 4);
        break;    

      case 'ecole veterinaire de maisons alfort':
      case 'ecole veterinaire':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59565', 0, 4);
        break;    

      case 'maisons alfort stade':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59484', 0, 4);
        break;    

      case 'maisons alfort les juilliottes':
      case 'les juilliottes':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59483', 0, 4);
        break;    

      case 'creteil l\'echat':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59563', 0, 4);
        break;    

      case 'creteil universite':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59564', 0, 4);
        break;    

      case 'creteil prefecture':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59204', 0, 4);
        break;    

      case 'creteil pointe du lac':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59686', 0, 4);
        break;    

    /////////////////////////////////////////////////////////////
    // Ligne M9
    ////////////////////////////////////////////////////////////

      case 'pont de sevres':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59621', 0, 4);
        break;    

      case 'billancourt':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59504', 0, 4);
        break;    

      case 'marcel sembat':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59505', 0, 4);
        break;    

      case 'porte de saint cloud':
      case 'porte st cloud':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59492', 0, 4);
        break;    

      case 'jasmin':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59495', 0, 4);
        break;    

      case 'ranelagh':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59493', 0, 4);
        break;    

      case 'la muette':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59207', 0, 4);
        break;    

      case 'rue de la pompe':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59485', 0, 4);
        break;    

      case 'iena':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59619', 0, 4);
        break;    

      case 'alma marceau':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59500', 0, 4);
        break;    

      case 'saint philippe du roule':
      case 'st philippe du roule':
      case 'philippe du roule':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59490', 0, 4);
        break;    

      case 'saint augustin':
      case 'st augustin':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59489', 0, 4);
        break;    

      case 'saint ambroise':
      case 'st ambroise':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59562', 0, 4);
        break;    

      case 'voltaire':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59616', 0, 4);
        break;    

      case 'charonne':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59499', 0, 4);
        break;    

      case 'rue des boulets':
      //case '':  
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59486', 0, 4);
        break;    

      case 'buzenval':
        utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59498', 0, 4);
      break;    

    case 'maraichers':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59501', 0, 4);
      break;    

    case 'porte de montreuil':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59491', 0, 4);
      break;    

    case 'robespierre':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59508', 0, 4);
      break;    

    case 'croix de chavaux':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59506', 0, 4);
      break;    

    case 'mairie de montreuil':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59507', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M10
  ////////////////////////////////////////////////////////////

    case 'boulogne pont de saint cloud':
    case 'boulogne pont de st cloud':
    case 'boulogne st cloud':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59400', 0, 4);
      break;    

    case 'boulogne jean jaures':
    case 'boulogne jaures':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59398', 0, 4);
      break;    

    case 'porte d\'auteuil':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59668', 0, 4);
      break;    

    case 'eglise d\'auteuil':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59667', 0, 4);
      break;    

    case 'chardon lagache':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59383', 0, 4);
      break;    

    case 'mirabeau':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59374', 0, 4);
      break;    

    case 'javel andre citroën':
    case 'andre citroën':  
    case 'javel':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59548', 0, 4);
      break;    

    case 'charles michels':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59386', 0, 4);
      break;    

    case 'avenue emile zola':
    case 'emile zola':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59389', 0, 4);
      break;    

    case 'segur':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59368', 0, 4);
      break;    

    case 'vaneau':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59365', 0, 4);
      break;    

    case 'mabillon':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59353', 0, 4);
      break;    

    case 'cluny la sorbonne':
    case 'la sorbonne':
    case 'cluny':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59377', 0, 4);
      break;    

    case 'maubert mutualite':
    case 'mutualite':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59357', 0, 4);
      break;    

    case 'cardinal lemoine':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59380', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M11
  ////////////////////////////////////////////////////////////

    case 'hotel de ville':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59590', 0, 4);
      break;    

    case 'rambuteau':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59403', 0, 4);
      break;    

    case 'goncourt':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59640', 0, 4);
      break;    

    case 'belleville':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59406', 0, 4);
      break;    

    case 'pyrenees':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59402', 0, 4);
      break;    

    case 'jourdain':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59405', 0, 4);
      break;    

    case 'place des fetes':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59638', 0, 4);
      break;    

    case 'telegraphe':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59404', 0, 4);
      break;    

    case 'porte des lilas':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59327', 0, 4);
      break;    

    case 'mairie des lilas':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59408', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M12
  ////////////////////////////////////////////////////////////

    case 'porte de la chapelle':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59513', 0, 4);
      break;    

    case 'marx dormoy':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59517', 0, 4);
      break;    

    case 'jules joffrin':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59518', 0, 4);
      break;    

    case 'lamarck caulaincourt':
    case 'caulaincourt':
    case 'lamarck':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59519', 0, 4);
      break;    

    case 'abbesses':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59521', 0, 4);
      break;    

    case 'saint georges':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59512', 0, 4);
      break;    

    case 'notre dame de lorette':
    case 'dame de lorette':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59515', 0, 4);
      break;    

    case 'trinite d\'estienne d\'orves':
    case 'trinite':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59600', 0, 4);
      break;    

    case 'assemblee nationale':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59603', 0, 4);
      break;    

    case 'solferino':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59599', 0, 4);
      break;    

    case 'rue du bac':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59511', 0, 4);
      break;    

    case 'rennes':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59510', 0, 4);
      break;    

    case 'notre dame des champs':
    case 'dame des champs':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59516', 0, 4);
      break;    

    case 'falguiere':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59602', 0, 4);
      break;    

    case 'volontaires':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59509', 0, 4);
      break;    

    case 'vaugirard':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59601', 0, 4);
      break;    

    case 'convention':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59520', 0, 4);
      break;    

    case 'porte de versailles':
    case 'versailles':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59514', 0, 4);
      break;    

    case 'corentin celton':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59523', 0, 4);
      break;    

    case 'mairie d\'issy':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59522', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M13
  ////////////////////////////////////////////////////////////

    case 'saint denis universite':
    case 'st denis universite':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59540', 0, 4);
      break;    

    case 'basilique st denis':
    case 'basilique de saint denis':
    case 'basilique saint denis':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59541', 0, 4);
      break;    

    case 'saint denis porte de paris':
    case 'st denis porte de paris':
    case 'porte de paris':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59542', 0, 4);
      break;    

    case 'carrefour pleyel':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59544', 0, 4);
      break;    

    case 'mairie de saint ouen':
    case 'mairie st ouen':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59545', 0, 4);
      break;    

    case 'garibaldi':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59543', 0, 4);
      break;    

    case 'porte de saint ouen':
    case 'porte st ouen':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59526', 0, 4);
      break;    

    case 'guy moquet':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59608', 0, 4);
      break;    

    case 'asnieres gennevilliers les courtilles':
    case 'asnieres gennevilliers':
    case 'asnieres':
    case 'les courtilles':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59582', 0, 4);
      break;    

    case 'les agnettes':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59597', 0, 4);
      break;    

    case 'gabriel peri':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59613', 0, 4);
      break;    

    case 'mairie de clichy':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59583', 0, 4);
      break;    

    case 'porte de clichy':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8711127', 0, 4);
      break;    

    case 'brochant':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59535', 0, 4);
      break;    

    case 'la fourche':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59533', 0, 4);
      break;    

    case 'place de clichy':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59421', 0, 4);
      break;    

    case 'liege':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59606', 0, 4);
      break;    

    case 'varenne':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59531', 0, 4);
      break;    

    case 'saint francois xavier':
    case 'st francois xavier':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59524', 0, 4);
      break;    

    case 'gaite':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59609', 0, 4);
      break;    

    case 'pernety':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59604', 0, 4);
      break;    

    case 'plaisance':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59529', 0, 4);
      break;    

    case 'porte de vanves':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59527', 0, 4);
      break;    

    case 'malakoff rue etienne dolet':
    //case 'malakoff':  
    //case 'rue etienne dolet':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59538', 0, 4);
      break;    

    case 'chatillon montrouge':
    //case '':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59614', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M14
  ////////////////////////////////////////////////////////////    

    case 'gare de lyon':
    case 'gare lyon':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8768600', 0, 4);
      break;    

    case 'cour saint emilion':
    case 'cour st emilion':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59411', 0, 4);
      break;    

    case 'bibliotheque francois mitterand':
    case 'francois mitterand':
    case 'bibliotheque francois':  
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8732832', 0, 4);
      break;    

    case 'olympiades':
      utils.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59552', 0, 4);
      break;    

    default:
      utils.sendTextMessage(senderID, 'Hmmm, aucun resultats. Re-essayer?');
  }
  } 
  //else if (it DOES have attachmeents AND coordinates ...)
  else if (messageAttachments && senderCoordinates) {
    //start Google Maps API search                          
    utils.fullGoogleSearch(senderCoordinates.lat + ',' + senderCoordinates.long, null, senderID);
  }
}