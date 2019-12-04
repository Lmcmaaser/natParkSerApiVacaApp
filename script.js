'use strict';

// put your own value below!
const apiKey = '6gpOWdCuaKhk1zXUJRy2FtIMnyRlUcGCuPvardoW'; 
const baseUrl = 'https://developer.nps.gov/api/v1/parks?parkCode=acad';

function eventSubmit() {
    $('form').submit(event => {
      event.preventDefault();
      console.log('submitEvent ran');
      const searchInput = $('#js-search-input').val();
      const maxResults = $('#js-max').val();
      getParks(searchInput, maxResults);
    });
}

function formatQueryParams(params) {
  const queryParams = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryParams.join('&');
}

function getParks(searchInput, maxResults) {
    const params = {
      stateCode: searchInput,
      limit: maxResults
    };
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString +'&api_key=' + apiKey
    console.log(queryString);
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, maxResults))
      .catch(err => {
        $('#js-results').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#js-results').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++){
    /*for each object in the items array, add a list item to the results list*/
    $('#js-results').append(
        `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`
    )};
    $('#js-search-input').val('');
    $('#js-max').val('');
};

$(eventSubmit);