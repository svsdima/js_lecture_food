/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* 1) Назначение глобального обработчика событий, который называется DOMContentLoaded */

window.addEventListener('DOMContentLoaded', () => {
  /* Создаём табы в новом проекте */

  /* Внутри него будут все остальные скрипты, которые будут созданы в этом проекте */

  /* Алгоритм действий:
  - Функция, которая будет скрывать ненужные нам табы,
  - Функция, которая будет показывать нужный нам таб,
  - Назначить обработчик событий на меню, которая будет манипулировать вышеперечисленными функциями  */

  /* Табы на которые мы будем кликать */
  const tabs = document.querySelectorAll('.tabheader__item'),

  /* Весь контент, который будет находится в нашей вёрстке */
  tabsContent = document.querySelectorAll('.tabcontent'),

  /* Родитель, который будет содержать все эти табы */
  tabsParent = document.querySelector('.tabheader__items');
  /* Скрываем все ненужные нам табы */

  function hideTabContent() {
    /* Скрываем табы */
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    /* У каждого из элементов табов удаляем класс активности */

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  /* Показывает табы и создаём класс активности*/


  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  /* Используем делигирование событий и назначаем обработчик события клика */

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // -------------------------------------------------------------------------------------------------------------

  /* Создаём таймер обратного отсчёта на сайте */

  /* - Должна быть функция, которая будет устанавливать таймер
     - Должна быть функция, которая будет определять разницу между временем
     - Должна быть функция, которая будет обновлять наш таймер  */

  /* Отправная точка */

  const deadline = '2020-11-13';

  function getTimeRemaining(endtime) {
    /* Получаем кол-во миллисекунд, которая будет в конечном времени (до которого нужно досчитать) - новая дата. Получаем разницу в миллисекундах */
    const t = Date.parse(endtime) - Date.parse(new Date()),

    /* Кол-во дней, которые будут отображаться в таймере */

    /* Math.floor - округление до ближайшего целого */
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  /* Добавляем 0 в значении меньше 10 (09, 08, 07) */


  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  /* Устанавливаем часы на страницу */


  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    /* Запускаем заранее обновление часов, чтобы избежать загрузки на самой странице */

    updateClock();
    /* Обновление часов */

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // -------------------------------------------------------------------------------------------------------------

  /* Создаём модальное окно */

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
  /* Создаём функцию открытия модального окна */

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }

  modalTrigger.forEach(btn => {
    /* Открываем модальное окно */
    btn.addEventListener('click', openModal);
  });
  /* Создаём функцию закрытия модального окна */

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
  }
  /* Закрываем модальное окно */


  modalCloseBtn.addEventListener('click', closeModal);
  /* Делаем подложку (кликаем на тёмный фон и модальное окно закрывается) */

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  /* Закрываем модальное окно при помощи клавиши ESC */

  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  }); // -------------------------------------------------------------------------------------------------------------

  /* Модификации модального окна */

  /* Модальное окно появляется спустя определённый промежуток времени */
  // const modalTimerID = setTimeout(openModal, 5000);

  /* Функция если пользователь долистал до конца, показать модальное окно */

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      /* Как только один раз высветится модальное окно, событие удалится и больше показываться не будет */

      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  /* Если пользователь долистал до конца, показать модальное окно */


  window.addEventListener('scroll', showModalByScroll); // -------------------------------------------------------------------------------------------------------------

  /* Используем классы в реальной работе*/

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    /* Меняем гривны в доллары */


    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    /* Формируем вёрстку */


    render() {
      const element = document.createElement('div');
      element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu .container').render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 12, '.menu .container').render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 6, '.menu .container').render();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map