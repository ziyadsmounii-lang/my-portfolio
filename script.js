script.js
// Show current year in the footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// Button: simple pop-up when Contact Me is clicked
const cta = document.getElementById('cta-btn');
if (cta) {
cta.addEventListener('click', () => {
alert('Thanks for reaching out!');
});
}


// Links: log which project the user clicks
const links = document.querySelectorAll('.view-project');
links.forEach(a => {
a.addEventListener('click', (e) => {
e.preventDefault();
const name = a.dataset.project;
console.log(`Viewed project: ${name}`);
});
});