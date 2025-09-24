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
  // index.html has: <a id="cta-btn" href="mailto:...">Contact Me</a>
  const ctaLink = document.getElementById('cta-btn');
  if (ctaLink) {
    ctaLink.addEventListener('click', () => {
      // GA4 recommended event for lead/contact
      sendEvent('generate_lead', {
        method: 'email',
        link_text: 'Contact Me',
        location: 'header'
      });

      // Custom event for your reporting
      sendEvent('contact_email_click', {
        link_url: ctaLink.href,
        location: 'header'
      });
      // No alert here—let the mail client open smoothly
    }, { passive: true });
  }

  // --- Project links: open in new tab + track ---
  // If your links are href="#" that’s fine (event still fires).
  // If you add a real href (e.g., your GitHub project), it will open in a new tab.
  const projectLinks = document.querySelectorAll('.view-project');
  projectLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();

      const url = a.getAttribute('href') || '';
      const name = a.dataset.project || 'Unknown Project';

      // Send analytics first
      sendEvent('project_view', {
        project_name: name,
        ui_section: 'projects_list'
      });

      // Then open the link (if provided)
      const win = window.open(url, '_blank');
      if (win) win.opener = null; // security hardening
    });
  });
});
