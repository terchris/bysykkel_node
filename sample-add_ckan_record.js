
var CKAN = require('ckan')
var myAPIkey = "abcxyz-your-api-key-here";
var resource_id = "3ae312b4-0e9b-4542-92b7-cf017b586f0c";
var myCKANhost = "http://urbalurba.no";



var client = new CKAN.Client(myCKANhost, myAPIkey);




var myRecord = [
    {
      'recordID': 1003,
      'name': 'MORE  UPDATE',
      'value': 100,
      'latitude': 59.91562,
      'longitude': 10.762248,
      'myTrueFalse': true,
      'myJsonField': {"age": "43", "city": "Bergen"},
      'timeStamp': '2018-03-14T05:51:36',
      'myText': 'Hello world record id=1003'      
    },
    {
        'recordID': 1000,
        'name': 'THE first record  UPDATE',
        'value': 100,
        'latitude': 59.91562,
        'longitude': 10.762248,
        'myTrueFalse': true,
        'myJsonField': {"age": "43", "city": "Bergen"},
        'timeStamp': '2018-03-14T05:51:36',
        'myText': 'Hello world record id=1003'      
      },
];




  client.action('datastore_upsert', {
              resource_id:  resource_id,
              records: myRecord,
              method: 'upsert',
              force: 'True'
          },
          function(err, result) {
            if (err) {
                console.log("datastore_upsert Not successfull:", JSON.stringify(err));
            }
            else { //we got something. Lets see what it is
        
                if (result.success){ //We got a sucessfull response
                    console.log("datastore_upsert:", JSON.stringify(result));
                } else { //we got a nonsucessful response. handle it here
                    console.log("datastore_upsert Not successfull:", JSON.stringify(result));
        
                }
            }
          });
                  

