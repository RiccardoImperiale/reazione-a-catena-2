import { render, renderNumberOfItems, calcCartTotal, renderCartTotal, increaseQuantity, decreaseQuantity, removeProduct, submitForm } from './functions.js';

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
let cartFullPrice = calcCartTotal();

const tableEl = document.querySelector("table > tbody");

products.forEach((product, index) => render(product, index, tableEl)); // add products to cart

const addButtons = document.querySelectorAll(".add-button");
const removeButtons = document.querySelectorAll(".remove-button");
const totalCost = document.querySelector("#total_cost");
const removeProductBtns = document.querySelectorAll('.remove_product');

renderNumberOfItems(numOfItems); // render number of products added to cart
calcCartTotal(); // calculate cart total
renderCartTotal(); // render cart total

addButtons.forEach((button, index) => increaseQuantity(button, index));
removeButtons.forEach((button, index) => decreaseQuantity(button, index));
removeProductBtns.forEach((btn, index) => removeProduct(btn, index, tableEl, numOfItems)); // delete product

submitForm(cartFullPrice, promoCodes, totalCost); 