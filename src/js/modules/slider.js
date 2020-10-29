function slider() {
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

}

module.exports = slider;