import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

/**
 * Инициализация слайдера Swiper.
 * Настраивает параметры для отображения нескольких слайдов, автопрокрутки и т.д.
 */
export const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    modules: [Scrollbar],
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
};
