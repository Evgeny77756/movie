/**
 * Компонент спиннер.
 * @param {boolean} isVisible - Показывать/скрывать компонент.
 */
export const toggleSpinner = (isVisible) => {
  const spinner = document.querySelector(".spinner");

  if (spinner && isVisible) {
    spinner.classList.add("show");
  } else if (spinner) {
    spinner.classList.remove("show");
  }
};
