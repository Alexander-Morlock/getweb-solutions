// Parallax Highlights

const SCROLL_MAX = 450;
const ICON_SHIFT = 110;
const ICON_KF = SCROLL_MAX / ICON_SHIFT;

if (document.querySelector('.indexPage')) {

  const getIcon = (containerClass) => {
    return document.querySelector(containerClass)
      .querySelector('.highlights__icon');
  };

  const rocket = getIcon('.highlights__projectsCount');
  const people = getIcon('.highlights__teamMembersCount');
  const experience = getIcon('.highlights__yearsOfExperience');

  const highlightsContainer = document.querySelector('.highlights');
  const highlights = highlightsContainer.querySelectorAll('strong');
  const highlightsNumbers = [...highlights].map((el) => +el.textContent);

  const parallaxAnimation = () => {
    const offset = window.pageYOffset;
    const scroll = offset > SCROLL_MAX
      ? SCROLL_MAX
      : offset;

    if (offset > 10) {
      highlightsContainer.classList.remove('highlights--hidden');
    } else {
      highlightsContainer.classList.add('highlights--hidden');
    }

    highlights.forEach((el, i) => {
      el.textContent = Math.floor(highlightsNumbers[i] * scroll / SCROLL_MAX);
    });

    const teamShift = scroll / ICON_KF - ICON_SHIFT;

    rocket.style = window.innerWidth >= 600
      ? `left: 1rem; transform: rotate(${scroll / 4 - 110}deg)`
      : `top: -1rem; transform: rotate(${scroll / 2 - 220}deg)  scale(0.6)`;
    people.style = `background-position: 
      center bottom ${teamShift}px, 
      left ${teamShift}px bottom, 
      right ${teamShift}px bottom`;
    experience.style = `background-position: center bottom ${scroll / ICON_KF - ICON_SHIFT}px`;
  };

  window.addEventListener('scroll', parallaxAnimation);
  window.addEventListener('resize', parallaxAnimation);

  parallaxAnimation(); // init
}

// Checkboxes and Tips. 
// Could be checked only 2 of 3

const fundamentalsList = document.querySelector('.fundamentals ul');
if (fundamentalsList) {
  const tipContainer = document.querySelector('.fundamentals__tipContainer');
  const tips = [...tipContainer.querySelectorAll('.fundamentals__tip')];
  const checkboxes = [...fundamentalsList.querySelectorAll('input[type="checkbox"]')];
  const state = {};

  const decreaseAllOrders = () => {
    for (const id in state) {
      if (state[id].order > 1) {
        state[id].order--;
      }
    }
  };

  const increaseThisOrder = (id) => {
    state[id].order = Math.max(
      ...Object.entries(state)
        .map((entry) => entry[1].order)
    ) + 1;
  };

  const isCheckedTwo = () => Object.entries(state).some((entry) => entry[1].order === 2);

  const hideAllTips = () => tips.forEach((tip) => tip.classList.add('fundamentals__tip--hidden'));

  const showTip = () => {
    if (isCheckedTwo() && window.innerWidth >= 600) {
      tipContainer.classList.remove('fundamentals__tipContainer--hidden');
      const datashow = Object.entries(state)
        .filter((entry) => entry[1].checked)
        .map((e) => e[0])
        .join('&');

      hideAllTips();

      tips.find((tip) => tip.dataset.show === datashow)
        .classList.remove('fundamentals__tip--hidden');
    } else {
      tipContainer.classList.add('fundamentals__tipContainer--hidden');
    }
  };

  const checkIfCheckedMoreThanTwo = () => {
    const stateEntries = Object.entries(state);
    if (!stateEntries.every((entry) => entry[1].checked)) {
      return;
    }

    const uncheckId = stateEntries.find((e) => e[1].order === 1)[0];

    const uncheckThisCheckbox = checkboxes
      .find((checkbox) => checkbox.id === uncheckId);

    uncheckThisCheckbox.checked = false;
    state[uncheckThisCheckbox.id].checked = false;
    state[uncheckThisCheckbox.id].order = 0;

    decreaseAllOrders();
  };

  // checkboxes init

  checkboxes.forEach((checkbox) => {
    state[checkbox.id] = {
      checked: false,
      order: 0
    };

    checkbox.addEventListener('change', (evt) => {
      const id = evt.target.id;
      state[id].checked = !state[id].checked;

      if (state[id].checked) {
        increaseThisOrder(id);
      } else {
        state[id].order = 0;
        decreaseAllOrders();
      }

      checkIfCheckedMoreThanTwo();
      showTip();
    });
  });
}