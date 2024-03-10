import { render, renderNumberOfItems, renderCartTotal } from './functions.js';

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

const promoCodes = ['megaultramaxipromo50', 'kebaboverdose80', 'eat-eat-repeat10', 'fatgang25'];

let numOfItems = products.length;
let cartTotal = 0;
let cartFullPrice = cartTotal;

const tableEl = document.querySelector("table > tbody");

// add products to cart
products.forEach((product, index) => render(product, index, tableEl));

const addButtons = document.querySelectorAll(".add-button");
const removeButtons = document.querySelectorAll(".remove-button");
const totalCost = document.querySelector("#total_cost");
const removeProductBtns = document.querySelectorAll('.remove_product');

renderNumberOfItems(numOfItems); // render number of products added to cart
calcCartTotal(); // calculate cart total
renderCartTotal(cartTotal); // render cart total

addButtons.forEach((button, index) => increaseQuantity(button, index));
removeButtons.forEach((button, index) => decreaseQuantity(button, index));
removeProductBtns.forEach((btn, index) => removeProduct(btn, index));

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const shippingChoice = document.querySelector('select').value;
    const promoCode = document.querySelector('#promo_code').value;
    cartFullPrice = addDeliveryPrice(shippingChoice);
    applyPromoCode(promoCode);
    totalCost.innerHTML = cartFullPrice.toFixed(2) + ' €'; // render the price including delivery and discount if applied 
});

function increaseQuantity(button, index) {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const price = quantityInput.dataset.price;
        quantityInput.value = Number(quantityInput.value) + 1;
        totalPrice.innerText = Number(price * quantityInput.value).toFixed(2) + " €";
        cartTotal += Number(price);
        renderCartTotal(cartTotal);
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
            renderCartTotal(cartTotal);
        }
    });
};

// add each total products prices
function calcCartTotal() {
    const totalPrices = document.querySelectorAll(".total_price");
    let totalText = '';
    totalPrices.forEach(totalPrice => {
        totalText = totalPrice.innerText.replace('€', '');
        cartTotal += Number(totalText);
    });
    //  return cartTotal;
};

function removeProduct(btn, index) {
    btn.addEventListener('click', () => {
        let childToRemove = tableEl.querySelector(`.single_product${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const priceToSubtract = totalPrice.innerHTML.replace('€', '');
        cartTotal -= Number(priceToSubtract);
        tableEl.removeChild(childToRemove);
        numOfItems--;
        // calcCartTotal();
        renderCartTotal();
        renderNumberOfItems(numOfItems);
    });
};

function addDeliveryPrice(shippingChoice) {
    cartFullPrice = cartTotal;
    shippingChoice == 5 && (cartFullPrice += 5);
    shippingChoice == 7 && (cartFullPrice += 7);
    shippingChoice == 12 && (cartFullPrice += 12);
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
    };
};