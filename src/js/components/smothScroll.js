/**
 * Осуществляет плавную прокрутку в начало страницы.
 */
export const smoothscroll = () => {
  // Получаем текущую позицию прокрутки страницы
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;

  // Если текущая позиция прокрутки больше 0, продолжаем плавную прокрутку
  if (currentScroll > 0) {
    // Вызываем requestAnimationFrame для создания анимации
    window.requestAnimationFrame(smoothscroll);

    // Прокручиваем страницу к началу
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
};
