(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('[data-primary-nav]');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.textContent = isOpen ? 'Menu' : 'Tutup';
      primaryNav.classList.toggle('is-open', !isOpen);
    });
  }

  const tools = document.querySelector('[data-archive-tools]');
  const cards = Array.from(document.querySelectorAll('[data-article-card]'));
  if (!tools || cards.length === 0) return;

  const searchInput = tools.querySelector('[data-article-search]');
  const categorySelect = tools.querySelector('[data-category-filter]');
  const resetButton = tools.querySelector('[data-filter-reset]');
  const status = document.querySelector('[data-results-status]');
  const noResults = document.querySelector('[data-no-results]');
  const normalize = (value) => String(value || '').toLocaleLowerCase('id-ID').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const categories = [...new Set(cards.map((card) => card.dataset.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'id'));
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase('id-ID'));
    categorySelect.appendChild(option);
  });

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const category = categorySelect.value;
    let visible = 0;

    cards.forEach((card) => {
      const haystack = normalize(`${card.dataset.search || ''} ${card.textContent || ''}`);
      const matchesQuery = !query || haystack.includes(query);
      const matchesCategory = !category || card.dataset.category === category;
      const matches = matchesQuery && matchesCategory;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    status.textContent = `Menampilkan ${visible} dari ${cards.length} karya.`;
    noResults.hidden = visible !== 0;
  };

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = '';
    applyFilters();
    searchInput.focus();
  });

  const requestedCategory = new URLSearchParams(window.location.search).get('kategori');
  if (requestedCategory) {
    const match = categories.find((category) => normalize(category) === normalize(requestedCategory));
    if (match) categorySelect.value = match;
  }
  applyFilters();
})();
