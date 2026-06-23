import { state, DOM, CONFIG, resetPagination } from "./state.js";
import { escapeHtml, escapeAttr } from "../utils/helpers.js";
import { getPositionMap, getSearchPaginationData } from "./mock.js";
import { renderCards } from "./cards.js";

// Рендеринг фильтров
export async function renderFilters() {
  const positionMap = await getPositionMap(state.currentSearchQuery);
  state.positionMap = positionMap;
  const sortedPositions = Array.from(positionMap.keys());
  let filtersHtml = ``;
  if (!positionMap.has(state.currentFilter)) {
    state.currentFilter = "All";
  }
  for (const position of sortedPositions) {
    const count = positionMap.get(position);

    const activeClass =
      state.currentFilter.toLowerCase() === position.toLowerCase()
        ? "filter-btn--active"
        : "";
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
export async function updateActiveFilterClass() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach((btn) => {
    const filterVal = btn.getAttribute("data-filter");
    const isActive =
      (filterVal === "All" && state.currentFilter === "All") ||
      (filterVal !== "All" && filterVal === state.currentFilter);

    btn.classList.toggle("filter-btn--active", isActive);
  });

  // Сбрасываем пагинацию при изменении фильтра
  resetPagination();
  renderCards([
    ...(await getSearchPaginationData(
      state.currentFilter,
      state.currentSearchQuery,
      0,
      CONFIG.INITIAL_DISPLAY_COUNT,
    )),
  ]); // <--------------------------------------------------------------------------- []
}

// Установка фильтра
export async function setFilter(filterValue) {
  state.currentFilter = filterValue;
  await updateActiveFilterClass();
}
