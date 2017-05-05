"use strict";

const utils = require('../lib/utils.js');

/*HASH TABLE - a dictionary/hash map data structure for storing key/value pairs. Finding
an entry in a hash table takes O(1) constant time(same for 10 as 1 billion items). Whereas 
finding an item via binary search takes time proportional to the logarithm of
the item in  the list O(logn). Finding an item in a regular old list takes time proportional to
the length of the list O(n). Very slow. Hash Tables = very fast  */

var makeHashTable = function(max) {

    var storage = [],
        hashTableMethods = {

            /*****HASH METHODS*****/
            //Create a method that converts any key such as 'alex', 'best hotels', 'google' etc.. and
            //converts it into a 'seemingly' random number. This number will be our hash key. It's not 
            //really random since it will always be the same for any particular key. Sort of like an encrypted
            //version of our hash key that we will later decrypt when we need to retrieve the desired key. Note 
            //that the number output by this function cannot be any larger than the maximum value of our hash table. 
            //See max value we set above.
            createHashIndex: function(key) {
                var hash = 0;
                for (var i = 0; i < key.length; i++) {
                    hash = (hash << 5) - hash + key.charCodeAt(i);
                    hash = hash >>> 0; //convert to 32bit unsigned integer
                }
                return Math.abs(hash % max);
            },

            //The insert method will call the CreateHashIndex to encrypt our insertion key and insert its value at
            //this specified index in our storage array (any index from 0 to max)
            insert: function(key, value) {
                if (key === undefined || value === undefined || key.length === 0 || value.length === 0)
                    throw ('Insertion of undefined not possible')
                else {
                    var hashIndex = this.createHashIndex(key);
                    storage[hashIndex] = value;
                }
                return this;
            },
            ///The retrieve function will call the CreateHashIndex again, this time to decrypt our key(in a way). Since it knows
            //the exact index of retrieval in our storage array, we are able to bypass the need to search through the array, resulting
            //in an almost instantaneous O(1) constant time retrieval of any key and value in our hash. 
            retrieve: function(key) {
                var hashIndex = this.createHashIndex(key);
                return storage[hashIndex];
            },

        };

    return hashTableMethods;
};

//SAMPLE DICTIONARY OF VALUES TO INSERT INTO THE HASH
var allStops = {
    //example: ailurophile: 'a cat-lover',
    
    'la defense': ['fr-idf', '%3AOIF%3A100110001%3A1OIF439','%3AOIF%3ASA%3A8738221', 0, 4],
    
};

//create an instance of our createHashTable, and set the max to 10000
var hashTable = makeHashTable(10000);

//now insert our dictionary keys and values into our hash table
for (var key in allStops) {
    hashTable.insert(key, allStops[key]);
}

//now look up definitions in our hash table;
/*for (var key in myDictionary) {
    console.log(hashTable.retrieve(key));
}*/

//to use on bots.js with Promise below ...
exports.hashFindResponse = function hashFindResponse (stop) {
  return hashTable.retrieve(stop);
}

//testing hashtable.js - this goes in Bot.js in recievedMessage event
  var eventResponse = Promise.resolve(hash.hashFindResponse(event.message.text));
  eventResponse
    .then(hashResponse => {
      hashResponse.splice(0,0,senderID);
      return utils.searchStop.apply(this,hashResponse); // <-- promisified
    })
    .then(searchStopResp => {
      utils.sendTextMessage(searchStopResp.senderID,searchStopResp.text);
    })
    .catch(err => {
      console.log(err)
    })