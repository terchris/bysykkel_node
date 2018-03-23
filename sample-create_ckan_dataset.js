var CKAN = require('ckan')
var myAPIkey = "abcxyz-your-api-key-here";
// You see your API key by clicking on your username http://urbalurba.no/user

var myCKANhost = "http://urbalurba.no";
var package_id = "apitest"; //In my case http://urbalurba.no/dataset/apitest




/*****
 * Create a dataset. 
 * In order to do updates on a dataset it must be created with a unique key.
 * The code below is an example on hos to define a dataset and put one record into it.
 * 
 * The 'package_id': 'apitest', id is my case http://urbalurba.no/dataset/apitest
 * On a sucessfull run you will get a resource_id to the dataset. You will need it to update, delete, add records
 * 
 * Every time you run this a new dataset will be created.  
 * 
 * You can skipp the myRecord parameter so that you just create the dataset and dont add a record to it. 
 */


var recordFieldDefinition = [
    {'id': 'recordID', 'type': 'numeric'},
    {'id': 'name', 'type': 'text'},
    {'id': 'value', 'type': 'numeric'},
    {'id': 'latitude', 'type': 'numeric'},
    {'id': 'longitude', 'type': 'numeric'},
    {'id': 'myTrueFalse', 'type': 'bool'},
    {'id': 'myJsonField', 'type': 'json'},    
    {'id': 'timestamp', 'type': 'timestamp'},
    {
        'id': 'myText',
        'type': 'text',    
        'info': {
            'label': 'myTextLabel',
            'notes': 'You can set the label of the field'
        }
    }
];




var myRecord = [
    {
      'recordID': 999,
      'name': 'jsonupdate-now',
      'value': 100,
      'latitude': 59.91562,
      'longitude': 10.762248,
      'myTrueFalse': true,
      'myJsonField': {'age': '23', 'city': 'Oslo'},
      'timeStamp': '2018-03-14T05:51:36',
      'myText': 'Hello world'      
    }
];



var resource = {
    'package_id': 'apitest',
    'name': 'TerChris test dataset nr 1'
};

client.action('datastore_create', {
    resource:  resource,
    records: myRecord,
    fields: recordFieldDefinition,
    primary_key: 'recordID'
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

