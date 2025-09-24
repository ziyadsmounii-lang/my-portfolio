// ========== Base UX niceties ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== GA4 utilities ==========
const DEBUG_GA = true; // leave true while testing; you can set false later

function sendEvent(eventName, params = {}) {
  const payload = DEBUG_GA ? { ...params, debug_mode: true } : params;
  if (typeof gtag === 'function') {
    gtag('event', eventName, payload);
  } else {
    console.log('[GA4 pending]', eventName, payload);
  }
}

// ========== Wire up after DOM is ready ==========
document.addEventListener('DOMContentLoaded', () => {
  // --- Contact Me (mailto) lead tracking ---
  const ctaLink = document.getElementById('cta-btn');
  if (ctaLink) {
    ctaLink.addEventListener('click', () => {
      sendEvent('generate_lead', {
        method: 'email',
        link_text: 'Contact Me',
        location: 'header'
      });
      sendEvent('contact_email_click', {
        link_url: ctaLink.href,
        location: 'header'
      });
    }, { passive: true });
  }

  // --- Project links: open in new tab + track ---
  const projectLinks = document.querySelectorAll('.view-project');
  projectLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = a.getAttribute('href') || '';
      const name = a.dataset.project || 'Unknown Project';
      sendEvent('project_view', {
        project_name: name,
        ui_section: 'projects_list'
      });
      const win = window.open(url, '_blank');
      if (win) win.opener = null;
    });
  });
});
