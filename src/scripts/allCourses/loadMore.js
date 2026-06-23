import { state, CONFIG } from "./state.js";
import { renderCards } from "./cards.js";
import { getSearchPaginationData } from "./mock.js";

// Индикатор загрузки
export function addLoadingIndicator() {
  removeLoadingIndicator();
  const loader = document.createElement("div");
  loader.id = "loading-indicator";
  loader.className = "loading-indicator";
  loader.innerHTML = `
        <img alt="loading" src="./src/icons/loading.svg" class="loading-spinner"></img>
        <span class="loading-span">Load more</span>
    `;
  cardsContainer.parentElement.appendChild(loader);
}

export function removeLoadingIndicator() {
  const existingLoader = document.getElementById("loading-indicator");
  if (existingLoader) existingLoader.remove();
}

// Асинхронная подгрузка
export async function loadMoreCards() {
  if (state.isLoading) return;

  const totalFiltered = state.positionMap.get(state.currentFilter);
  if (state.currentDisplayCount >= totalFiltered || totalFiltered === 0) return;
  state.isLoading = true;
  addLoadingIndicator();
  state.prevFilter = state.currentFilter;
  state.prevSearchQuery = state.currentSearchQuery;
  const startIndex = state.currentDisplayCount;
  // можно оптимизировать через мемоизацию
  if (
    state.prevFilter != state.currentFilter ||
    state.prevSearchQuery != state.currentSearchQuery
  ) {
    state.catalogData = [];
  }
  // можно оптимизировать через мемоизацию
  const newItems = await getSearchPaginationData(
    state.currentFilter,
    state.currentSearchQuery,
    startIndex,
    startIndex + CONFIG.LOAD_MORE_COUNT,
  );
  state.catalogData.push(...newItems);
  state.currentDisplayCount += newItems.length;
  renderCards(state.catalogData);
  state.isLoading = false;
  removeLoadingIndicator();
}

// Обработчик скролла
export function handleScroll() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (
    scrollY + windowHeight >= documentHeight - CONFIG.SCROLL_THRESHOLD &&
    !state.isLoading
  ) {
    loadMoreCards();
  }
}
