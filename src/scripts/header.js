// Burger menu

const burgerMenuIcon = document.querySelector('#burgerMenuIcon');
const topNav = document.querySelector('.topNav');
const menuLinks = topNav.querySelectorAll('a');
const body = document.querySelector('body');

const closeMobileMenu = () => {
  topNav.classList.add('close');
  burgerMenuIcon.classList.remove('open');

  setTimeout(() => {
    topNav.classList.remove('open');
    topNav.classList.remove('close');
    body.style = "";
  }, 300);
};

const showMobileMenu = () => {
  burgerMenuIcon.classList.add('open');
  topNav.classList.add('open');
  body.style = "overflow:hidden";
};

const onBurgerClick = () => {
  if (burgerMenuIcon.classList.contains('open')) {
    closeMobileMenu();
  } else {
    showMobileMenu();
  }
};

menuLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
})

burgerMenuIcon.addEventListener('click', onBurgerClick);

// mobile menu plate

const mobileBackground = document.querySelector('.header__mobileBackground');

if (mobileBackground) {
  const onWindowScroll = () => {
    if (window.pageYOffset > 10) {
      mobileBackground.classList.add('scrolled');
    } else {
      mobileBackground.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onWindowScroll);
}

const languageSwitcher = document.querySelector('.topNavList__languageSwitcher');
languageSwitcher.addEventListener('click', () => {
  
  let language = 'cs';

  if(languageSwitcher.href.includes('_en')) {
    language = 'en';
  }

  localStorage.setItem('chosenLanguage', language);
});