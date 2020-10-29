function timer(id, deadline) {
    // -------------------------------------------------------------------------------------------------------------
    /* Создаём таймер обратного отсчёта на сайте */

 /* - Должна быть функция, которая будет устанавливать таймер
    - Должна быть функция, которая будет определять разницу между временем
    - Должна быть функция, которая будет обновлять наш таймер  */

   

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

    setClock(id, deadline);
}

export default timer;