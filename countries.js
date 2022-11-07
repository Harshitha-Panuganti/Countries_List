let searchInputEl = document.getElementById('searchInput');
let resultCountriesEl = document.getElementById('resultCountries');
let spinnerEl = document.getElementById('spinner');

let searchInpuval = "";
let countriesList = [];

function createAndAppendCountries(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add('country-card', 'col-11', 'col-md-5', 'mr-auto', 'ml-auto', 'd-flex', 'flex-row');
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement('img');
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add('country-flag', 'mt-auto', 'mr-auto');
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add('d-flex', 'flex-column', 'ml-2');
    countryEl.appendChild(countryInfoEl);

    let countrNameEl = document.createElement('p');
    countrNameEl.classList.add('country-name');
    countrNameEl.textContent = country.name;
    countryInfoEl.appendChild(countrNameEl);

    let countryPopulationEl = document.createElement('p');
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add('country-population');
    countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInpuval)) {
            createAndAppendCountries(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    };
    spinnerEl.classList.remove('d-none');
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add('d-none');
            countriesList = jsonData;
            displaySearchResults();
        });
}

function onChangeSearchInput(event) {
    searchInpuval = event.target.value;
    displaySearchResults();
}

getCountries();
searchInputEl.addEventListener('keyup', onChangeSearchInput);