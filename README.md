# bysykkel_node

Code that reads data from the oslo bysykkel api (https://developer.oslobysykkel.no/api )and stores it in urbalurba (a ckan.org system)

If this is your first test on how to write a node (javascript) program that access a CKAN system. Then you have come to the right place.

I assume that you know programming, but noting about node, javascript and so on.


## Init
npm install request request-promise

## Help source
I followed this simple tutorial to write a node program https://codeburst.io/build-a-simple-weather-app-with-node-js-in-just-16-lines-of-code-32261690901d

And this setup on how to set up debugging of node in vscode
https://code.visualstudio.com/docs/editor/debugging

And this on request-promise
https://medium.com/adobe-io/how-to-combine-rest-api-calls-with-javascript-promises-in-node-js-or-openwhisk-d96cbc10f299

More ways to get the data
https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d

## gitignore

https://github.com/github/gitignore/blob/master/Node.gitignore


## CKAN API links
Command line examples
https://gist.github.com/mheadd/a9bb37a51972cbff8ae0

CKAN js module
https://www.npmjs.com/package/ckan and https://github.com/okfn/ckan.js


## CKAN realtime
http://alexandrainst.github.io/ckanext-realtime/tutorial.html

## CKAN API to add and update data in a dataset

Insert data into the CKAN Datastore
~$ curl -X POST http://www.civicdata.com/api/3/action/datastore_create \
-H "Authorization: <API-KEY>" \
-d '{"resource_id": "86a702f4-2d3a-4ee9-b375-26bc2800cba5", "fields": [ {"id": "a"}, {"id": "b"} ], "records": [ { "a": 1, "b": "XYZ"}, {"a": 2, "b": "ZZZ"} ], "primary_key": ["a"], "force": "True"}'

Update data in the CKAN Datastore
~$ curl -X POST http://www.civicdata.com/api/3/action/datastore_upsert \
-H "Authorization: <API-KEY>" \
-d '{"resource_id": "86a702f4-2d3a-4ee9-b375-26bc2800cba5", "method": "upsert", "records": [ { "a": 1, "b": "XYZXYZXYZ"}, {"a": 2, "b": "ZZZZZZZZZ"} ],"force": "True"}'




## CKAN update stuff
Update a record in a CKAN dataset using API
Hi
I'm writing a program that reads status on locks on a city bike system.
I read two datasets from the city bike system. Stations and available bikes on the stations.

I join the datasets so that I have a dataset like this:
stationID, name, availBikes, timeStamp

Now I want to store the dataset in CKAN. 

I was thinking about doing it this way.
1. Read the dataset from CKAN
2. Find the stationID's that has changed 
3. For each changed stationID => update CKAN dataset

I know how to do 1 and 2. But not 3.
Is there a way to update one record in a dataset?
