class CountrySearch {
  //
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const URL = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

    return fetch(URL)
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const apiService = new CountrySearch();

const refs = {
  input: document.querySelector('.js-input'),
  countryContainer: document.querySelector('.country-container'),
};

// ----------------------------------------------------------------
// ---------------------------------------------------------------
import articlesTemplate from './templates/country-tmpl.hbs';
// ---------------------------------------------------------------
refs.input.addEventListener('input', onSearch);

function onSearch(e) {}
