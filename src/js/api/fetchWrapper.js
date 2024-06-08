/**
 * Класс для обертки HTTP-запросов с использованием fetch API.
 * @class
 */
export default class FetchWrapper {
  /**
   * Создает новый экземпляр класса FetchWrapper с указанным базовым URL.
   * @constructor
   * @param {string} baseURL - Базовый URL для формирования полных URL запросов.
   */
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Выполняет общий запрос с использованием fetch API.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @param {string} method - HTTP метод (GET, POST, PUT, PATCH, DELETE).
   * @param {Object} [data] - Данные, которые будут отправлены в теле запроса (для POST, PUT, PATCH).
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   * @private
   */
  async _request(endpoint, method, data) {
    const fullUrl = this.baseURL + endpoint;
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(fullUrl, config);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Ошибка HTTP ${response.status}: ${response.statusText} - ${errorDetails}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(
        `Ошибка при выполнении ${method}-запроса по адресу ${fullUrl}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Выполняет GET-запрос для получения данных по указанному endpoint.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   */
  async get(endpoint) {
    return this._request(endpoint, "GET");
  }

  /**
   * Выполняет POST-запрос для отправки данных по указанному endpoint.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @param {Object} data - Данные, которые будут отправлены в теле POST-запроса.
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   */
  async post(endpoint, data) {
    return this._request(endpoint, "POST", data);
  }

  /**
   * Выполняет PUT-запрос для обновления данных по указанному endpoint.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @param {Object} data - Данные, которые будут отправлены в теле PUT-запроса.
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   */
  async put(endpoint, data) {
    return this._request(endpoint, "PUT", data);
  }

  /**
   * Выполняет PATCH-запрос для частичного обновления данных по указанному endpoint.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @param {Object} data - Данные, которые будут отправлены в теле PATCH-запроса.
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   */
  async patch(endpoint, data) {
    return this._request(endpoint, "PATCH", data);
  }

  /**
   * Выполняет DELETE-запрос для удаления данных по указанному endpoint.
   * @param {string} endpoint - Конечная точка, к которой будет выполнен запрос.
   * @returns {Promise<Object>} - Данные ответа в формате JSON.
   */
  async delete(endpoint) {
    return this._request(endpoint, "DELETE");
  }
}
