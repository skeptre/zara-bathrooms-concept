const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
  });
});

const form = document.querySelector('#enquiry-form');
const result = document.querySelector('#form-result');
const preparedMessage = document.querySelector('#prepared-message');
const copyButton = document.querySelector('#copy-message');
const copyStatus = document.querySelector('#copy-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const postcode = String(data.get('postcode') || '').trim();
  const project = String(data.get('project') || '').trim();
  const message = String(data.get('message') || '').trim();

  preparedMessage.textContent = `Bathroom enquiry\n\nName: ${name}\nEmail: ${email}\nPostcode: ${postcode || 'Not provided'}\nProject: ${project}\n\n${message}`;
  result.hidden = false;
  copyStatus.textContent = '';
  result.focus();
});

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preparedMessage.textContent);
    copyStatus.textContent = 'Copied to clipboard.';
  } catch {
    copyStatus.textContent = 'Copy is unavailable here. Select the message above to copy it.';
  }
});
