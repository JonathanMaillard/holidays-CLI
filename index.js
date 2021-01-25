#!/usr/bin/env node

const { getCode } = require("country-list");
const axios = require('axios');



//create a table with the arguments
const myArgs = process.argv.slice(2);

// check the number of argument and abort if different than 1 or 2
if(myArgs.length != 2 && myArgs.length != 1){
    console.error("Error. You must declare a country and, optionnaly, a date.");
    return;
}

//get the country and its code
let country = myArgs[0];
let code = getCode(country);

//get the current yeah
let year = new Date().getFullYear();

// if a year is passed as an argument, use it instead of the current year
if(myArgs.length == 2){
    year = Number(myArgs[1]);
}


// Make a request to the date nager API
axios.get('https://date.nager.at/api/v2/PublicHolidays/'+year+'/'+code)
  .then(function (response) {
    // handle success - log the dates and the holiday names
    response.data.forEach(holiday => {
        console.log(holiday.name + ' - ' + holiday.date);
    });
   
  })
  .catch(function (error) {
    // handle error
    //console.log(error);
    console.error('You migh have entered a wrong country name or an invalid year');
  })
  