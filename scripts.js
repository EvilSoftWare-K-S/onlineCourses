import { getSearchPaginationData } from "./src/scripts/allCourses/mock.js";
import { state, CONFIG, DOM } from "./src/scripts/allCourses/state.js";
import { renderFilters } from "./src/scripts/allCourses/filters.js";
import { renderCards } from "./src/scripts/allCourses/cards.js";
import { setupAllHandlers } from "./src/scripts/allCourses/handlers.js";

// Инициализация приложения
async function init() {
  // Сбрасываем состояние
  state.currentFilter = "All";
  state.currentSearchQuery = "";
  state.currentDisplayCount = 9;
  DOM.searchInput.value = "";
  // Загружаем данные
  renderFilters();
  state.catalogData = [
    ...(await getSearchPaginationData(
      state.currentFilter,
      state.currentSearchQuery,
      0,
      CONFIG.INITIAL_DISPLAY_COUNT,
    )),
  ];
  // Рендерим
  
  renderCards(state.catalogData);
  setupAllHandlers();
}

// Запускаем после загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
