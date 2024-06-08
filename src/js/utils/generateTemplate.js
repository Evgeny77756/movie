import { getData } from "../api/getData";
import { Sidebar } from "../components/sidebar.js";
import { initSwiper } from "../components/swiper.js";

/**
 * Функция для генерации и отображения контента в слайдере или без.
 * @param {Array} data - Массив объектов данных о фильмах/сериалах.
 * @param {Object} options - Объект с настройками:
 * @param {string} options.containerSelector - Селектор родитель, в который будут добавлены элементы.
 * @param {boolean} options.useSlider - Использовать/неиспользовать слайдер.
 */
export const generateTemplate = (data, options) => {
  const { containerSelector, useSlider = false } = options;

  data.forEach((content) => {
    const template = `
    <div class="${useSlider ? "swiper-slide card" : "card"}" data-id="${
      content?.id
    }">
    <img src="https://image.tmdb.org/t/p/${useSlider ? "w500" : "w300"}${
      content?.poster_path
    }" alt="${content?.title || content?.name}" />
    <h3 class="${useSlider ? "slider-rating" : "card-rating"}">
      <svg class="rating" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.15336 2.33977L10.3267 4.68643C10.4867 5.0131 10.9134 5.32643 11.2734 5.38643L13.4 5.73977C14.76 5.96643 15.08 6.9531 14.1 7.92643L12.4467 9.57977C12.1667 9.85977 12.0134 10.3998 12.1 10.7864L12.5734 12.8331C12.9467 14.4531 12.0867 15.0798 10.6534 14.2331L8.66003 13.0531C8.30003 12.8398 7.7067 12.8398 7.34003 13.0531L5.3467 14.2331C3.92003 15.0798 3.05336 14.4464 3.4267 12.8331L3.90003 10.7864C3.9867 10.3998 3.83336 9.85977 3.55336 9.57977L1.90003 7.92643C0.926698 6.9531 1.24003 5.96643 2.60003 5.73977L4.7267 5.38643C5.08003 5.32643 5.5067 5.0131 5.6667 4.68643L6.84003 2.33977C7.48003 1.06643 8.52003 1.06643 9.15336 2.33977Z" stroke="#FFAD49" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${content?.vote_average?.toFixed(1)} / 10
    </h3>
    <div class="${useSlider ? "slider-descr" : "card-descr"}">
      <h3 class="${useSlider ? "slider-title" : "card-title"}">${
      content?.title || content?.name
    }</h3>
      <p>Release: <small>${content?.release_date}</small></p>
    </div>
  </div>
    `;

    document
      .querySelector(containerSelector)
      .insertAdjacentHTML("beforeend", template);
  });

  // Добавить обработчик клика на карточки после их вставки в DOM
  attachListeners();

  // Инициализация слайдера, если передан параметр
  useSlider && initSwiper();
};

/**
 * Функция для генерации и отображения детальной информации по фильму/сериалу.
 * @param {Object} data - Объект с данными о фильмах/сериалах.
 * @param {Object} options - Объект с настройками:
 * @param {string} options.containerSelector - Селектор родитель, в который будут добавлены элементы.
 */
export const generateTemplateForDetails = (data, options) => {
  // Извлекаем данные из API по фильму/сериалу
  const { original_title, overview } = data;

  console.log("Data: ", data);
  const imgDetail = data.poster_path;

  // const imgDetail = data.
  // Извлекаем опции для отрисовки
  const { containerSelector } = options;

  // Получение родительского узла сайдбара
  const parentElement = document.querySelector(containerSelector);

  // Очистка перед ноой отрисовкой
  parentElement.innerHTML = "";

  const template = `
    <div class="details-card" data-id="">
      <div class="card-descr">
        <h3 class="card-title">${original_title}</h3>
        <p>${overview}</p>
        <br>
        <h3>Release Date:  ${data.release_date}</h3>
        <br>
        <a href="${data.homepage}">Homepage to watch trailer</a>
        <div class="details-card-img-block">
        <img src="https://image.tmdb.org/t/p/w300${data?.poster_path}" alt="${
          data?.title || data?.name
        }" class="details-card-img"/>
        
        </div>
      </div>
    </div>
    `;

  document
    .querySelector(containerSelector)
    .insertAdjacentHTML("beforeend", template);
};

/**
 * Функция для обработки клика на карточке фильма/сериала и получения информации.
 * @param {Event} event - Событие клика.
 */
const handleCardClickAndGetData = async (event) => {
  // Обработка клика по div и получение data-id через дочерний элемент
  const id = event?.currentTarget?.dataset?.id;

  // Запрос на получение фильма по id
  const data = await getData(`movie/${id}`);

  id && openSidebar(id);

  // Генерируем детальную информацию по карточке.
  generateTemplateForDetails(data, { containerSelector: "#sidebar-list" });
};

/**
 * Функция для прикрепления обработчика события клика к карточкам фильмов/сериалов.
 */
const attachListeners = () => {
  const cards = document.querySelectorAll("[data-id]");
  cards.forEach((card) =>
    card.addEventListener("click", handleCardClickAndGetData)
  );
};

/**
 * Функция для открытия сайдбара с деталями по фильму/сериалу.
 * @param {string} id - id фильма/сериала, для открытия детальной информации и выполнения запроса.
 */
export const openSidebar = async (id) => {
  new Sidebar("#sidebar", `[data-id="${id}"]`, "right").open(); // Открываем сайдбар
};
