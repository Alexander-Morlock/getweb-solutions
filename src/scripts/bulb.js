// Bulb - Theme Switcher
const bulb = document.querySelector('.mainHighlight__bulb');

export const switchThemeTo = (theme) => {
  if (theme === 'light') {
    document.documentElement.classList.add('lightTheme');
  } else {
    document.documentElement.classList.remove('lightTheme');
  }
};

if (bulb) {
  const isLightTheme = () => document.documentElement.classList.contains('lightTheme');

  const pause = (time) => new Promise((resolve) => setTimeout(resolve, time));

  async function animateBulb() {
    bulb.classList.add('no-animation');
    await pause(1);
    bulb.classList.add('animation');
    await pause(1000);
    bulb.classList.remove('animation');
  };

  async function switchToLightTheme() {
    switchThemeTo('light');
    await pause(50);
    switchThemeTo('dark');
    await pause(100);
    switchThemeTo('light');
  };

  const onBulbClick = () => {
    document.documentElement.classList.toggle('lightTheme');

    if (isLightTheme()) {
      animateBulb();
      switchToLightTheme();
      localStorage.setItem('chosenTheme', 'light');
    } else {
      switchThemeTo('dark');
      localStorage.setItem('chosenTheme', 'dark');
    }
  }

  bulb.addEventListener('click', onBulbClick);
}