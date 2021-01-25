#!/usr/bin/env node

const { getCode } = require("country-list");
const axios = require('axios');



//get the country sent in arguments and get the country code
let myArgs = process.argv.slice(2);
let country = myArgs[0];

let code = getCode(country);
let year = new Date().getFullYear();

// count number of arguments
let argNumber = process.argv.length;
// if a year is passed as an argument, use it instead of the current year
if(argNumber > 3){
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
    console.log(error);
  })
  