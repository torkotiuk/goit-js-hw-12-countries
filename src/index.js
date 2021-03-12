import { alert, error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { debounce } from 'lodash';
import contriesListTempl from './templates/contries-list.hbs';
import contryCardTempl from './templates/contry-card.hbs';
import './css/country-card.css';
// --- API ---

const BASE_URL = `https://restcountries.eu/rest/v2/name/`;

function fetchCountries(inputData) {
  return fetch(`${BASE_URL}${inputData}`).then(response => response.json());
}

// --- --- ---

const refs = {
  inputSearch: document.querySelector('.input-search'),
  countriesContainer: document.querySelector('.country-container'),
  body: document.querySelector('body'),
};

refs.inputSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;
  if (searchQuery === '') {
    refs.countriesContainer.innerHTML = '';
  }

  fetchCountries(searchQuery).then(countriesArr => {
    let countriesArrLength = countriesArr.length;
    if (countriesArrLength > 10) {
      refs.inputSearch.innerHTML = '';
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
      });
    }

    if (countriesArrLength > 1 && countriesArrLength <= 10) {
      refs.inputSearch.innerHTML = '';
      return renderCountriesList(countriesArr);
    }

    if (countriesArrLength === 1) {
      return renderCountryCard(countriesArr);
    }
  });
}

function renderCountriesList(listOfCountries) {
  refs.countriesContainer.innerHTML = contriesListTempl(listOfCountries);
}

function renderCountryCard(country) {
  refs.countriesContainer.innerHTML = contryCardTempl(country);
}
