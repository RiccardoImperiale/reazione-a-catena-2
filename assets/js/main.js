// import { render, renderNumberOfItems, increaseQuantity, decreaseQuantity, renderTotalPrices, updateCartTotal, removeProduct, addDeliveryPrice, applyPromoCode } from './functions.js';

const products = [
    {
        image: 'burger.png',
        name: 'Burger',
        quantity: 1,
        price: 8.52,
    },
    {
        image: 'french-fries.png',
        name: 'French Fries',
        quantity: 2,
        price: 5.50,
    },
    {
        image: 'kebab.png',
        name: 'Kebab',
        quantity: 3,
        price: 7.00,
    },
    {
        image: 'pizza.png',
        name: 'Pizza',
        quantity: 1,
        price: 10.00,
    }
];

let numOfItems = products.length;
let cartTotal = 0;
let cartFullPrice = cartTotal;


const promoCodes = ['megaultramaxipromo50', 'kebaboverdose80', 'eat-eat-repeat10', 'fatgang25'];

const tableEl = document.querySelector("table > tbody");

products.forEach((product, index) => render(product, index));

const addButtons = document.querySelectorAll(".add-button");
const removeButtons = document.querySelectorAll(".remove-button");
const totalRender = document.querySelector("#total");
const totalCost = document.querySelector("#total_cost");
const removeProductBtns = document.querySelectorAll('.remove_product');
const itemElemets = document.getElementById('items');
const cartItems = document.getElementById('cart_items');
const totalPrices = document.querySelectorAll(".total_price");

renderNumberOfItems();
renderTotalPrices();
updateCartTotal();

addButtons.forEach((button, index) => increaseQuantity(button, index));
removeButtons.forEach((button, index) => decreaseQuantity(button, index));
removeProductBtns.forEach((btn, index) => removeProduct(btn, index));

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const shippingChoice = document.querySelector('select').value;
    const promoCode = document.querySelector('#promo_code').value;
    cartFullPrice = addDeliveryPrice(shippingChoice);
    applyPromoCode(promoCode);
});



function render(product, index) {
    const { image, name, quantity, price } = product;

    const markup = `<tr class='single_product${index}'>
                        <td class="d-flex"> <img src="./assets/img/${image}" alt="">
                            <div class="align-self-center">
                                <h3>${name}</h3>
                                <a class='remove_product' href="#">Remove</a>
                            </div>
                        </td>
                        <td class="textalign-center">
                            <button class="remove-button" class="quantity_button" data-index="${index}">-</button>
                            <input id="quantity${index}" data-price="${price}" type="number" disabled class="quantity_input" value="${quantity}">
                            <button class="add-button" class="quantity_button" data-index="${index}">+</button>
                        </td>
                        <td class="textalign-center">${(price).toFixed(2)} €</td>
                        <td id="total_price${index}" class="total_price textalign-center">${(price * quantity).toFixed(2)} €</td>
                    </tr>`
    tableEl.insertAdjacentHTML('beforeend', markup);
};

function renderNumberOfItems() {
    itemElemets.innerHTML = `${numOfItems} Items`;
    cartItems.innerHTML = `ITEMS - ${numOfItems}`;
}

function increaseQuantity(button, index) {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const price = quantityInput.dataset.price;
        quantityInput.value = Number(quantityInput.value) + 1;
        totalPrice.innerText = Number(price * quantityInput.value).toFixed(2) + " €";
        cartTotal += Number(price);
        updateCartTotal();
    });
};

function decreaseQuantity(button, index) {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const price = quantityInput.dataset.price;
        const finalPrice = totalPrice.innerText.replace('€', '');

        if (Number(quantityInput.value) > 1) {
            quantityInput.value = Number(quantityInput.value) - 1;
            totalPrice.innerText = Number(finalPrice - price).toFixed(2) + " €";
            cartTotal -= Number(price);
            updateCartTotal();
        }
    });
};

function renderTotalPrices() {
    let totalText = '';
    totalPrices.forEach(totalPrice => {
        totalText = totalPrice.innerText.replace('€', '');
        cartTotal += Number(totalText);
    });
};

function updateCartTotal() {
    cartTotal = Number(cartTotal);
    totalRender.innerHTML = cartTotal.toFixed(2) + ' €';
};

function removeProduct(btn, index) {
    btn.addEventListener('click', () => {
        let childToRemove = tableEl.querySelector(`.single_product${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const priceToSubtract = totalPrice.innerHTML.replace('€', '');
        cartTotal -= Number(priceToSubtract);
        tableEl.removeChild(childToRemove);
        numOfItems--;
        updateCartTotal(cartTotal, totalRender);
        renderNumberOfItems(numOfItems);
    });
};

function addDeliveryPrice(shippingChoice) {
    cartFullPrice = cartTotal;
    shippingChoice == 5 && (cartFullPrice += 5);
    shippingChoice == 7 && (cartFullPrice += 7);
    shippingChoice == 12 && (cartFullPrice += 12);
    totalCost.innerHTML = cartFullPrice.toFixed(2) + ' €';
    return cartFullPrice;
};

function applyPromoCode(promoCode) {
    const promoMessage = document.getElementById('promoCodeMsg');
    promoMessage.innerText = '';

    if (promoCode == '') {
        promoMessage.innerText = '';
    } else if (!promoCodes.includes(promoCode)) {
        promoMessage.innerText = 'Invalid Promo Code :(';
        promoMessage.style.color = '#fa7272';
    } else {
        promoCode == 'megaultramaxipromo50' && (cartFullPrice -= cartFullPrice / 100 * 50);
        promoCode == 'kebaboverdose80' && (cartFullPrice -= cartFullPrice / 100 * 80);
        promoCode == 'fatgang25' && (cartFullPrice -= cartFullPrice / 100 * 25);
        promoCode == 'eat-eat-repeat10' && (cartFullPrice -= cartFullPrice / 100 * 10);
        promoMessage.innerText = `${promoCode.slice(-2)}% Promo Applied :)`
        promoMessage.style.color = '#58c46a';
        totalCost.innerHTML = cartFullPrice.toFixed(2) + ' €';
    };
};