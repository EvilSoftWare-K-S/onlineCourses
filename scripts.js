import { getRawData } from './src/scripts/allCourses/mock.js';
import { state, DOM } from './src/scripts/allCourses/state.js';
import { renderFilters } from './src/scripts/allCourses/filters.js';
import { renderCards } from './src/scripts/allCourses/cards.js';
import { setupAllHandlers } from './src/scripts/allCourses/handlers.js';

// Инициализация приложения
function init() {
    // Загружаем данные
    state.catalogData = [...getRawData()];
    
    // Сбрасываем состояние
    state.currentFilter = 'all';
    state.currentSearchQuery = '';
    state.currentDisplayCount = 9;
    state.allFilteredItems = [];
    DOM.searchInput.value = '';
    
    // Рендерим
    renderFilters();
    renderCards();
    setupAllHandlers();
}

// Запускаем после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
// import getRawData from "./src/scripts/mock.js";

// // --- Глобальное состояние ---

// let catalogData = [...getRawData()];
// let currentFilter = "all"; // активный фильтр (position или 'all')
// let currentSearchQuery = ""; // строка поиска (регистронезависимая)
// let currentDisplayCount = 9; // сколько карточек сейчас показано
// let isLoading = false; // флаг для предотвращения множественных загрузок
// let allFilteredItems = []; // кэш отфильтрованных элементов

// // DOM элементы
// const cardsContainer = document.getElementById("cardsContainer");
// const filtersContainer = document.getElementById("filtersContainer");
// const searchInput = document.getElementById("searchInput");

// // --- 1. Построение структуры Map {position: count} ---
// function buildPositionMap(data) {
//   const positionMap = new Map();
//   for (const item of data) {
//     const pos = item.position;
//     if (positionMap.has(pos)) {
//       positionMap.set(pos, positionMap.get(pos) + 1);
//     } else {
//       positionMap.set(pos, 1);
//     }
//   }
//   return positionMap;
// }

// // --- Функция фильтрации (поиск + position-фильтр) ---
// function getFilteredItems() {
//   let filtered = [...catalogData];

//   // 1. Фильтр по должности (position)
//   if (currentFilter !== "all") {
//     filtered = filtered.filter((item) => item.position === currentFilter);
//   }

//   // 2. Поиск (по title, name, position) - регистронезависимый
//   if (currentSearchQuery.trim() !== "") {
//     const query = currentSearchQuery.trim().toLowerCase();
//     filtered = filtered.filter((item) => {
//       return (
//         item.title.toLowerCase().includes(query) ||
//         item.name.toLowerCase().includes(query) ||
//         item.position.toLowerCase().includes(query)
//       );
//     });
//   }
//   return filtered;
// }

// // простая защита от XSS
// function escapeHtml(str) {
//   if (!str) return "";
//   return str
//     .replace(/[&<>]/g, function (m) {
//       if (m === "&") return "&amp;";
//       if (m === "<") return "&lt;";
//       if (m === ">") return "&gt;";
//       return m;
//     })
//     .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
//       return c;
//     });
// }

// // функция экранирования атрибута
// function escapeAttr(str) {
//   return str.replace(/[&"']/g, function (match) {
//     if (match === "&") return "&amp;";
//     if (match === '"') return "&quot;";
//     if (match === "'") return "&#39;";
//     return match;
//   });
// }

// // --- Новая функция для имитации загрузки с сервера ---
// function loadMoreItems(startIndex, count) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newItems = allFilteredItems.slice(startIndex, startIndex + count);
//       resolve(newItems);
//     }, 1000); // задержка 1 секунда
//   });
// }

// // --- Рендер карточек ---
// function renderCards() {
//   const filteredItems = getFilteredItems();
//   allFilteredItems = filteredItems; // сохраняем в кэш для подгрузки

//   if (filteredItems.length === 0) {
//     cardsContainer.innerHTML = `
//             <div class="empty-state">
//                 <div class="empty-state__text">Ничего не найдено</div>
//                 <p style="margin-top: 12px; color:#547a8f;">Попробуйте изменить фильтр или поиск</p>
//             </div>
//         `;
//     return;
//   }

//   // Показываем только первые currentDisplayCount элементов
//   const itemsToShow = filteredItems.slice(0, currentDisplayCount);

//   let cardsHTML = "";
//   for (const item of itemsToShow) {
//     cardsHTML += `
//             <article tabindex="0" class="card">
//                 <img alt="${escapeHtml(item.name)}" src="${escapeHtml(item.url)}">
//                 <div class="card__content">
//                     <span style="background: ${escapeHtml(item.color)};" class="card__position">${escapeHtml(item.position)}</span>
//                     <h3 class="card__title">${escapeHtml(item.title)}</h3>
//                     <div class="card__group"><span class="card__group__price">${escapeHtml(item.price)}</span>${" | "}<span class="card__group__name">${escapeHtml(item.name)}</span></div>
//                 </div>
//             </article>
//         `;
//   }
//   cardsContainer.innerHTML = cardsHTML;

