function form() {
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
}

module.exports = form;