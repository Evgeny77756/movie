import { API_KEY } from "../../tokens.js";

/**
 * Глобальный объект для хранения состояния приложения.
 * @type {Object}
 * @property {string} currentPage - Текущий путь страницы.
 * @property {Object} api - Настройки API.
 * @property {string} api.apiKey - Ключ API для доступа к The Movie Database.
 * @property {string} api.apiUrl - URL базового API The Movie Database.
 * @property {Object} search - Параметры поиска.
 * @property {string} search.term - Поисковый запрос.
 * @property {string} search.type - Тип поиска (movie, tv и т.д.).
 * @property {number} search.page - Текущая страница результатов поиска.
 * @property {number} search.totalPages - Общее количество страниц результатов поиска.
 * @property {number} search.totalResults - Общее количество результатов поиска.
 * @property {number} search.maxCountResults - Максимальное количество результатов на странице.
 */
export const global = {
  currentPage: window.location.pathname,
  api: {
    apiKey: API_KEY,
    apiUrl: "https://api.themoviedb.org/3/",
  },
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
    maxCountResults: 20,
  },
};