//   // После рендера проверяем, нужно ли показывать индикатор загрузки (если есть ещё элементы)
//   if (currentDisplayCount < filteredItems.length) {
//     addLoadingIndicator();
//   } else {
//     removeLoadingIndicator();
//   }
// }

// // --- Создание индикатора загрузки (внизу списка) ---
// function addLoadingIndicator() {
//   removeLoadingIndicator();
//   const loader = document.createElement("div");
//   loader.id = "loading-indicator";
//   loader.className = "loading-indicator";
//   loader.innerHTML = `
//         <img alt="loading" src="./src/icons/loading.svg" class="loading-spinner"></img>
//         <span class="loading-span">Load more</span>
//     `;
//   cardsContainer.parentElement.appendChild(loader);
// }

// function removeLoadingIndicator() {
//   const existingLoader = document.getElementById("loading-indicator");
//   if (existingLoader) existingLoader.remove();
// }

// // --- Асинхронная подгрузка дополнительных карточек ---
// async function loadMoreCards() {
//   if (isLoading) return;

//   const totalFiltered = allFilteredItems.length;
//   // Если уже показаны все карточки или ничего нет
//   if (currentDisplayCount >= totalFiltered || totalFiltered === 0) return;

//   isLoading = true;
//   addLoadingIndicator();

//   // Имитация запроса к серверу: подгружаем по 3 карточки
//   const startIndex = currentDisplayCount;
//   const newItems = await loadMoreItems(startIndex, 3);

//   currentDisplayCount += newItems.length;

//   renderCards();

//   isLoading = false;
//   removeLoadingIndicator();
// }

// // --- Проверка, достиг ли пользователь конца страницы ---
// function handleScroll() {
//   // Получаем расстояние до конца страницы
//   const scrollY = window.scrollY;
//   const windowHeight = window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;

//   // Если до конца осталось меньше 200px и не идёт загрузка
//   if (scrollY + windowHeight >= documentHeight - 200 && !isLoading) {
//     loadMoreCards();
//   }
// }

// // --- сбрасываем пагинацию при изменении фильтров/поиска ---
// function resetAndRender() {
//   currentDisplayCount = 9;
//   allFilteredItems = [];
//   renderCards();
// }
// // Обновить визуально активные классы у кнопок фильтров (без пересоздания всего списка) со сбросом подгрузки при фильтрации или поиске
// function updateActiveFilterClass() {
//   const btns = document.querySelectorAll(".filter-btn");
//   btns.forEach((btn) => {
//     const filterVal = btn.getAttribute("data-filter");
//     if (
//       (filterVal === "all" && currentFilter === "all") ||
//       (filterVal !== "all" && filterVal === currentFilter)
//     ) {
//       btn.classList.add("filter-btn--active");
//     } else {
//       btn.classList.remove("filter-btn--active");
//     }
//   });
//   // При изменении фильтра сбрасываем пагинацию
//   resetAndRender();
// }

// // --- Обработчик поиска ---
// function setupSearch() {
//   searchInput.addEventListener("input", (e) => {
//     currentSearchQuery = e.target.value;
//     resetAndRender();
//   });
// }

// // --- Построение фильтров на основе Map с сохранением пагинации при клике ---
// function renderFilters() {
//   const positionMap = buildPositionMap(catalogData);
//   const sortedPositions = Array.from(positionMap.keys());
//   let filtersHtml = "";
//   const totalCount = catalogData.length;
//   const allActiveClass = currentFilter === "all" ? "filter-btn--active" : "";
//   filtersHtml += `
//         <button class="filter-btn ${allActiveClass}" data-filter="all">
//             All
//             <span class="filter-btn__count">${totalCount}</span>
//         </button>
//     `;

//   for (const position of sortedPositions) {
//     const count = positionMap.get(position);
//     const activeClass = currentFilter === position ? "filter-btn--active" : "";
//     filtersHtml += `
//             <button class="filter-btn ${activeClass}" data-filter="${escapeAttr(position)}">
//                 ${escapeHtml(position)}
//                 <span class="filter-btn__count">${count}</span>
//             </button>
//         `;
//   }

//   filtersContainer.innerHTML = filtersHtml;

//   const filterButtons = document.querySelectorAll(".filter-btn");
//   filterButtons.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const filterValue = btn.getAttribute("data-filter");
//       if (filterValue === "all") {
//         currentFilter = "all";
//       } else {
//         currentFilter = filterValue;
//       }
//       updateActiveFilterClass();
//     });
//   });
// }

// // --- Инициализация ---
// function init() {
//   renderFilters();
//   currentFilter = "all";
//   currentSearchQuery = "";
//   searchInput.value = "";
//   currentDisplayCount = 9; // изначально 9 карточек
//   allFilteredItems = [];
//   renderCards();
//   setupSearch();

//   // обработчик скролла для бесконечной подгрузки
//   window.addEventListener("scroll", handleScroll);
// }

// // Запускаем
// init();
