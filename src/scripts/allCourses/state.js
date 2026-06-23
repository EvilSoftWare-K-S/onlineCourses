export const state = {
  catalogData: [],
  prevFilter: "All",
  prevSearchQuery: "",
  currentFilter: "All",
  currentSearchQuery: "",
  currentDisplayCount: 9,
  positionMap: {},
  isLoading: false,
};

// DOM элементы (экспортируем как константы)
export const DOM = {
  cardsContainer: document.getElementById("cardsContainer"),
  filtersContainer: document.getElementById("filtersContainer"),
  searchInput: document.getElementById("searchInput"),
};

// Конфигурация
export const CONFIG = {
  INITIAL_DISPLAY_COUNT: 9,
  LOAD_MORE_COUNT: 3,
  SCROLL_THRESHOLD: 200,
  LOADING_DELAY: 1000,
};

// Функции для безопасного изменения состояния
export function updateState(newState) {
  Object.assign(state, newState);
}

export function resetPagination() {
  state.currentDisplayCount = CONFIG.INITIAL_DISPLAY_COUNT;
}
