

'use strict';

const { OutgoingMessage } = require("http");

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
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });

    // -------------------------------------------------------------------------------------------------------------
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
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
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

    setClock('.timer', deadline);

    // -------------------------------------------------------------------------------------------------------------
    /* Создаём модальное окно */

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

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

    /* Делаем подложку (кликаем на тёмный фон и модальное окно закрывается) */
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    /* Закрываем модальное окно при помощи клавиши ESC */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // -------------------------------------------------------------------------------------------------------------
    /* Модификации модального окна */

    /* Модальное окно появляется спустя определённый промежуток времени */
    const modalTimerID = setTimeout(openModal, 50000);

    /* Функция если пользователь долистал до конца, показать модальное окно */
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            /* Как только один раз высветится модальное окно, событие удалится и больше показываться не будет */
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    /* Если пользователь долистал до конца, показать модальное окно */
    window.addEventListener('scroll', showModalByScroll);

    // -------------------------------------------------------------------------------------------------------------
    /* Используем классы в реальной работе*/

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
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
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
       };

    /* Создаём новые карточки */
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // getResource('http://localhost:3000/menu')
    //    .then(data => createCard(data));

    axios.get('http://localhost:3000/menu')
    .then(data => createCard(data.data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');

            element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> руб/день</div>
            </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }


    // -------------------------------------------------------------------------------------------------------------
    /* Реализация скрипта отправки данных на сервер*/

   /*  Формы */
   const forms = document.querySelectorAll('form');

   const message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
       bindPostData(item);
   });

   const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
   };

   function bindPostData(form) {
       form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        // form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        postData('http://localhost:3000/requests', JSON.stringify(object))
        .then(data => {
            console.log(data);
            showThanksModal(message.succes);
            form.reset();
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        });

       });
   }


   // -------------------------------------------------------------------------------------------------------------
    /* Красивое оповещение пользователя*/

   function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 40000);
   }


   // -------------------------------------------------------------------------------------------------------------
    /* Fetch API*/

    /* API - application programming interface - программный интерфейс приложения, интерфейс прикладного программирования */
    /* API набор данных и возможностей, которые предоставляют какое-то готовое решение */
    /* DOM API  */
    /* Google Maps API */
    /* Fetch API позволяет общаться с сервером и построена на промисах */
   /*  https://jsonplaceholder.typicode.com */
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: "Дмитрий"}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));


    // -------------------------------------------------------------------------------------------------------------
    /* Подробно про npm и проект. JSON-server*/

    /* Установил пакет json-server при помощи терминала: npm i json-server --save-dev */
    /* В корневую папку проекта добавил базу данных db.json */

    fetch('http://localhost:3000')
        .then(data => data.json())
        .then(res => console.log(res));


   // -------------------------------------------------------------------------------------------------------------
    /* Получение данных с сервера. Async_Awayt (ES8)*/

    // -------------------------------------------------------------------------------------------------------------
    /* Что такое библиотеки. Библиотеки axios */


    // -------------------------------------------------------------------------------------------------------------
    /* Создаём слайдер на сайте. вариант 1 */

    /* Получаем элементы страницы */
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    /* Индекс, который определяет текущее положение в слайдере */
    let slideIndex = 1;
    let offset = 0;

    // /* Вызываем скрипт слайдера */
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // /* Функция показа и скрытия слайда */
    // function showSlides(n) {
    //     /* Если ушли в последний слайд при нажатий направо перемещаемся в первый слайд */
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     /* В первом слайде при нажатий налево перемещаемся в последний слайд */
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     /* Скрываем все слайды */
    //     slides.forEach(item => item.style.display = 'none');

    //     /* Показываем слайд */
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // /* При переключении меняем индекс */
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });


    // -------------------------------------------------------------------------------------------------------------
    /* Создаём слайдер на сайте. вариант 2 (карусель) */

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    /* Создаём пространство, внутри которого будут расположены слайды */
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    // function deleteNotDigits(src) {
    //     return +str.replace(/\D/g, '');
    // }

    /* Передвигаем изображения */
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px'
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideLength();

        dotEach();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // '500px'
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideLength();

        dotEach();
    });


    // -------------------------------------------------------------------------------------------------------------
    /* Создаём навигацию для слайдов */

    slider.style.position = 'relative';

    /* ordered list */
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if  (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            slideLength();

            dotEach();
        });
    });

    function dotEach() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function slideLength() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // -------------------------------------------------------------------------------------------------------------
    /* Регулярные выражения */


    // -------------------------------------------------------------------------------------------------------------
    /* Создаём калькулятор на сайте, часть 1, часть 2 */
    /* Суточную норму каллорий считаем по ссылке https://fitseven.ru/zdorovie/metabolism/sutochnaya-norma-kaloriy */

    const result = document.querySelector('.calculating__result span');


    let sex, height, weight, age, ratio;
    
    if (localStorage.getItem('sex')) {
        let sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        let ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass ) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    /* Подсчёт результата */
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Расчёт';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    /* Собираем информацию */
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');


});