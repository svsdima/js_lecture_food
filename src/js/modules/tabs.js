function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   /* Создаём табы в новом проекте */

    /* Внутри него будут все остальные скрипты, которые будут созданы в этом проекте */

    /* Алгоритм действий:
    - Функция, которая будет скрывать ненужные нам табы,
    - Функция, которая будет показывать нужный нам таб,
    - Назначить обработчик событий на меню, которая будет манипулировать вышеперечисленными функциями  */

    /* Табы на которые мы будем кликать */
    const tabs = document.querySelectorAll(tabsSelector),
        /* Весь контент, который будет находится в нашей вёрстке */
          tabsContent = document.querySelectorAll(tabsContentSelector),
          /* Родитель, который будет содержать все эти табы */
          tabsParent = document.querySelector(tabsParentSelector);

    /* Скрываем все ненужные нам табы */
    function hideTabContent() {
        /* Скрываем табы */
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        /* У каждого из элементов табов удаляем класс активности */
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    /* Показывает табы и создаём класс активности*/
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    /* Используем делигирование событий и назначаем обработчик события клика */
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
}

export default tabs;