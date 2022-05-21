'use strict';

let burgerPopup = document.querySelector('.burgerPopup');
let filter_t = document.querySelector('.filter_t');
filter_t.addEventListener('click', function () {
    burgerPopup.classList.toggle('hidden');
    filter_t.classList.toggle('filter_tPink');
});