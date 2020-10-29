// -----------------------------------------
// Webpack. Собираем наш проект.

// -----------------------------------------
// Собираем наш проект и фиксим баги

import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

/* 1) Назначение глобального обработчика событий, который называется DOMContentLoaded */
window.addEventListener('DOMContentLoaded', () => {
    /* Модальное окно появляется спустя определённый промежуток времени */
    const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000);

    calc();
    cards();
    form('form', modalTimerID);
    modal('[data-modal]', '.modal', modalTimerID);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrov: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-12-30');
});