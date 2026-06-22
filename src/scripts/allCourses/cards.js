import { state, DOM, CONFIG } from './state.js';
import { escapeHtml } from '../utils/helpers.js';
import { getFilteredItems } from './filters.js';
import { addLoadingIndicator, removeLoadingIndicator } from './loadMore.js';

// Рендеринг карточек
export function renderCards() {
    const filteredItems = getFilteredItems();
    state.allFilteredItems = filteredItems;

    if (filteredItems.length === 0) {
        DOM.cardsContainer.className = 'no-cards';
        DOM.cardsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__text">Ничего не найдено</div>
                <p style="margin-top: 12px; color:#547a8f;">Попробуйте изменить фильтр или поиск</p>
            </div>
        `;
        return;
    }

    const itemsToShow = filteredItems.slice(0, state.currentDisplayCount);
    
    let cardsHTML = '';
    for (const item of itemsToShow) {
        cardsHTML += createCardHTML(item);
    }
    DOM.cardsContainer.className = 'cards';
    DOM.cardsContainer.innerHTML = cardsHTML;

    // Проверяем, нужно ли показывать индикатор загрузки
    if (state.currentDisplayCount < filteredItems.length) {
        addLoadingIndicator();
    } else {
        removeLoadingIndicator();
    }
}

// Создание HTML одной карточки
function createCardHTML(item) {
    return `
        <article tabindex="0" class="card">
            <img alt="${escapeHtml(item.name)}" src="${escapeHtml(item.url)}">
            <div class="card__content">
                <span style="background: ${escapeHtml(item.color)};" class="card__position">${escapeHtml(item.position)}</span>
                <h3 class="card__title">${escapeHtml(item.title)}</h3>
                <div class="card__group">
                    <span class="card__group__price">${escapeHtml(item.price)}</span>
                    ${' | '}
                    <span class="card__group__name">${escapeHtml(item.name)}</span>
                </div>
            </div>
        </article>
    `;
}

// Сброс и рендеринг (сброс пагинации)
export function resetAndRender() {
    state.currentDisplayCount = CONFIG.INITIAL_DISPLAY_COUNT;
    state.allFilteredItems = [];
    renderCards();
}