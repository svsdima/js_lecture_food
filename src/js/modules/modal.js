/* Создаём функцию открытия модального окна */
function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";

    console.log(modalTimerID);
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
}

/* Создаём функцию закрытия модального окна */
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerID) {

    // -------------------------------------------------------------------------------------------------------------
    /* Создаём модальное окно */

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        /* Открываем модальное окно */
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });

    /* Закрываем модальное окно */

    /* Делаем подложку (кликаем на тёмный фон и модальное окно закрывается) */
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    /* Закрываем модальное окно при помощи клавиши ESC */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // -------------------------------------------------------------------------------------------------------------
    /* Модификации модального окна */

    /* Функция если пользователь долистал до конца, показать модальное окно */
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerID);
            /* Как только один раз высветится модальное окно, событие удалится и больше показываться не будет */
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    /* Если пользователь долистал до конца, показать модальное окно */
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};