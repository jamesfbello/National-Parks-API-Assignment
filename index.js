"use strict";

// set constants for API Key and URL endpoint
const apiKey = "2dlWOGqO0ihu1R0Z5XAoRK8MigE9RosTkcdKRuGX";
const searchURL = "https://api.nps.gov/api/v1/parks";

//set page ready function
$(document).ready(function() {
  watchSubmitForm();
});

//create event listeners for form submission
function watchSubmitForm() {
  console.log("watchSumbitForm works!");
  $("#search-form").submit(e => {
    e.preventDefault();
    let searchState = $("#state-name-input").val();
    let numResults = $("#number-input").val();
    getRequestNationalParks(searchState, numResults);
  });
}

//function to create string to use for URL
function formatQueryParams(params) {
  console.log("formatQueryParams function works!");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//GET Request to National Parks Service API
function getRequestNationalParks(query, limit = 10) {
  console.log("getNationalPark works!");

  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;


  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });
}

//display request results to DOM
function displayResults(responseJson) {
  console.log("displayResult function works");
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(`<br> <br>
    <div class="response-container">
        <div class="park-name">
        <h3>${responseJson.data[i].fullName}</h3>
        </div>
        <div class="park description">
        <h4>${responseJson.data[i].description}</h4>
        <p> <p>
        </div>
        //<div class="park-website">
        //<a href="${responseJson.data[i].url}">Visit Park's Website</a>
        <div class="park-website">
        <a href="${responseJson.data[i].url}">Visit Park's Website</a>
        </div>
        </div> 
    </div>`);
  }
  $("#results-list").removeClass("hidden");
}
