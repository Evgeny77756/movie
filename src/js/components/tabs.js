/**
 * Компонент для переключения вкладок (табы).
 */
export const tabsComponent = () => {
  // Получаем доступ к контейнеру вкладок
  const tabs = document.querySelector(".tabs");

  // Получаем доступ ко всем кнопкам вкладок и к содержимому вкладок
  const tabsBtn = document.querySelectorAll(".tabs__btn");
  const tabsContent = document.querySelectorAll(".tabs__content");

  if (tabs) {
    // Добавляем обработчик клика на контейнер вкладок
    tabs.addEventListener("click", (e) => {
      // Проверяем, что клик произошел на кнопке вкладки
      if (e.target.classList.contains("tabs__btn")) {
        // Получаем значение атрибута data-tabs-path выбранной кнопки вкладки
        const tabsPath = e.target.dataset.tabsPath;
        // Удаляем класс "tabs__btn--active" у всех кнопок вкладок
        tabsBtn.forEach((el) => el.classList.remove("tabs__btn--active"));
        // Добавляем класс "tabs__btn--active" к выбранной кнопке вкладки
        e.target.classList.add("tabs__btn--active");
        // Вызываем функцию для обработки вкладок с переданным значением data-tabs-path
        tabsHandler(tabsPath);
      }
    });
  }

  // Функция для обработки вкладок
  const tabsHandler = (path) => {
    // Скрываем все содержимое вкладок
    tabsContent.forEach((el) => el.classList.remove("tabs__content--active"));

    // Показываем содержимое вкладки с переданным значением data-tabs-target
    document
      .querySelector(`[data-tabs-target="${path}"]`)
      .classList.add("tabs__content--active");
  };
};
