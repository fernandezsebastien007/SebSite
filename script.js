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

const shareCardButton = document.getElementById('share-card-btn');
const shareStatus = document.getElementById('share-status');

async function writeShareStatus(message) {
  if (!shareStatus) return;
  shareStatus.textContent = message;
}

if (shareCardButton) {
  shareCardButton.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Sebastien Fernandez — NFC Card',
      text: 'Take a look at Sebastien Fernandez’s virtual card.',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        await writeShareStatus('Card shared successfully.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        await writeShareStatus('Card link copied. You can now share it.');
        return;
      }

      await writeShareStatus('Sharing is not supported on this device.');
    } catch (error) {
      await writeShareStatus('Share canceled or unavailable.');
    }
  });
}

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
    if (intentInput) intentInput.value = btn.dataset.intent || 'Recruitment Opportunity';
  });
});