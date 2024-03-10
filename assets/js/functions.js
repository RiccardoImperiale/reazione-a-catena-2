
export function render(product, index, tableEl) {
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

export function renderNumberOfItems(numOfItems) {
    const itemElemets = document.getElementById('items');
    const cartItems = document.getElementById('cart_items');
    // render number of products added to cart
    itemElemets.innerHTML = `${numOfItems} Items`;
    cartItems.innerHTML = `ITEMS - ${numOfItems}`;
};

// add each total products prices
export function calcCartTotal() {
    let cartTotal = 0;
    const totalPrices = document.querySelectorAll(".total_price");
    let totalText = '';
    totalPrices.forEach(totalPrice => {
        totalText = totalPrice.innerText.replace('€', '');
        cartTotal += Number(totalText);
    });
    return cartTotal;
};

// render cart total to order summary
export function renderCartTotal() {
    let cartTotal = calcCartTotal()
    const totalRender = document.querySelector("#total");
    totalRender.innerHTML = cartTotal.toFixed(2) + ' €';
};

export function increaseQuantity(button, index) {
    button.addEventListener('click', () => {
        let cartTotal = calcCartTotal();
        const quantityInput = document.getElementById(`quantity${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const price = quantityInput.dataset.price;
        quantityInput.value = Number(quantityInput.value) + 1;
        totalPrice.innerText = Number(price * quantityInput.value).toFixed(2) + " €";
        cartTotal += Number(price);
        renderCartTotal();
    });
};

export function decreaseQuantity(button, index) {
    button.addEventListener('click', () => {
        let cartTotal = calcCartTotal()
        const quantityInput = document.getElementById(`quantity${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const price = quantityInput.dataset.price;
        const finalPrice = totalPrice.innerText.replace('€', '');

        if (Number(quantityInput.value) > 1) {
            quantityInput.value = Number(quantityInput.value) - 1;
            totalPrice.innerText = Number(finalPrice - price).toFixed(2) + " €";
            cartTotal -= Number(price);
            renderCartTotal();
        }
    });
};

export function removeProduct(btn, index, tableEl, numOfItems) {
    btn.addEventListener('click', () => {
        let cartTotal = calcCartTotal()
        let childToRemove = tableEl.querySelector(`.single_product${index}`);
        const totalPrice = document.getElementById(`total_price${index}`);
        const priceToSubtract = totalPrice.innerHTML.replace('€', '');
        cartTotal -= Number(priceToSubtract);
        tableEl.removeChild(childToRemove);
        numOfItems--;
        renderCartTotal(cartTotal);
        renderNumberOfItems(numOfItems);
    });
};

export function addDeliveryPrice(shippingChoice, cartFullPrice, cartTotal) {
    cartFullPrice = cartTotal;
    shippingChoice == 5 && (cartFullPrice += 5);
    shippingChoice == 7 && (cartFullPrice += 7);
    shippingChoice == 12 && (cartFullPrice += 12);
    return cartFullPrice;
};

export function addPromoCode(promoCode, cartFullPrice, promoCodes) {
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

    return cartFullPrice;
};

export function submitForm(cartFullPrice, promoCodes, totalCost) {
    let cartTotal = calcCartTotal();

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const shippingChoice = document.querySelector('select').value;
        const promoCode = document.querySelector('#promo_code').value;
        cartFullPrice = addDeliveryPrice(shippingChoice, cartFullPrice, cartTotal);
        cartFullPrice = addPromoCode(promoCode, cartFullPrice, promoCodes);
        totalCost.innerHTML = cartFullPrice.toFixed(2) + ' €'; // render the price including delivery and discount if applied 
    });
};