let request = require('request');
const axios = require("axios");

let apiKey = '78fed72c6ee33a442b3d3060e095829a';
//let apiKey = '78fed72c6ee33a442b3d3060e095829a';

//var urlBysykkelStations = "http://localhost:5500/bysykkel_stations.json";
//var urlBysykkelBikesOnStations = "http://localhost:5500/bysykkel_bikes_on_stations.json";

 var urlBysykkelStations = "https://oslobysykkel.no/api/v1/stations";
 var urlBysykkelBikesOnStations = "https://oslobysykkel.no/api/v1/stations/availability";





const options = {
    headers: {
      'Client-Identifier': apiKey
    }
  };

  


function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        if (typeof x != 'undefined') {
            output.push(select(y, x)); // select only the columns you need
        } else {
            console.log("Item J:" + j + " Bikes on a non existing station  y:" + y.id);
        }
    }
    return output;
};


function CreateTableFromJSON(inputarray,divContainer) {


    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < inputarray.length; i++) {
        for (var key in inputarray[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < inputarray.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = inputarray[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}




//Get the stations
function getBysykkelStations() {
    return axios.get(urlBysykkelStations, options)
        //.then((response) => response.json())
        .then(function (response) {
            console.log(response);
            return(response.data);
          })
        .catch(function (error) {
            console.log(error);
          });
};

function getBysykkelBikesOnStations() {
    return axios.get(urlBysykkelBikesOnStations,options)
        //.then((response) => response.json())
        .then(function (response) {
            console.log(response);
            return(response.data);
          })
        .catch(function (error) {
            console.log(error);
          });
};


function getStationsAndAvailableBikes() {
    return axios.all([getBysykkelStations(), getBysykkelBikesOnStations()])
}



// When this Promise resolves, both values will be available.
getStationsAndAvailableBikes()
    .then(([stations, availBikes]) => {
        console.log("Got the data");
        var timeStamp = availBikes.updated_at;
        stationsArray = stations.stations;
        availBikesArray = availBikes.stations;

        var joined = join(stationsArray, availBikesArray, "id", "id", function (availBike, station) {
            return {
                stationID: station.id,
                name: station.title,
                where: station.subtitle,
                latitude: station.center.latitude,
                longitude: station.center.longitude,
                locksOnStation: station.number_of_locks,
                availableBikes: availBike.availability.bikes,
                availableLocks: availBike.availability.locks,
                timeStamp: timeStamp
            };
        });
        console.log("Now we have status on all stations");
        
        //console.log(JSON.stringify(joined));

        var fs = require('fs');

        fs.writeFile('joined.json', JSON.stringify(joined), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
        //var divContainer = document.getElementById("showTableDiv");
        //CreateTableFromJSON(joined, divContainer);

    })








/*
var myarray;
myarray =getBysykkelStations() ;
console.log(myarray);
*/
/*

// First get the stations
request(urlBysykkelStations,options, function (err, response, stations) {
    if(err){
      console.log('error:', error);
    } else {
      console.log('stations:', stations);
    }
  });

// Then get the bikes on the stations
request(urlBysykkelBikesOnStations,options, function (err, response, availBikes) {
    if(err){
      console.log('error:', error);
    } else {
      console.log('availBikes:', availBikes);
    }
  });
  
  console.log("Got the data");
  //var timeStamp = availBikes.updated_at;
  var timeStamp = "sometime";
  stationsArray = stations.stations;
  availBikesArray = availBikes.stations;

  var joined = join(stationsArray, availBikesArray, "id", "id", function (availBike, station) {
      return {
          id: station.id,
          name: station.title,
          where: station.subtitle,
          latitude: station.center.latitude,
          longitude: station.center.longitude,
          locksOnStation: station.number_of_locks,
          availableBikes: availBike.availability.bikes,
          availableLocks: availBike.availability.locks,
          timeStamp: timeStamp
      };
  });
  console.log("Now we have status on all stations");
  console.log(joined);
  */





  /**** Request testing 

 request(urlBysykkelStations, options, function (error, response, stationsArray) {
    if(error){
      console.log('error:', error);
    } else {
      console.log('body:', stationsArray);
    }
  });
  


 request(urlBysykkelBikesOnStations, options, function (error, response, availBikesArray) {
    if(error){
      console.log('error:', error);
    } else {
      console.log('body:', availBikesArray);
    }
  });
****/
  

  
  
/*

  var joined = join(stationsArray, availBikesArray, "id", "id", function (availBike, station) {
    return {
        id: station.id,
        name: station.title,
        where: station.subtitle,
        latitude: station.center.latitude,
        longitude: station.center.longitude,
        locksOnStation: station.number_of_locks,
        availableBikes: availBike.availability.bikes,
        availableLocks: availBike.availability.locks,
        timeStamp: timeStamp
    };
});
console.log("Now we have status on all stations");
console.log(joined);
*/


