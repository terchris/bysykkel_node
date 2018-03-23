
var CKAN = require('ckan')
var myAPIkey = "abcxyz-your-api-key-here";
var resource_id = "3ae312b4-0e9b-4542-92b7-cf017b586f0c";
var myCKANhost = "http://urbalurba.no";



var client = new CKAN.Client(myCKANhost, myAPIkey);

/****
 * 
 * Reading all records in a dataset (table)
 */
  
client.action('datastore_search', { resource_id: resource_id }, function(err, result) {
    console.log(err);
    //console.log(result);
    console.log("We can read all record in a dataset:", JSON.stringify(result));
  })


