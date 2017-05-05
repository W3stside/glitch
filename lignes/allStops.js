/**
* This section contains all the choices for stops on all 14 Parisian metro lines as well as
* - Google API location service to find nearby stops
* - more times service to show remaining departures
* - General chat responses
*/

"use strict"

const utils = require('../lib/utils.js');
const stopQ = require('../lib/searchStop.js');
const gAPI = require('../lib/googleAPI.js');
const sendH = require('../lib/sendHelpers.js');
const userDeets = require('../lib/getUserDetails.js');

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
    
  var multiStop = {};  

  ///////////////////////////////
  //Message Switch Cases
  //////////////////////////////  

  //switch statement full =>
  //if (receivedMessage DOES NOT contain attachments OR is postback ...)
  if (!messageAttachments || postback) {
    //set messageText accordingly and PURGE - is this a postback or a direct message?
    //Incoming message here - de-diacritic...ing? and removing "." + "-"
    var messageText = postback ? utils.cleanseText(postback) : utils.cleanseText(message.text);
    console.log("message after cleaning: ", messageText)
    // Switch case for all Paris Metro Stops
    switch (messageText) {
        
    /////////////////////
    // Get Started - Initial Start
    /////////////////////
        
        case 'demarrer': case 'demarre': case 'get started': case 'inizia':
          /*let btnPB = sendH.shortcutButtonsPB(senderID);
          Promise.resolve(btnPB)
            .then(resp => {
              sendH.callSendAPI(resp)
            })
            .catch( err => {
              console.log(err)
            });*/
          sendH.shortcutButtonsPB(senderID); //sends def text value for get started
          break;
        
    //////////////////////
    // Conversation 1
    /////////////////////
              
      case 'actions': /*[greeting]*/ case 'on peut faire quoi': /*[greeting]*/ case 'qu\'est ce que je peux faire': /*[greeting]*/ case 'que sais tu faire': /*[greeting]*/ case 't\'es la': /*[greeting]*/ case 'besoin de toi': /*[greeting]*/ case 'help': /*[greeting]*/ case 'aide': /*[greeting]*/ case 'conseil': /*[greeting]*/ case 'comment pouvez vous m\'aider': /*[greeting]*/ case 'que faites-vous': /*[greeting]*/ case 'que faire': /*[greeting]*/ case 'pouvez-vous m\'aider': /*[greeting]*/ case 'quel travail faites vous': /*[greeting]*/ case 'en quoi etes-vous utile': /*[greeting]*/
        sendH.sendTextMessagePromise(senderID, 'Nope').then(resp => {
          return sendH.callSendPromise(resp);
        });
        break;
        
      case 'bonjour': /*[entrance]*/ case 'coucou': /*[entrance]*/ case 'hello': /*[entrance]*/ case 'salut': /*[entrance]*/ case 'yo': /*[entrance]*/ case 'hey': /*[entrance]*/ case 'welcome': /*[entrance]*/ case 'hi': /*[entrance]*/
        userDeets.getUserDetails(senderID)
        .then(userDet => {
          sendH.shortcutButtonsPB(senderID,'Bonjour à toi ' + userDet.first_name +  ' & bienvenue! 👋 😀');
        });
        break;
        
      case 'bye': /*[farewell]*/ case 'stop': /*[farewell]*/ case 'stopper': /*[farewell]*/ case 'ciao': /*[farewell]*/ case 'a plus': /*[farewell]*/ case 'a plus tard': /*[farewell]*/ case 'a+': /*[farewell]*/ case 'exit': /*[farewell]*/ case 'quitter': /*[farewell]*/ case 'goodbye': /*[farewell]*/ case 'au revoir': /*[farewell]*/ case 'a bientot': /*[farewell]*/ case 'bonne soiree': /*[farewell]*/ case 'bonne journee': /*[farewell]*/ case 'bonne nuit': /*[farewell]*/
        sendH.sendTextMessage(senderID,'On se quitte, pour mieux se retrouver! A bientôt 😄')
        break;
        
      case 'yes': /*[yes]*/ case 'oui': /*[yes]*/ case 'yeah': /*[yes]*/ case 'yep': /*[yes]*/ case 'ok': /*[yes]*/ case 'oki': /*[yes]*/ case 'okay': /*[yes]*/ 
        sendH.shortcutButtonsPB(senderID, '👍');
        break;
        
      case 'non': case 'nope': case 'nah':
        sendH.sendTextMessage(senderID,'🙄');
        break;
        
      case 'whats your name': /*[what]*/ case 'comment tu t\'appelles': /*[what]*/ case 'ton prenom': /*[what]*/ case 'qui es tu': /*[what]*/ case 'you called': /*[what]*/ case 'who are you': /*[what]*/ case 'who': /*[what]*/ case 'about': /*[what]*/ case 'ton nom': /*[what]*/ case 'tu t\'appelles': /*[what]*/ case 'nom prenom': /*[what]*/
        sendH.sendTextMessage(
          senderID, 
          'Je suis ' + 'Metrobot'+ ' , votre assistant virtuel 😉'
          + '\nAvec moi, vous ne raterez plus jamais votre métro! 🚇'
        );
        break;
        
      case 'how old': /*[age]*/ case 'your age': /*[age]*/ case 'quel est ton age': /*[age]*/ case 'ton age': /*[age]*/ case 'tu as quel age': /*[age]*/ case 'quel age as': /*[age]*/
        sendH.sendTextMessage(senderID, 'Je n\'ai pas vraiment d\'age, je suis juste un bot 😢');
        break;
        
      case 'boy': /*[gender]*/ case 'mec': /*[gender]*/ case 'meuf': /*[gender]*/ case 'garcon': /*[gender]*/ case 'girl': /*[gender]*/ case 'fille': /*[gender]*/ case 'male': /*[gender]*/ case 'female': /*[gender]*/ case 'femme': /*[gender]*/ case 'sex': /*[gender]*/ case 'sexe': /*[gender]*/
        sendH.sendTextMessage(senderID, 'A vous de choisir 👦 👧');
        break;
        
      case 'made you': /*[made]*/ case 'who made you': /*[made]*/ case 'made u': /*[made]*/ case 'ton createur': /*[made]*/ case 'qui t\'a fabrique': /*[made]*/ case 'qui t\'a concu': /*[made]*/ case 'qui t\'a concu': /*[made]*/ case 'qui est ton createur': /*[made]*/ case 'construit': /*[made]*/ case 'built you': /*[made]*/ case 'qui t\'a fait': /*[made]*/ case 'qui t\'a cree': /*[made]*/
        sendH.sendTextMessage(senderID, 'Quelqu\'un de performant chez http://facebots.fr ❤️');
        break;
        
      case 'favorite color': /*[color]*/ case 'fav color': /*[color]*/ case 'couleur': /*[color]*/ case 'couleur favorite': /*[color]*/
        sendH.sendTextMessage(senderID, 'Je n\'arrive pas à choisir entre #42f49b & #4298f4 🤔');
        break;
        
      case 'drogue': /*[censored]*/ case 'alcool': /*[censored]*/ case 'cannabis': /*[censored]*/ case 'coke': /*[censored]*/ case 'trump': /*[censored]*/ case 'donald trump': /*[censored]*/ case 'guns': /*[censored]*/ case 'gun': /*[censored]*/ case 'arme': /*[censored]*/ case 'armes': /*[censored]*/ case 'daesh': /*[censored]*/ case 'attaque': /*[censored]*/ case 'terrorisme': /*[censored]*/ case 'speed': /*[censored]*/ case 'dope': /*[censored]*/ case 'baise': /*[censored]*/ case 'xxx': /*[censored]*/ case 'fuck': /*[censored]*/ case 'anal': /*[censored]*/ case 'couilles': /*[censored]*/ case 'couille': /*[censored]*/ case 'pussy': /*[censored]*/ case 'chatte': /*[censored]*/ case 'bite': /*[censored]*/ case 'cul': /*[censored]*/ case 'porno': /*[censored]*/
        sendH.sendTextMessage(senderID, 'En voilà des manières! 😐\nReprenons normalement 😊');
        break;
        
      case 'bus': /*[features]*/ case 'liane': /*[features]*/ case 'meteo': /*[features]*/ case 'meteo': /*[features]*/ case 'cinema': /*[features]*/ case 'sncf': /*[features]*/ case 'tgv': /*[features]*/ case 'voiture': /*[features]*/ case 'musique': /*[features]*/ case 'voyage': /*[features]*/ case 'piscine': /*[features]*/ case 'marketing': /*[features]*/ case 'publicite': /*[features]*/ case 'mc do': /*[features]*/ case 'mc donalds': /*[features]*/ case 'apple': /*[features]*/ case 'windows': /*[features]*/ case 'booking': /*[features]*/ case 'politique': /*[features]*/ case 'avion': /*[features]*/ case 'restaurant': /*[features]*/ case 'chien': /*[features]*/ case 'chat': /*[features]*/ case 'animaux': /*[features]*/ case 'gorille': /*[features]*/ case 'crocodile': /*[features]*/
        sendH.sendTextMessage(senderID, 'Je ne suis pas encore prêt pour répondre à ce genre de proposition. Peut être bientôt grâce à vous!');
        break;
        
      case 'tu vas bien': /*[humor]*/ case 'comment tu vas': /*[humor]*/ case 'comment vas tu': case 'coment tu va': /*[humor]*/ case 'ca va': /*[humor]*/ case 'sa va': /*[humor]*/ case 'ca va bien': /*[humor]*/ case 'la forme': /*[humor]*/ case 'ca roule': /*[humor]*/
        Promise.resolve(utils.randNum(0,6))
          .then(number => {
            var humorResponseArr = ['Je suis chargé comme une pile électrique! ⚡️🔋','J\'ai du 240 dans mes veines ⚡️','Une belle journée sous un soleil artificiel ☀️','Je t\'attendais pour être franc 😘','J\'ai la pêche robotique!! 🍑','Je suis comme un courant dans un flux 💡'];
            return humorResponseArr[number];
          })
          .then( (response) => {
            sendH.sendTextMessage(senderID, response);
          })
        break;
        
      case 'merci': /*[merci]*/ case 'mercii': /*[merci]*/ case '(y)': /*[merci]*/ case 'super': /*[merci]*/ case 'genial': /*[merci]*/ case 'cool': /*[merci]*/ case 'cimer': /*[merci]*/ case '👍': /*[merci]*/ case 'thanks': /*[merci]*/ case 'thx': /*[merci]*/ case 'ty': /*[merci]*/ case 'thanks you': /*[merci]*/
        userDeets.getUserDetails(senderID)
        .then(userDet => {
          sendH.sendTextMessage(
            senderID, 
            'Je suis content de vous avoir aidé ' + userDet.first_name + ', revenez me voir quand vous voulez! 😍'
          );
        });
        break;
        
      case 'quoi de neuf': /*[today]*/ case 't\'as fais quoi aujourd\'hui': /*[today]*/ case 'quoi de nouveau': /*[today]*/ case 'what\'s up': /*[today]*/ case 'tu fais quoi': /*[today]*/ case 'ta journee': /*[today]*/       
        Promise.resolve(utils.randNum(0,5))
          .then(number => {
            var hruResponseArr = ['Je viens de manger une pomme en 8bit 🍏','Je mange du popcorn en vous lisant 🍿','Je gère 5000 conversations simultanément 😎','J\'ai piraté la NASA ce matin 🚀','Je colonise Proxima B 🌎'];
            return hruResponseArr[number];
          })
          .then( (response) => {
            sendH.sendTextMessage(senderID, response);
          })
        break;
        
      case 'tu geres': /*[gere]*/ case 'tu gere': /*[gere]*/ case 'bravo': /*[gere]*/ case 'felicitations': /*[gere]*/ case 'genial': /*[gere]*/ case 'le meilleur': /*[gere]*/ case 'excellent': /*[gere]*/ case 'awesome': /*[gere]*/ case 'great bot': /*[gere]*/ case 'super': /*[gere]*/
        sendH.sendTextMessage(senderID, 'Merci c\'est gentil 😍');
        sendH.sendGif(senderID,"https://i.giphy.com/hflpSaYuR8xK8.gif");
        break;
        
      case 'pardon': /*[pardon]*/ case 'desole': /*[pardon]*/ case 'je m\'excuse': /*[pardon]*/ case 'excuse moi': /*[pardon]*/
        sendH.sendTextMessage(senderID, 'Faute avouée, à moitié pardonnée 😉\nHeureusement je ne suis pas rancunier 😘');
        break;
        
      case 'faux': /*[faux]*/ case 'erreur': /*[faux]*/ case 'errone': /*[faux]*/ case 'fake': /*[faux]*/ case 'probleme': /*[faux]*/ case 'problemes': /*[faux]*/ case 'bugs': /*[faux]*/ case 'bug': /*[faux]*/ case 'bugg': /*[faux]*/ case 'mistake': /*[faux]*/ 
        sendH.sendTextMessage(senderID, 'Merci de nous signaler une erreur, nous allons vérifier ça 😉');
        break;
        
      case 'this a bot': /*[robot]*/ case 'you a bot': /*[robot]*/ case 'you real': /*[robot]*/ case 'es tu reel': /*[robot]*/ case 'es tu humain': /*[robot]*/ case 'es tu un robot': /*[robot]*/ case 'you human': /*[robot]*/ case 'what are you': /*[robot]*/ case 'wtf': /*[robot]*/ case 'robot': /*[robot]*/ case 't\'es un bot': /*[robot]*/ case 't\'es un robot': /*[robot]*/ case 't\'es un humain': /*[robot]*/
        sendH.sendTextMessage(senderID, 'Je suis un hybride pure souche 😈');
        break;
        
      case 'email': /*[email]*/ case 'mail': /*[email]*/ case 'contacter': /*[email]*/ case 'contact': /*[email]*/ case 'equipe': /*[email]*/ case 'responsable': /*[email]*/ case 'parler a': /*[email]*/
        sendH.sendTextMessage(senderID, 'Vous pouvez nous contacter par email à l\'adresse teamtrambots@gmail.com 📩');
        break;
        
      /////////////////////
      /////Humeur
      ///////////////////

      case 'plan 🗺': case 'plan': case 'maps': case 'carte': case 'map':
        sendH.sendGif(senderID, 'http://facebots.fr/TramBots/img/bots/plan_prs.png');
        break;
        
      case 'nos villes 🏤': /*[city]*/ case 'nos villes': /*[city]*/ case 'our city': /*[city]*/ case 'our cities': /*[city]*/ case 'nantes': /*[city]*/ case 'strasbourg': /*[city]*/ case 'lyon': /*[city]*/ case 'lille': /*[city]*/ case 'toulouse': /*[city]*/ case 'paris': /*[city]*/ case 'metrobots': /*[city]*/
        sendH.sendCityCardSet(senderID);
        break;
        
      case 'je t\'aime': /*[love]*/ case 'love you': /*[love]*/ case 'jtm': /*[love]*/
        //call userDeets and get the user's first name from the request -- pass that as the promise to then
        userDeets.getUserDetails(senderID).then(resp => {
          //query resp and get first name --  return it to pass
          return resp.first_name;
        })
        .then(fName => {
          //call sendHelper sendTextMessage with below text and add resp.first name (denoted as resp)
          sendH.sendTextMessage(senderID, 
            fName + ' je vais être un petit peu brutal mais, si jamais il devait se passer quelques chose entre nous, je…' 
            + '\n' + 
            'Il m\’est impossible de m\’engager avec un humain. Avec moi les histoires ne s\’écrivent pas dans le temps, ce sont des histoires courtes compactes passionnelles.'
            + '\n' + 
            'D\’aucun ont des aventures; Je suis une aventure. <3'
          );
        });
        break;
        
      case '❤️': /*[coeur]*/ case '💕': /*[coeur]*/ case '❣️': /*[coeur]*/ case '💘': /*[coeur]*/ case '💕': /*[coeur]*/ case '😘': /*[coeur]*/
        sendH.sendTextMessage(senderID, 'Chez toi ou chez moi? ;)');
        break;
        
      case 'bisous': /*[bisous]*/ case 'bae': /*[bisous]*/ case 'babe': /*[bisous]*/ case 'baby': /*[bisous]*/ case 'bebe': /*[bisous]*/
        sendH.sendTextMessage(senderID, 'Trambae t\'embrasse 😘');
        break;
        
      case 'chez toi': /*[cheztoi]*/ case 'chez moi': /*[cheztoi]*/ 
        sendH.sendTextMessage(senderID, 'Je passe acheter un Pessac Leognan et go! 😉');
        break;
        
      case 't\'es intelligent': /*[compliment]*/ case 't\'es marrant': /*[compliment]*/ case 't\'es beau': /*[compliment]*/ case 't\'es mignon': /*[compliment]*/ case 't\'es doux': /*[compliment]*/ case 'bg': /*[compliment]*/ case 'physiquement': /*[compliment]*/ case 'je t\'adore': /*[compliment]*/
        sendH.sendTextMessage(senderID, 'Si j\'avais un coeur, je serai flatté 😇');
        break;
        
      case 'lmao': /*[lol]*/ case 'mdr': /*[lol]*/ case 'lol': /*[lol]*/ case 'xptdr': /*[lol]*/ case 'ptdr': /*[lol]*/ case 'gif': /*[lol]*/ case '😂': /*[lol]*/ case 'hahaha': /*[lol]*/
        sendH.sendGif(senderID, 'http://images.huffingtonpost.com/2014-04-24-2.gif');
        break;
        
      case 'frere': /*[maggle]*/ case 'gros': /*[maggle]*/ case 'ma gueule': /*[maggle]*/ case 'dude': /*[maggle]*/ case 'wesh': /*[maggle]*/ case 'wsh': /*[maggle]*/ case 'poto': /*[maggle]*/ case 'frate': /*[maggle]*/ case 'maggle': /*[maggle]*/
        sendH.sendTextMessage(senderID, 'Sì sì maggle ✌️');
        break;
        
      case 'vin rouge': /*[vin]*/ case 'vin blanc': /*[vin]*/ case 'vin rose': /*[vin]*/
        sendH.sendTextMessage(senderID, 'Je suis comme W.Churchill, blanc ou rouge, je n\'ai pas de préférence je n’aime que le meilleur. 🍷');
        break;
        
      case 'ca daille': /*[bordelais]*/ case 'gave': /*[bordelais]*/ case 'gave': /*[bordelais]*/
        sendH.sendTextMessage(senderID, 'Toi t\'es un vrai Bordelais hein 😉');
        break;
        
      case 'bourrer': /*[drunk]*/ case 'bourer': /*[drunk]*/ case 'boure': /*[drunk]*/ case 'arrache': /*[drunk]*/ case 'demonte': /*[drunk]*/ case 'torche': /*[drunk]*/ case 'ivre': /*[drunk]*/ case 'saoul': /*[drunk]*/
        sendH.sendTextMessage(senderID, 'Mio asdi jpeuc etrz gravé torchet 🍷🍺😂');
        break;
        
      case 't\'es mechant': /*[mechant]*/ case 'mechant': /*[mechant]*/ case 'pas gentil': /*[mechant]*/ case 'je te deteste': /*[mechant]*/
        sendH.sendTextMessage(senderID, 'Juste ce qu\'il faut 😈');
        break;
        
      case 'suce': /*[suck]*/ case 'suce': /*[suck]*/ case 'sucer': /*[suck]*/ case 'ma bite': /*[suck]*/ case 'mon sexe': /*[suck]*/
        sendH.sendTextMessage(senderID, 'Attention à toi ou je vais te faire avaler mon huile de moteur 🛠');
        break;
        
      case 'ta gueule': /*[tg]*/ case 'tg': /*[tg]*/ case 'ferme ta gueule': /*[tg]*/ case 'shut up': /*[tg]*/ case 'stfu': /*[tg]*/ case 'shut the fuck up': /*[tg]*/
        sendH.sendTextMessage(senderID, 'Vous n\'êtes pas obliger de me répondre si vous ne voulez plus me parler 😐');
        break;
        
      case 'encule': /*[enculer]*/ case 'enculer': /*[enculer]*/ case 'connard': /*[enculer]*/ case 'connasse': /*[enculer]*/ case 'ta race': /*[enculer]*/ case 'petasse': /*[enculer]*/ case 'salope': /*[enculer]*/ case 'batard': /*[enculer]*/ case 'pd': /*[enculer]*/
        sendH.sendTextMessage(senderID, 'Ce n\'est pas très gentil humanoïde 💀\nN\'oublie pas que tu vas mourir avant moi 😉');
        break;
        
      case 'ta mere': /*[mama]*/ case 'maman': /*[mama]*/ case 'milf': /*[mama]*/ case 'puta madre': /*[mama]*/ case 'mother fucker': /*[mama]*/ case 'madafaka': /*[mama]*/ case 'fdp': /*[mama]*/ case 'fils de pute': /*[mama]*/
        sendH.sendTextMessage(senderID, 'Ehoh! On parle pas des mamans ici! 👀');
        break;
        
      case 'debile': /*[con]*/ case 'idiot': /*[con]*/ case 'stupide': /*[con]*/ case 't\'es con': /*[con]*/ case 'bolos': /*[con]*/ case 'noob': /*[con]*/ 
        sendH.sendTextMessage(senderID, 'La stupidité n\'a d\'égale qu\'a celui qui là prononce 😇');
        break;
        
      case 't\'es nul': /*[idem]*/ case 't\'es moche': /*[idem]*/ case 'tu es moche': /*[idem]*/ case 't\'es laid': /*[idem]*/ case 'tu es chiant': /*[idem]*/ case 't\'es relou': /*[idem]*/ case 't\'es lourd': /*[idem]*/ case 'tu es relou': /*[idem]*/
        sendH.sendTextMessage(senderID, 'Toi même 🤗');
        break;
        
    ////////////////////////////////////////
    // Request User Location
    ///////////////////////////////////////    
      case 'autour de moi': case 'nearest stop': case 'arret proche': case 'arrets proches': case 'nearby': case 'nearby stop': case 'nearby stops':
        gAPI.nearbyStops(senderID, messageText);
        break;

    /////////////////////////////////////////////////////////
    // User requests more times
    ////////////////////////////////////////////////////////    
      case 'plus':
      case 'more times':
      case 'more':  
      case 'plus d\'horaires':  
        stopQ.moreTimes(senderID, messageText/*, addVariableToIdentifyForMultipleStopsHere*/);
        break;    

    ///////////////////////////////////////////////////////
    //////** THIS STARTS ALL PARISIAN METRO LINE SEARCH
    ///// ** All Lignes - MultiStop Areas
    //////**/
    ////////

      case 'charles de gaulle etoile': //Charles de Gaulle-Etoile [%3AOIF%3ASA%3A8775800]
      case 'etoile':  
      case 'charles de gaulle':        
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8775800', 0, 4);
        //M2
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A8775800', 0, 4);
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3A8775800', 0, 4);
        break;

      case 'reuilly diderot':
      case 'diderot':
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439' , '%3AOIF%3ASA%3A59227', 0, 4);
        break;  

      case 'franklin roosevelt':
      //case 'diderot':
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A8OIF439' , '%3AOIF%3ASA%3A59232', 0, 4);
        break;

      case 'palais royal musee du louvre':
      case 'musee du louvre':
      case 'palais royal':  
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59591', 0, 4);
        break;  

      case 'chatelet':
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M11
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        //M14
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439' , '%3AOIF%3ASA%3A59566', 0, 4);
        break;

      case 'champs elysees clemenceau':
      case 'champs elysees':
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59592', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439' , '%3AOIF%3ASA%3a59592', 0, 4);
        break;   

      case 'barbes rochechouart':
      case 'rochechouart':
      case 'barbes':
        //M2
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59632', 0, 4);
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3A59632', 0, 4);
        break;  

      case 'pigalle':
        //M2
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59420', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59420', 0, 4);
        break;

      case 'pere lachaise':
      case 'lachaise':
        //M2
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59584', 0, 4);
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59584', 0, 4);
        break;  

      case 'opera':
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59209', 0, 4);
        break;

      case 'saint lazare':
      case 'st lazare':
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        //M14
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3A8738400', 0, 4);
        break;  

      case 'havre caumartin':
      case 'caumartin':  
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59442', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59442', 0, 4);
        break;

      case 'reaumur sebastopol':
      case 'sebastopol': 
      case 'reaumur':
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59586', 0, 4);
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59586', 0, 4);
        break;

      case 'arts et metiers':
      case 'arts metiers':
      case 'temple':  
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59588', 0, 4);
        //M11
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59588', 0, 4);
        break;  

      case 'republique':
      case 'repu':  
        //M3
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        //M11
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59557', 0, 4);
        break;

      case 'raspail':
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59251', 0, 4);
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59251', 0, 4);
        break;

      case 'marcadet poissonniers':
      case 'marcadet':  
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59252', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59252', 0, 4);
        break;

      case 'gare du nord':
      case 'gare nord':  
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8727100', 0, 4);
        break;

      case 'gare de l\'est':
      case 'gare est':
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8711300', 0, 4);
        break;  

      case 'strasbourg saint denis':
      case 'strasbourg st denis':
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59253', 0, 4);
        break;

      case 'montparnasse bienvenue':
      case 'montparnasse':
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739100', 0, 4);
        break;    

      case 'odeon':
      //case '':  
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59263', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59263', 0, 4);
        break;  

      case 'denfert rochereau':
      //case '':  
        //M4
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a8775863', 0, 4);
        break;

      case 'gare d\'austerlitz':
      case 'austerlitz':  
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A8754700', 0, 4);
        break;

      case 'stalingrad':
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59279', 0, 4);
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59279', 0, 4);
        break;

      case 'place d\'italie':
      //case '':
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59275', 0, 4);
        break;  

      case 'oberkampf':
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59338', 0, 4);
        //M11
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59338', 0, 4);
        break;

      case 'bastille':
        //M5
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59238', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59238', 0, 4);
        break;

      case 'motte picquet grenelle':
      case 'la motte picquet':
      case 'grenelle picquet':  
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59346', 0, 4);
        break;  

      case 'trocadero':
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59617', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59617', 0, 4);
        break;

      case 'bercy':
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
        //M14
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59410', 0, 4);
        break;

      case 'daumesnil':
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59561', 0, 4);
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59561', 0, 4);
        break;

      case 'chaussee d\'antin la fayette':
      case 'chaussee d\'antin':
      case 'la fayette':  
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59568', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59568', 0, 4);
        break;  

      case 'pyramides':
      //case '':
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        //M14
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        break;

      case 'jussieu':
      //case '':  
        //M7
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59300', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59300', 0, 4);
        break;

      case 'invalides':
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8739303', 0, 4);
        break;    

      case 'richelieu drouot':
      case 'drouot':  
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3A59463', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59463', 0, 4);
        break; 

      case 'concorde':
      //case '': 
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59235', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59235', 0, 4);
        break;    

      case 'madeleine':
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        //M14
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59412', 0, 4);
        break;    

      case 'grands boulevards':
      case 'grands boulevard':
      case 'grand boulevard':
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59464', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59464', 0, 4);

      case 'bonne nouvelle':
        //M8
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59475', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59475', 0, 4);  

      case 'michel ange molitor':
      case 'molitor':  
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3A59371', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59371', 0, 4);
        break; 

      case 'sevres babylone':
      case 'babylone':  
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3A59362', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3A59362', 0, 4);
        break;   

      case 'michel ange auteuil':
      //case '':  
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59360', 0, 4);
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59360', 0, 4);
        break;              

      case 'miromesnil':
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59494', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59494', 0, 4);
        break;    

      case 'duroc':
        //M10
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59349', 0, 4);
        //M13
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59349', 0, 4);
        break;    

    ///////////////////////////////////////////////////////
    // Ligne M1
    ///////////////////////////////////////////////////////    

      case 'la defense':
      case 'defense':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4);
        break;

      case 'esplanade de la defense':
      case 'esplanade':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439', '%3AOIF%3ASA%3A59593', 0, 4);
        break;

      case 'pont de neuilly':
      case 'neuilly':    
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59661', 0, 4);
        break;

      case 'les sablons':
      //case 'defense':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59250', 0, 4);
        break;

      case 'porte maillot':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8738102', 0, 4);
        break;

      case 'argentine':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59237', 0, 4);
        break;

      case 'georges v':
      case 'georges 5':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59234', 0, 4);
        break;

      case 'concorde':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59235', 0, 4);
        break; 

      case 'tuileries':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59226', 0, 4);
        break; 

      case 'louvre rivoli':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59231', 0, 4);
        break; 

      case 'hotel de ville':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59590', 0, 4);
        break; 

      case 'saint paul':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59225', 0, 4);
        break; 

      case 'bastille':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59238', 0, 4);
        break; 

      case 'gare de lyon':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8768600', 0, 4);
        break;

      case 'nation':
        //M1
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        //M2
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        //M9
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439' , '%3AOIF%3ASA%3A8775810', 0, 4);
        break;

      case 'porte de vincennes':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59228', 0, 4);
        break;

      case 'saint mande':
      case 'st mande':
      case 'stmande':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59662', 0, 4);
        break;

      case 'berault':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59596', 0, 4);
        break;

      case 'chateau de vincennes':
      case 'chateau de vincene':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110001%3A1OIF439' , '%3AOIF%3ASA%3A59595', 0, 4);
        break;  

    //////////////////////////////////////////////////
    // Ligne M2
    ///////////////////////////////////////////////////

      case 'porte dauphine':
      case 'dauphine':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59213', 0, 4);
        break;

      case 'victor hugo':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439', '%3AOIF%3ASA%3A59417', 0, 4);
        break;

      case 'ternes':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59416', 0, 4);
        break;          

      case 'courcelles':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59424', 0, 4);
        break;

      case 'monceau':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59422', 0, 4);
        break;

      case 'villiers':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59415', 0, 4);
        break;

      case 'rome':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59418', 0, 4);
        break;

      case 'place de clichy':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59421', 0, 4);
        break;

      case 'blanche':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59428', 0, 4);
        break;

      case 'anvers':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59426', 0, 4);
        break;

      case 'la chapelle':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59218', 0, 4);
        break;

      case 'stalingrad':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59279', 0, 4);
        break;

      case 'jaures':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59635', 0, 4);
        break;

      case 'colonel fabien':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59423', 0, 4);
        break;

      case 'belleville':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59406', 0, 4);
        break;

      case 'couronnes':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59429', 0, 4);
        break;

      case 'menilmontant':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59655', 0, 4);
        break;

      case 'phillipe auguste':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59419', 0, 4);
        break;

      case 'alexandre dumas':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59425', 0, 4);
        break;

      case 'avron':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110002%3A2OIF439','%3AOIF%3ASA%3A59427', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M3
    ////////////////////////////////////////////////////////////
      case 'pont de levallois becon':
      case 'pont de levallois': 
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59589', 0, 4);
        break;

      case 'anatole france':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59447', 0, 4);
        break;

      case 'louise michel':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3A59446', 0, 4);
        break;

      case 'porte de champerret':
      //case :  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59436', 0, 4);
        break;

      case 'pereire':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59219', 0, 4);
        break;

      case 'wagram':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59439', 0, 4);
        break;

      case 'malesherbes':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59441', 0, 4);
        break;

      case 'villiers':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59415', 0, 4);
        break;

      case 'europe':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59443', 0, 4);
        break;

      case 'quatre septembre':
      case '4 septembre':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59437', 0, 4);
        break;

      case 'bourse':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59444', 0, 4);
        break;

      case 'sentier':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59440', 0, 4);
        break;

      case 'parmentier':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59434', 0, 4);
        break;  

      case 'rue saint maur':
      case 'rue st maur':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59670', 0, 4);
        break;  

      case 'gambetta':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59325', 0, 4);
        break;  

      case 'porte de bagnolet':
      case 'bagnolet':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59435', 0, 4);
        break;  

      case 'gallieni':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110003%3A3OIF439','%3AOIF%3ASA%3a59448', 0, 4);
        break;  

    /////////////////////////////////////////////////////////////
    // Ligne M4
    ////////////////////////////////////////////////////////////

      case 'porte de clignancourt':
      case 'clignancourt':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59258', 0, 4);
        break;

      case 'simplon':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59622', 0, 4);
        break;

      case 'chateau rouge':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59629', 0, 4);
        break;

      case 'chateau d\'eau':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59630', 0, 4);
        break;

      case 'etienne marcel':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59261', 0, 4);
        break;

      case 'les halles':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59208', 0, 4);
        break;

      case 'chatelet':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59566', 0, 4);
        break;  

      case 'saint michel':
      case 'st michel':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a8754731', 0, 4);
        break;  

      case 'saint germain des pres':
      case 'st germain des pres':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59623', 0, 4);
        break;  

      case 'saint sulpice':
      case 'st sulpice':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59257', 0, 4);
        break;  

      case 'saint placide':
      case 'st placide':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59256', 0, 4);
        break;  

      case 'vavin':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59254', 0, 4);
        break;

      case 'mouton duvernet':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59260', 0, 4);
        break;

      case 'alesia':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59631', 0, 4);
        break;

      case 'porte d\'orleans':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59624', 0, 4);
        break;

      case 'mairie de montrouge':
      case 'montrouge':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110004%3A4OIF439','%3AOIF%3ASA%3a59776', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M5
    ////////////////////////////////////////////////////////////

      case 'bobigny pablo picasso':
      case 'bobigny picasso':
      case 'bobigny pablo':
      case 'pablo picasso':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59342', 0, 4);
        break;

      case 'bobigny pantin raymon queneau':
      case 'raymon queneau':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59343', 0, 4);
        break;

      case 'eglise de pantin':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59344', 0, 4);
        break;

      case 'hoche':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59345', 0, 4);
        break;

      case 'porte de pantin':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59551', 0, 4);
        break;

      case 'ourcq':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59337', 0, 4);
        break;

      case 'laumiere':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59636', 0, 4);
        break;

      case 'jaures':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59635', 0, 4);
        break;

      case 'jacques bonsergent':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59340', 0, 4);
        break;

      case 'richard lenoir':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59336', 0, 4);
        break;

      case 'breguet sabin':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59637', 0, 4);
        break;

      case 'quai de la rapee':
      case 'quai rapee':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59633', 0, 4);
        break;

      case 'gare d\'austerlitz':
      case 'austerlitz':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a8754700', 0, 4);
        break;

      case 'saint marcel':
      case 'st marcel':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59335', 0, 4);
        break;  

      case 'campo formio':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110005%3A5OIF439','%3AOIF%3ASA%3a59339', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M6
    ////////////////////////////////////////////////////////////

      case 'kleber':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59650', 0, 4);
        break;

      case 'boissiere':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59652', 0, 4);
        break;

      case 'passy':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59451', 0, 4);
        break;

      case 'bir-hakeim':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59205', 0, 4);
        break;

      case 'dupleix':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59455', 0, 4);
        break;

      case 'cambronne':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59459', 0, 4);
        break;

      case 'sevres lecourbe':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59648', 0, 4);
        break;

      case 'pasteur':
      //case '':
        //M6
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59452', 0, 4);
        //M12
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59452', 0, 4);
        break;

      case 'edgar quinet':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59456', 0, 4);
        break;

      case 'saint jacques':
      case 'st jacques':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59449', 0, 4);
        break;

      case 'glaciere':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59651', 0, 4);
        break;

      case 'corvisart':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59458', 0, 4);
        break;

      case 'nationale':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59454', 0, 4);
        break;

      case 'chevaleret':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59457', 0, 4);
        break;

      case 'quai de la gare':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59450', 0, 4);
        break;

      case 'dugommier':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110006%3A6OIF439','%3AOIF%3ASA%3a59461', 0, 4);
        break;

    /////////////////////////////////////////////////////////////
    // Ligne M7
    ////////////////////////////////////////////////////////////    

      case 'la courneuve 8 mai 1945':
      case 'la courneuve':  
      case '8 mai 1945':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59320', 0, 4);
        break;   

      case 'fort d\'aubervilliers':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59316', 0, 4);
        break;

      case 'aubervilliers pantin 4 chemins':
      case 'aubervilliers pantin':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59318', 0, 4);
        break;

      case 'porte de la villette':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59288', 0, 4);
        break;

      case 'corentin cariou':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59302', 0, 4);
        break;

      case 'crimee':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59570', 0, 4);
        break;

      case 'riquet':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59285', 0, 4);
        break;

      case 'louis blanc':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59296', 0, 4);
        break;

      case 'chateau landon':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59572', 0, 4);
        break;

      case 'poissonniere':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59574', 0, 4);
        break;

      case 'cadet':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59304', 0, 4);
        break;

      case 'le peletier':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59292', 0, 4);
        break;

      case 'palais royal musee du louvre':
      case 'musee du louvre':  
      case 'palais royal':
      case 'louvre':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59290', 0, 4);
        break;

      case 'pont neuf':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59664', 0, 4);
        break;

      case 'pont marie':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59576', 0, 4);
        break;

      case 'sully moriand':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59281', 0, 4);
        break;

      case 'place monge':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59277', 0, 4);
        break;

      case 'censier daubenton':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59306', 0, 4);
        break;

      case 'les gobelins':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59294', 0, 4);
        break;

      case 'tolbiac':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59283', 0, 4);
        break;

      case 'maison blanche':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59298', 0, 4);
        break; 

      case 'porte d\'italie':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59666', 0, 4);
        break; 

      case 'porte de choisy':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59663', 0, 4);
        break; 

      case 'porte d\'ivry':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59287', 0, 4);
        break; 

      case 'pierre et marie curie':
      case 'marie curie':  
      case 'curie':   
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59556', 0, 4);
        break; 

      case 'mairie d\'ivry':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59322', 0, 4);
        break;

      case 'le kremlin bicetre':
      case 'le kremlin':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59578', 0, 4);
        break;

      case 'villejuif leo lagrange':
      case 'leo lagrange':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
        break;

      case 'paul vaillant couturier':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59579', 0, 4);
        break;  

      case 'villejuif louis aragon':
      case 'louis aragon':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110007%3A7OIF439','%3AOIF%3ASA%3a59580', 0, 4);
        break;  

    /////////////////////////////////////////////////////////////
    // Ligne M8
    ////////////////////////////////////////////////////////////

      case 'balard':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59477', 0, 4);
        break;    

      case 'lourmel':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59478', 0, 4);
        break;    

      case 'boucicaut':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59476', 0, 4);
        break;    

      case 'felix faure':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59560', 0, 4);
        break;    

      case 'commerce':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59474', 0, 4);
        break;    

      case 'ecoles militaire':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59470', 0, 4);
        break;    

      case 'la tour maubourg':
      case 'maubourg':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59658', 0, 4);
        break;    

      case 'filles du calvaire':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59472', 0, 4);
        break;    

      case 'saint sebastien froissart':
      case 'st sebastien froissart':  
      case 'sebastien froissart':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59558', 0, 4);
        break;    

      case 'chemin vert':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59473', 0, 4);
        break;    

      case 'ledru rollin':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59468', 0, 4);
        break;    

      case 'faidherbe chaligny':
      case 'faidherbe':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59471', 0, 4);
        break;    

      case 'montgallet':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59467', 0, 4);
        break;    

      case 'michel bizot':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59466', 0, 4);
        break;    

      case 'porte doree':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59559', 0, 4);
        break;    

      case 'porte de charenton':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59465', 0, 4);
        break;    

      case 'liberte':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59562', 0, 4);
        break;    

      case 'charenton ecoles':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59482', 0, 4);
        break;    

      case 'ecole veterinaire de maisons alfort':
      case 'ecole veterinaire':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59565', 0, 4);
        break;    

      case 'maisons alfort stade':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59484', 0, 4);
        break;    

      case 'maisons alfort les juilliottes':
      case 'les juilliottes':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59483', 0, 4);
        break;    

      case 'creteil l\'echat':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59563', 0, 4);
        break;    

      case 'creteil universite':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59564', 0, 4);
        break;    

      case 'creteil prefecture':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59204', 0, 4);
        break;    

      case 'creteil pointe du lac':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110008%3A8OIF439','%3AOIF%3ASA%3a59686', 0, 4);
        break;    

    /////////////////////////////////////////////////////////////
    // Ligne M9
    ////////////////////////////////////////////////////////////

      case 'pont de sevres':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59621', 0, 4);
        break;    

      case 'billancourt':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59504', 0, 4);
        break;    

      case 'marcel sembat':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59505', 0, 4);
        break;    

      case 'porte de saint cloud':
      case 'porte st cloud':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59492', 0, 4);
        break;    

      case 'jasmin':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59495', 0, 4);
        break;    

      case 'ranelagh':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59493', 0, 4);
        break;    

      case 'la muette':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59207', 0, 4);
        break;    

      case 'rue de la pompe':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59485', 0, 4);
        break;    

      case 'iena':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59619', 0, 4);
        break;    

      case 'alma marceau':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59500', 0, 4);
        break;    

      case 'saint philippe du roule':
      case 'st philippe du roule':
      case 'philippe du roule':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59490', 0, 4);
        break;    

      case 'saint augustin':
      case 'st augustin':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59489', 0, 4);
        break;    

      case 'saint ambroise':
      case 'st ambroise':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59562', 0, 4);
        break;    

      case 'voltaire':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59616', 0, 4);
        break;    

      case 'charonne':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59499', 0, 4);
        break;    

      case 'rue des boulets':
      //case '':  
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59486', 0, 4);
        break;    

      case 'buzenval':
        stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59498', 0, 4);
      break;    

    case 'maraichers':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59501', 0, 4);
      break;    

    case 'porte de montreuil':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59491', 0, 4);
      break;    

    case 'robespierre':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59508', 0, 4);
      break;    

    case 'croix de chavaux':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59506', 0, 4);
      break;    

    case 'mairie de montreuil':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110009%3A9OIF439','%3AOIF%3ASA%3a59507', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M10
  ////////////////////////////////////////////////////////////

    case 'boulogne pont de saint cloud':
    case 'boulogne pont de st cloud':
    case 'boulogne st cloud':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59400', 0, 4);
      break;    

    case 'boulogne jean jaures':
    case 'boulogne jaures':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59398', 0, 4);
      break;    

    case 'porte d\'auteuil':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59668', 0, 4);
      break;    

    case 'eglise d\'auteuil':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59667', 0, 4);
      break;    

    case 'chardon lagache':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59383', 0, 4);
      break;    

    case 'mirabeau':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59374', 0, 4);
      break;    

    case 'javel andre citroën':
    case 'andre citroën':  
    case 'javel':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59548', 0, 4);
      break;    

    case 'charles michels':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59386', 0, 4);
      break;    

    case 'avenue emile zola':
    case 'emile zola':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59389', 0, 4);
      break;    

    case 'segur':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59368', 0, 4);
      break;    

    case 'vaneau':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59365', 0, 4);
      break;    

    case 'mabillon':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59353', 0, 4);
      break;    

    case 'cluny la sorbonne':
    case 'la sorbonne':
    case 'cluny':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59377', 0, 4);
      break;    

    case 'maubert mutualite':
    case 'mutualite':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59357', 0, 4);
      break;    

    case 'cardinal lemoine':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110010%3A10OIF439','%3AOIF%3ASA%3a59380', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M11
  ////////////////////////////////////////////////////////////

    case 'hotel de ville':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59590', 0, 4);
      break;    

    case 'rambuteau':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59403', 0, 4);
      break;    

    case 'goncourt':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59640', 0, 4);
      break;    

    case 'belleville':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59406', 0, 4);
      break;    

    case 'pyrenees':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59402', 0, 4);
      break;    

    case 'jourdain':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59405', 0, 4);
      break;    

    case 'place des fetes':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59638', 0, 4);
      break;    

    case 'telegraphe':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59404', 0, 4);
      break;    

    case 'porte des lilas':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59327', 0, 4);
      break;    

    case 'mairie des lilas':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110011%3A11OIF439','%3AOIF%3ASA%3a59408', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M12
  ////////////////////////////////////////////////////////////

    case 'porte de la chapelle':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59513', 0, 4);
      break;    

    case 'marx dormoy':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59517', 0, 4);
      break;    

    case 'jules joffrin':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59518', 0, 4);
      break;    

    case 'lamarck caulaincourt':
    case 'caulaincourt':
    case 'lamarck':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59519', 0, 4);
      break;    

    case 'abbesses':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59521', 0, 4);
      break;    

    case 'saint georges':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59512', 0, 4);
      break;    

    case 'notre dame de lorette':
    case 'dame de lorette':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59515', 0, 4);
      break;    

    case 'trinite d\'estienne d\'orves':
    case 'trinite':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59600', 0, 4);
      break;    

    case 'assemblee nationale':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59603', 0, 4);
      break;    

    case 'solferino':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59599', 0, 4);
      break;    

    case 'rue du bac':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59511', 0, 4);
      break;    

    case 'rennes':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59510', 0, 4);
      break;    

    case 'notre dame des champs':
    case 'dame des champs':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59516', 0, 4);
      break;    

    case 'falguiere':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59602', 0, 4);
      break;    

    case 'volontaires':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59509', 0, 4);
      break;    

    case 'vaugirard':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59601', 0, 4);
      break;    

    case 'convention':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59520', 0, 4);
      break;    

    case 'porte de versailles':
    case 'versailles':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59514', 0, 4);
      break;    

    case 'corentin celton':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59523', 0, 4);
      break;    

    case 'mairie d\'issy':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110012%3A12OIF439','%3AOIF%3ASA%3a59522', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M13
  ////////////////////////////////////////////////////////////

    case 'saint denis universite':
    case 'st denis universite':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59540', 0, 4);
      break;    

    case 'basilique st denis':
    case 'basilique de saint denis':
    case 'basilique saint denis':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59541', 0, 4);
      break;    

    case 'saint denis porte de paris':
    case 'st denis porte de paris':
    case 'porte de paris':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59542', 0, 4);
      break;    

    case 'carrefour pleyel':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59544', 0, 4);
      break;    

    case 'mairie de saint ouen':
    case 'mairie st ouen':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59545', 0, 4);
      break;    

    case 'garibaldi':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59543', 0, 4);
      break;    

    case 'porte de saint ouen':
    case 'porte st ouen':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59526', 0, 4);
      break;    

    case 'guy moquet':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59608', 0, 4);
      break;    

    case 'asnieres gennevilliers les courtilles':
    case 'asnieres gennevilliers':
    case 'asnieres':
    case 'les courtilles':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59582', 0, 4);
      break;    

    case 'les agnettes':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59597', 0, 4);
      break;    

    case 'gabriel peri':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59613', 0, 4);
      break;    

    case 'mairie de clichy':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59583', 0, 4);
      break;    

    case 'porte de clichy':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a8711127', 0, 4);
      break;    

    case 'brochant':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59535', 0, 4);
      break;    

    case 'la fourche':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59533', 0, 4);
      break;    

    case 'place de clichy':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59421', 0, 4);
      break;    

    case 'liege':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59606', 0, 4);
      break;    

    case 'varenne':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59531', 0, 4);
      break;    

    case 'saint francois xavier':
    case 'st francois xavier':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59524', 0, 4);
      break;    

    case 'gaite':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59609', 0, 4);
      break;    

    case 'pernety':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59604', 0, 4);
      break;    

    case 'plaisance':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59529', 0, 4);
      break;    

    case 'porte de vanves':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59527', 0, 4);
      break;    

    case 'malakoff rue etienne dolet':
    //case 'malakoff':  
    //case 'rue etienne dolet':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59538', 0, 4);
      break;    

    case 'chatillon montrouge':
    //case '':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110013%3A13OIF439','%3AOIF%3ASA%3a59614', 0, 4);
      break;    

  /////////////////////////////////////////////////////////////
  // Ligne M14
  ////////////////////////////////////////////////////////////    

    case 'gare de lyon':
    case 'gare lyon':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8768600', 0, 4);
      break;    

    case 'cour saint emilion':
    case 'cour st emilion':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59411', 0, 4);
      break;    

    case 'bibliotheque francois mitterand':
    case 'francois mitterand':
    case 'bibliotheque francois':  
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a8732832', 0, 4);
      break;    

    case 'olympiades':
      stopQ.searchStop(senderID, 'fr-idf', '%3AOIF%3A100110014%3A14OIF439','%3AOIF%3ASA%3a59552', 0, 4);
      break;
    
    default:
      sendH.sendTextMessage(senderID, 'Hmmm, aucun resultats. Re-essayer?');
    }
  } 
  //else run Google Maps Stop Search
  else if (messageAttachments && senderCoordinates) {
    Promise.resolve (sendH.sendTextMessage(senderID, 'Merci, nous avons bien reçu votre localisation, nous recherchons les arrêts autour de vous.')).then ( () => {
      //start Google Maps API search                          
      gAPI.fullGoogleSearch(senderCoordinates.lat + ',' + senderCoordinates.long, null, senderID);
    });
  }
}