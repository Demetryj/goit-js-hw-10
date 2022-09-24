import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(onInputFetchCountries, DEBOUNCE_DELAY)
);

function onInputFetchCountries(event) {
  const inputValue = event.target.value.trim();

  if (inputValue === '') {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }

  fetchCountries(inputValue)
    .then(data => {
      if (data.length === 1) {
        renderInformOfCountry(data);
      } else if (data.length > 2 && data.length <= 10) {
        createMarkupListCountries(data);
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createMarkupListCountries(countries) {
  const murkup = countries
    .map(country => {
      return `<li class="country-list__item">
      <img class="country-list__image" src="${country.flags.svg}" alt="Flag of country" width="40" hight="40">
      <p class="country-list__text">${country.name.official}</p>
    </li>`;
    })
    .join('');

  countryListEl.insertAdjacentHTML('beforeend', murkup);
}

function renderInformOfCountry([country]) {
  const murkupInformOfCountry = `<div class="country-info__box">
  <img class="country-info__image" src="${
    country.flags.svg
  }" alt="Flag of country" width="50" hight="50">
      <p class="country-info__main-text">${country.name.official}</p>
      </div>
      <p class="country-info__secondary-text"><span class="country-info__name-text">Capital: </span>${
        country.capital
      }</p>
      <p class="country-info__secondary-text"><span class="country-info__name-text">Population: </span>${
        country.population
      }</p>
      <p class="country-info__secondary-text"><span class="country-info__name-text">Languages: </span>${Object.values(
        country.languages
      ).join(', ')}</p>`;

  countryInfoEl.insertAdjacentHTML('beforeend', murkupInformOfCountry);
}
