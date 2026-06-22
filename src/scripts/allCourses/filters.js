import { state, DOM, resetPagination } from './state.js';
import { escapeHtml, escapeAttr, buildPositionMap } from '../utils/helpers.js';
import { renderCards } from './cards.js';

// Получение отфильтрованных элементов
export function getFilteredItems() {
    let filtered = [...state.catalogData];
    
    // Фильтр по должности
    if (state.currentFilter !== 'all') {
        filtered = filtered.filter(item => item.position === state.currentFilter);
    }

    // Поиск
    if (state.currentSearchQuery.trim() !== '') {
        const query = state.currentSearchQuery.trim().toLowerCase();
        filtered = filtered.filter(item => {
            return (
                item.title.toLowerCase().includes(query) ||
                item.name.toLowerCase().includes(query) ||
                item.position.toLowerCase().includes(query)
            );
        });
    }
    return filtered;
}

// Рендеринг фильтров
export function renderFilters() {
    const positionMap = buildPositionMap(state.catalogData);
    const sortedPositions = Array.from(positionMap.keys());
    const totalCount = state.catalogData.length;
    
    let filtersHtml = `
        <button class="filter-btn ${state.currentFilter === 'all' ? 'filter-btn--active' : ''}" data-filter="all">
            All
            <span class="filter-btn__count">${totalCount}</span>
        </button>
    `;

    for (const position of sortedPositions) {
        const count = positionMap.get(position);
        const activeClass = state.currentFilter === position ? 'filter-btn--active' : '';
        filtersHtml += `
            <button class="filter-btn ${activeClass}" data-filter="${escapeAttr(position)}">
                ${escapeHtml(position)}
                <span class="filter-btn__count">${count}</span>
            </button>
        `;
    }

    DOM.filtersContainer.innerHTML = filtersHtml;
}

// Обновление активного класса фильтра
export function updateActiveFilterClass() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        const isActive = 
            (filterVal === 'all' && state.currentFilter === 'all') ||
            (filterVal !== 'all' && filterVal === state.currentFilter);
        
        btn.classList.toggle('filter-btn--active', isActive);
    });
    
    // Сбрасываем пагинацию при изменении фильтра
    resetPagination();
    renderCards();
}

// Установка фильтра
export function setFilter(filterValue) {
    state.currentFilter = filterValue;
    updateActiveFilterClass();
}