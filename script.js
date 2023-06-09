const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnIncrease = $('#btn-increase');
const $btnDecrease = $('#btn-decrease');
const $amountToAdd = $('#amount-to-add');
const $mainImg = $('#main-img');
const $nextImg = $('#next-img');
const $prevImg = $('#prev-img');
const $modal = $('#modal');
const $burger = $('#burger');
const $sideMenu = $('#side-menu');
const $iconClose = $('#icon-close');
const $cartBox = $('#cart-box');
const $cartIcon = $('#cart-icon');
const $btnAddCart = $('#btn-add-to-cart');
const $price = $('#price');
const $productTitle = $('#product-title');
const $cartAmountIcon = $('#cart-amount-icon');
const $cartBoxBody = $('#cart-box-body');
const $cartEmpty = $('#cart-empty');
const $checkoutButton = $('#checkout-button');

var cartItems = [];

// Functions

const cartAmountIconChange = () => {
    const oldAmount = parseInt($cartAmountIcon.innerText);
    let totalAmount = 0
    cartItems.forEach((item) => {
        totalAmount += item.amount
    })
    $cartAmountIcon.innerText = totalAmount.toString()
    if (oldAmount === 0 || totalAmount === 0) {
        $cartAmountIcon.classList.toggle('hidden')
    }
}

const cartItemsRendering = (item) => {
    const cartBoxItem = document.createElement('div');
    cartBoxItem.className = 'cart-box-item';
    cartBoxItem.id = Math.random();
    item.id = cartBoxItem.id

    const cartBoxImg = document.createElement('img');
    cartBoxImg.className = 'cart-box-item__img';
    cartBoxImg.src = 'images/image-product-1-thumbnail.jpg';
    cartBoxImg.alt = 'Tumbnail photo of ' + item.title;
    cartBoxItem.appendChild(cartBoxImg);

    const cartBoxTextAreaChildren = []
    const cartBoxTextArea = document.createElement('div');
    cartBoxTextArea.className = 'cart-box-item__text-area';

    const cartBoxTextAreaTitle = document.createElement('p');
    cartBoxTextAreaTitle.className = 'cart-box-item__title';
    cartBoxTextAreaTitle.innerText = item.title;
    cartBoxTextAreaChildren.push(cartBoxTextAreaTitle);

    const cartBoxTextAreaPrice = document.createElement('p');
    cartBoxTextAreaPrice.className = 'cart-box-item__price';
    cartBoxTextAreaPrice.innerText = '$' + item.price + '.00';
    cartBoxTextAreaChildren.push(cartBoxTextAreaPrice);

    const cartBoxTextAreaAmount = document.createElement('p');
    cartBoxTextAreaAmount.className = 'cart-box-item__amount';
    cartBoxTextAreaAmount.innerHTML = 'x ' + item.amount;
    cartBoxTextAreaChildren.push(cartBoxTextAreaAmount);

    const cartBoxTextAreaTotal = document.createElement('p');
    cartBoxTextAreaTotal.className = 'cart-box-item__total';
    cartBoxTextAreaTotal.innerHTML = '$' + (item.amount * item.price) + '.00';
    cartBoxTextAreaChildren.push(cartBoxTextAreaTotal);

    cartBoxTextAreaChildren.forEach((child) => {
        cartBoxTextArea.appendChild(child);
    });

    cartBoxItem.appendChild(cartBoxTextArea);

    const btnDeleteItem = document.createElement('button');
    btnDeleteItem.className = 'btn-delete-item';
    btnDeleteItem.id = Math.random();
    btnDeleteItem.addEventListener('click', () => {
        cartItemDelete(cartBoxItem.id);
    })

    const btnDeleteItemImg = document.createElement('img');
    btnDeleteItemImg.className = 'btn-delete-item-img'
    btnDeleteItemImg.src = 'images/icon-delete.svg';
    btnDeleteItemImg.alt = '';
    btnDeleteItem.appendChild(btnDeleteItemImg);

    cartBoxItem.appendChild(btnDeleteItem);

    if (!$cartEmpty.className.includes('hidden')){
        $cartEmpty.classList.toggle('hidden');
    }
    if ($checkoutButton.className.includes('hidden')){
        $checkoutButton.classList.toggle('hidden');
    }

    $cartBoxBody.appendChild(cartBoxItem);
}

const cartItemDelete = (item_id) => {
    const item = document.getElementById(item_id);
    item.remove();
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === item_id) {
            item_to_remove = i;
            cartItems.splice(i, 1);
            break;
        }
    }
    if (cartItems.length === 0) {
        $checkoutButton.classList.toggle('hidden');
        $cartEmpty.classList.toggle('hidden');
    }
    cartAmountIconChange();
}

// Listeners

$btnIncrease.addEventListener('click', () => {
    const initAmount = parseInt($amountToAdd.innerText);
    $amountToAdd.innerText = (initAmount + 1).toString();
});

$btnDecrease.addEventListener('click', () => {
    const initAmount = parseInt($amountToAdd.innerText);
    if (initAmount > 0) {
        $amountToAdd.innerText = (initAmount - 1).toString();
    }
});

$nextImg.addEventListener('click', () => {
    const imgSrc = $mainImg.src;
    let imgNumber = parseInt(imgSrc.slice(-5, -4));
    if (imgNumber < 4) {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber + 1) + '.jpg'));
    } else {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber - 3) + '.jpg'));
    }
});

$prevImg.addEventListener('click', () => {
    const imgSrc = $mainImg.src;
    let imgNumber = parseInt(imgSrc.slice(-5, -4));
    if (imgNumber > 1) {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber - 1) + '.jpg'));
    } else {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber + 3) + '.jpg'));
    }
});

$modal.addEventListener('click', () => {
    $modal.classList.toggle('hidden');
    $sideMenu.classList.toggle('hidden');
});

$burger.addEventListener('click', () => {
    $modal.classList.toggle('hidden');
    $sideMenu.classList.toggle('hidden');
});

$iconClose.addEventListener('click', () => {
    $modal.classList.toggle('hidden');
    $sideMenu.classList.toggle('hidden');
});

$cartIcon.addEventListener('click', () => {
    $cartBox.classList.toggle('hidden');
});

$btnAddCart.addEventListener('click', () => {
    const amount = parseInt($amountToAdd.innerText);
    const price = parseInt($price.innerText.replace(/[^0-9]/g, '')) / 100;
    const title = $productTitle.innerText
    const newItem = {
        'amount': amount,
        'price': price,
        'title': title,
        'id': 0,
        'deleteButtonId': 0
    }
    cartItems.push(newItem);
    $amountToAdd.innerText = 0;
    cartAmountIconChange();
    cartItemsRendering(newItem);
});