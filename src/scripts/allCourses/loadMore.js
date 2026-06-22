import { state, CONFIG } from "./state.js";
import { renderCards } from "./cards.js";

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

// Имитация загрузки с сервера
export function loadMoreItems(startIndex, count) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = state.allFilteredItems.slice(
        startIndex,
        startIndex + count,
      );
      resolve(newItems);
    }, CONFIG.LOADING_DELAY);
  });
}

// Асинхронная подгрузка
export async function loadMoreCards() {
  if (state.isLoading) return;

  const totalFiltered = state.allFilteredItems.length;
  if (state.currentDisplayCount >= totalFiltered || totalFiltered === 0) return;

  state.isLoading = true;
  addLoadingIndicator();

  const startIndex = state.currentDisplayCount;
  const newItems = await loadMoreItems(startIndex, CONFIG.LOAD_MORE_COUNT);
  state.currentDisplayCount += newItems.length;

  renderCards();
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
