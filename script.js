const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.tutorial-card');
const searchInput = document.getElementById('searchInput');
const noResult = document.getElementById('noResult');
let activeFilter = 'all';

function applyFilters(){
  const query = (searchInput?.value || '').toLowerCase().trim();
  let shown = 0;
  cards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const haystack = `${card.dataset.title} ${card.innerText}`.toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    const visible = matchesCategory && matchesSearch;
    card.style.display = visible ? 'flex' : 'none';
    if(visible) shown++;
  });
  if(noResult) noResult.hidden = shown !== 0;
}

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  applyFilters();
  document.getElementById('tutoriels')?.scrollIntoView({behavior:'smooth'});
}));

searchInput?.addEventListener('input', applyFilters);

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));
