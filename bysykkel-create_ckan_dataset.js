var CKAN = require('ckan')
var myAPIkey = "abcxyz-your-api-key-here";
// You see your API key by clicking on your username http://urbalurba.no/user

var myCKANhost = "http://urbalurba.no";
var package_id = "tilgjengelige-bysykler"; //In my case http://urbalurba.no/dataset/apitest


var client = new CKAN.Client(myCKANhost, myAPIkey);


var recordFieldDefinition = [
    {'id': 'stationID', 'type': 'numeric'},
    {'id': 'name', 'type': 'text'},
    {'id': 'where', 'type': 'text'},
    {'id': 'latitude', 'type': 'numeric'},
    {'id': 'longitude', 'type': 'numeric'},
    {'id': 'locksOnStation', 'type': 'numeric'},
    {'id': 'availableBikes', 'type': 'numeric'},
    {'id': 'availableLocks', 'type': 'numeric'},
    {'id': 'timeStamp', 'type': 'timestamp'}
];



var resource = {
    'package_id': package_id,
    'name': 'Automatisk oppdatert oversikt over ledige bysykler'
};

client.action('datastore_create', {
    resource:  resource,
    fields: recordFieldDefinition,
    primary_key: 'stationID'
}, 
function(err, result) {
    if (err) {
        console.log("datastore_create Not successfull:", JSON.stringify(err));
    }
    else { //we got something. Lets see what it is

        if (result.success){ //We got a sucessfull response
            var resource_id = result.result.resource_id; // we need the resource_id to add data to the created dataset
            console.log("datastore_create New resource_id is:", resource_id);
            console.log("datastore_create:", JSON.stringify(result));
        } else { //we got a nonsucessful response. handle it here
            console.log("datastore_create Not successfull:", JSON.stringify(result));

        }
    }
  });

