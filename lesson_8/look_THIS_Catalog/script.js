'use strict'

let mainscreen_dark = document.querySelector('.mainscreen_dark');
let menu_image = document.querySelector('.menu_image');

menu_image.addEventListener('click', function() {
    mainscreen_dark.classList.toggle('hidden');
});