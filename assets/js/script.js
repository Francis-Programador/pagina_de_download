// Script principal para navegação, filtros e interações do portal.
let activeCategory = 'all';

function toggleMenu() {
  const nav = document.getElementById('navbar');
  const button = document.querySelector('.menu-toggle');
  const isOpen = nav.classList.toggle('show');
  if (button) {
    button.setAttribute('aria-expanded', isOpen.toString());
  }
}

function closeMenu() {
  const nav = document.getElementById('navbar');
  const button = document.querySelector('.menu-toggle');
  nav.classList.remove('show');
  if (button) {
    button.setAttribute('aria-expanded', 'false');
  }
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.chip').forEach((button) => {
    const filter = button.dataset.filter || button.textContent.trim().toLowerCase();
    button.classList.toggle('active', filter === category);
  });
  filterCards();
}

function filterCards() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  document.querySelectorAll('.card').forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    const cardCategory = card.dataset.category ? card.dataset.category.toLowerCase() : '';
    const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
    const matchesSearch = !query || cardText.includes(query);
    card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHeaderScroll() {
  const topButton = document.getElementById('topButton');
  const header = document.querySelector('.topbar');
  if (topButton) {
    topButton.style.display = window.scrollY > 320 ? 'grid' : 'none';
  }
  if (header) {
    header.classList.toggle('shadow', window.scrollY > 20);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
  const nav = document.getElementById('navbar');
  const button = document.querySelector('.menu-toggle');
  if (button) {
    button.setAttribute('aria-expanded', 'false');
  }
  if (nav) {
    nav.addEventListener('click', closeMenu);
  }
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar') && !event.target.closest('.menu-toggle')) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
  setCategory('all');
  filterCards();
});

window.addEventListener('scroll', handleHeaderScroll);
