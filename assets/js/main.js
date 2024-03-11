import { render, renderNumberOfItems, calcCartTotal, renderCartTotal, increaseQuantity, decreaseQuantity, removeProduct, submitForm } from './functions.js';
import { Product } from './classes/Product.js';

const products = [
    new Product('burger.png', 'Burger', 1, 8.00),
    new Product('french-fries.png', 'French Fries', 2, 5.50),
    new Product('kebab.png', 'Kebab', 3, 7.00),
    new Product('pizza.png', 'Pizza', 1, 10.00),
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