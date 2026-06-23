import { state, DOM } from "./state.js";
import { setFilter, renderFilters } from "./filters.js";
import { resetAndRender } from "./cards.js";
import { handleScroll } from "./loadMore.js";
import { debounce } from "../utils/helpers.js";

// Настройка обработчика поиска
export function setupSearch() {
  const debouncedSearch = debounce(async (e) => {
    state.currentSearchQuery = e.target.value;
    // renderFilters();
    await resetAndRender();
  }, 300);

  DOM.searchInput.addEventListener("input", debouncedSearch);
}

// Настройка обработчиков фильтров
export function setupFilterHandlers() {
  DOM.filtersContainer.addEventListener("click", async (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    const filterValue = btn.getAttribute("data-filter");
    await setFilter(filterValue);
  });
}

// Настройка скролла
export function setupScrollHandler() {
  const debouncedScroll = debounce(handleScroll, 100);
  window.addEventListener("scroll", debouncedScroll);
}

// Настройка всех обработчиков
export function setupAllHandlers() {
  setupSearch();
  setupFilterHandlers();
  setupScrollHandler();
}
