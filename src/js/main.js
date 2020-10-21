

// 'use strict';

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        6,
        '.menu .container',
        'menu__item',
        'big'
    ).render();


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
       postData(item);
   });

   function postData(form) {
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

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                showThanksModal(message.succes);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
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
});