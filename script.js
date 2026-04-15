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

const form = document.getElementById('contact-form');
const email = document.body.dataset.contactEmail || 'your-email@example.com';
const intentButtons = Array.from(document.querySelectorAll('.intent'));
const intentInput = document.getElementById('intent-input');
const contactStartInput = document.getElementById('contact-start');
const formStatus = document.getElementById('form-status');
const MIN_FORM_SECONDS = 4;

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

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const honeypot = (data.get('company') || '').toString().trim();
    const startedAt = Number(data.get('contact_start') || 0);
    const secondsElapsed = startedAt > 0 ? (Date.now() - startedAt) / 1000 : 0;

    if (honeypot) {
      if (formStatus) formStatus.textContent = 'Submission blocked.';
      return;
    }

    if (secondsElapsed < MIN_FORM_SECONDS) {
      if (formStatus) {
        formStatus.textContent = `Please take a moment before submitting (${MIN_FORM_SECONDS}s minimum).`;
      }
      return;
    }

    const intent = (data.get('intent') || 'General Inquiry').toString().trim();
    const name = (data.get('name') || '').toString().trim();
    const sender = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const subject = encodeURIComponent(
      `${intent} | ATLAS Inquiry from ${name || 'Website Visitor'}`
    );
    const body = encodeURIComponent(
      `Inquiry Type: ${intent}\nName: ${name}\nEmail: ${sender}\n\nMessage:\n${message}\n\n---\nSent from your website form.`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}