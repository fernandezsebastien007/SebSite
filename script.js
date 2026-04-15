const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

function activateTab(targetId) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.target === targetId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.target));
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const intentButtons = Array.from(document.querySelectorAll('.intent'));
const intentInput = document.getElementById('intent-input');
const contactStartInput = document.getElementById('contact-start');

if (contactStartInput) {
  contactStartInput.value = String(Date.now());
}

intentButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    intentButtons.forEach((other) => other.classList.remove('active'));
    btn.classList.add('active');
    if (intentInput) intentInput.value = btn.dataset.intent || 'Employer Opportunity';
  });
});