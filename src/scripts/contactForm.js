// Contact form elements animation

const contactForm = document.querySelector('.contactForm');

if (contactForm) {
  const customInputs = contactForm.querySelectorAll('.customInput');

  customInputs.forEach((container) => {
    const input = container.children[0];

    if (!input.type.includes('select')) {
      input.addEventListener('change', (evt) => {
        if (evt.target.value !== '') {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    } else {
      container.classList.add('customInput--select');
      const select = container.querySelector('select');
      select.addEventListener('change', (evt) => {
        if (evt.target.value !== '') {
          select.classList.add('selected');
        } else {
          select.classList.remove('selected');
        }
      });
    }
  });
}

// Contact form pre-fill actions

const preFillLinks = document.querySelectorAll('a[data-prefill]');
const textarea = document.querySelector('textarea');
preFillLinks.forEach((el) => {
  el.addEventListener('click', () => {
    textarea.value = el.dataset.prefill;
    textarea.classList.add('filled');
  });
});

// Submitting the form

const submitButton = document.querySelector('.contactForm__submit');

if (submitButton) {
  console.log(window.location.href);
  const currentPage = window.location.pathname;
  const postfix = currentPage === '/' || currentPage === '/index.html' ? '' : '_en';

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.hash = '';
    window.location.pathname = `/request-was-succesfully-sent${postfix}.html`;
  });
}