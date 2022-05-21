'use strict'

const purchasesDataEl = document.querySelector('.b-purchases_data');
const basketProductsEl = document.querySelector('.b-purchases_data__user');
const basketQuantityEl = document.querySelector('.basket_number');

/**
 * Выводит значение длины объекта (количество предметов в корзине на
 * иконке корзины)
 */
const printQuantity = () => {
    let lenght = purchasesDataEl.querySelector('.b-purchases_data__user')
        .children.length;
    basketQuantityEl.textContent = lenght;
};

/**
 * Выводит значение стоимости товара одного объекта в корзине,
 * когда увеличиваем/уменьшаем количество
 * @param {object} currentCart - конкретная карта в которой происходит расчет
 */
const summChanged = (currentCart) => {
    let priceItem = currentCart.querySelector('.b-purchases_data__p_pPrice');
    let countItem = currentCart.querySelector('.b-purchases_data__p_pCountInner');
    let summItem = currentCart.querySelector('.b-purchases_data__p_pSumm');
    //значение стоимости умножаем на количество
    summItem.innerText = '$ ' + (+(priceItem.textContent.substring(2))
        * parseInt(countItem.textContent)).toFixed(2);
};

/**
 * Выводит значение итоговой стоимости всех товаров в корзине
 */
const totalPrice = () => {
    const cardItems = document.querySelectorAll('.b-purchases_data__p');
    let totalPrice = 0;

    cardItems.forEach(item => {
        const summItems = item.querySelector('.b-purchases_data__p_pSumm');
        const innerTotalPrice = document.querySelector('.b-purchases_data__totalPrice_summ');
        totalPrice = totalPrice + +(summItems.textContent.substring(2));
        innerTotalPrice.innerText = '$ ' + totalPrice.toFixed(2);
    })
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('c_card_button')) {
        const card = e.target.closest('.c_catalog_card_n');

        /**
         * Удаляет из строки возможные пробелы
         * @param {string} str строка
         * @returns {string} строка без пробелов
         */
        const priceWithoutSpaces = (str) => {
            return str.replace(/\s/g, '');
        };

        //Объект принимающий значения товаров на странице, выбранных пользователем
        const productInfo = {
            id: card.dataset.id,
            title: card.querySelector('.c_catalog_card_h').innerText,
            price: priceWithoutSpaces(card.querySelector('.c_price').innerText),
        };

        let innerCounter = 1;
        let summ = (innerCounter * +(productInfo.price)).toFixed(2);

        /**
         * Вставляет в корзину выбранный пользователем товар
         */
        const generateBasketProduct = `<div class="b-purchases_data__p"
            data-id="${productInfo.id}">
            <div class="b-purchases_data__p_pName">${productInfo.title}</div>
            <div class="b-purchases_data__p_pCount">
            <div class="b-purchases_data__p_pCountInner" data-counter>${innerCounter}</div><span>шт.</span>
            <button class="b-purchases_data__p_pCountBtn plus" data-action="plus">
            +</button>
            <button class="b-purchases_data__p_pCountBtn minus" data-action="minus">
            -</button>
            </div>
            <div class="b-purchases_data__p_pPrice">$ ${productInfo.price}</div>
            <div class="b-purchases_data__p_pSumm">$ ${summ}</div>
            </div>`;

        basketProductsEl.insertAdjacentHTML('afterbegin', generateBasketProduct);
        printQuantity();


        const itemInCart = document.querySelector(`[data-id="${productInfo.id}"]`);

        /**
         * Удаляет из корзины товар, если его количество будет меньше 1
         * @param {object} itemInCart конкретный товар в корзине
         */
        function deleteItemInCart(itemInCart) {
            itemInCart.remove();
        }

        //Обработка событий кликов пользователя на кнопки + и -
        const currentCart = document.querySelector('.b-purchases_data__p');
        const btnPlusEl = currentCart.querySelector('.plus');
        const btnMinusEl = currentCart.querySelector('.minus');
        btnPlusEl.addEventListener('click', (event) => {
            let innerCounter = currentCart.querySelector('.b-purchases_data__p_pCountInner');
            innerCounter.innerText = ++(innerCounter.textContent);
            summChanged(currentCart);
        });
        btnMinusEl.addEventListener('click', (event) => {
            let innerCounter = currentCart.querySelector('.b-purchases_data__p_pCountInner');
            if (+innerCounter.textContent > 1) {
                innerCounter.innerText = --(innerCounter.textContent);
            } else if (+innerCounter.textContent <= 1) {
                itemInCart.remove();
                deleteItemInCart()
                printQuantity();
            };
            summChanged(currentCart);
        });
    };
    totalPrice();
});