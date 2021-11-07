// check default theme

import { switchThemeTo } from './scripts/bulb';

const chosenTheme = localStorage.getItem('chosenTheme') || 'dark';

if (chosenTheme !== 'dark') {
  switchThemeTo('light');
}

// check default language

const browserLanguage = localStorage.getItem('chosenLanguage') || navigator.language || navigator.userLanguage;
const language = browserLanguage === 'cs' ? 'cs' : 'en';
const currentPage = window.location.pathname;

if (currentPage === '/' && language === 'en') {
  window.location.pathname = 'index_en.html';
}