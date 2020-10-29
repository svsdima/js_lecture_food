function modal() {

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
}

module.exports = modal;