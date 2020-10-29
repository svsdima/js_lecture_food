function notification() {
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

module.exports = notification;