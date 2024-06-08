import FetchWrapper from "./fetchWrapper.js";
import { toggleSpinner } from "../components/spinner.js";
import { global } from "../global.js";

/**
 * Выполняет запрос к API с использованием указанной конечной точки (endpoint).
 * Получает данные с API, используя глобальный API ключ и URL.
 * Отображает спиннер загрузки во время выполнения запроса.
 *
 * @param {string} endpoint - Конечная точка API, к которой нужно выполнить запрос.
 * @returns {Promise<Object>} Возвращает промис с результатами запроса в формате JSON.
 * @throws {Error} Бросает ошибку в случае неудачного запроса или проблем с сетью.
 */
export const getData = async (endpoint) => {
  const API_KEY = global.api.apiKey; // Получаем API ключ из глобального объекта
  const API_URL = global.api.apiUrl; // Получаем URL API из глобального объекта

  const fetchWrapper = new FetchWrapper(API_URL);

  toggleSpinner(true);

  try {
    const separator = endpoint.includes("?") ? "&" : "?"; // Проверяем наличие параметров в endpoint

    const fullEndpoint = `${endpoint}${separator}api_key=${API_KEY}&language=en-US`;

    const data = await fetchWrapper.get(fullEndpoint);

    return data;
  } catch (error) {
    console.error(`Ошибка при выполнении запроса к API: ${endpoint}`, error);

    throw error;
  } finally {
    toggleSpinner(false);
  }
};
