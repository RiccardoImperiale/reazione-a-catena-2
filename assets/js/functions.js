
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
}


// render cart total to order summary
export function renderCartTotal(cartTotal) {
    const totalRender = document.querySelector("#total");
    totalRender.innerHTML = cartTotal.toFixed(2) + ' €';
};


