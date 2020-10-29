// -----------------------------------------
// Webpack. Собираем наш проект.

'use strict';


/* 1) Назначение глобального обработчика событий, который называется DOMContentLoaded */
window.addEventListener('DOMContentLoaded', () => {
    const calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          form = require('./modules/form'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calc();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();
});