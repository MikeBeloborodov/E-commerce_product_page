const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const mql = window.matchMedia("(min-width: 1200px)")

const $btnIncrease = $('#btn-increase');
const $btnDecrease = $('#btn-decrease');
const $amountToAdd = $('#amount-to-add');
const $mainImg = $('#main-img');
const $nextImg = $('#next-img');
const $prevImg = $('#prev-img');
const $modalNextImg = $('#modal-next-img');
const $modalPrevImg = $('#modal-prev-img');
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
const $modalGallery = $('#modal-gallery');
const $modalMainImage = $('#modal-main-image');
const $modalCloseIcon = $('#modal-close-icon');

const $$tumbnails = $$('#tumbnail');
const $$modalTumbnails = $$('#modal-tumbnail');

var cartItems = [];
var currentTumbnail = $$tumbnails[0];
var currentModalTumbnail = $$modalTumbnails[0];

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

    if (!$cartEmpty.className.includes('hidden')) {
        $cartEmpty.classList.toggle('hidden');
    }
    if ($checkoutButton.className.includes('hidden')) {
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

const changeImage = (tumbnail = currentTumbnail, changePos = false, vector = undefined, modal = false) => {
    if (tumbnail === currentTumbnail && !changePos) {
        return;
    }
    if (changePos && modal) {
        const imgNumber = parseInt($modalMainImage.src.slice(-5, -4));
        if (vector === 'next' && imgNumber < 4) {
            $modalMainImage.src = $modalMainImage.src.replace((imgNumber + '.jpg'), ((imgNumber + 1) + '.jpg'));
            const tumbnailSrc = $modalMainImage.src.slice(0, -4) + '-thumbnail' + $mainImg.src.slice(-4);
            changeTumbnailImage(true, undefined, tumbnailSrc);
        } else if (vector === 'next' && imgNumber === 4) {
            $modalMainImage.src = $modalMainImage.src.replace((imgNumber + '.jpg'), ((imgNumber - 3) + '.jpg'));
            const tumbnailSrc = $modalMainImage.src.slice(0, -4) + '-thumbnail' + $mainImg.src.slice(-4);
            changeTumbnailImage(true, undefined, tumbnailSrc);
        } else if (vector === 'prev' && imgNumber > 1) {
            $modalMainImage.src = $modalMainImage.src.replace((imgNumber + '.jpg'), ((imgNumber - 1) + '.jpg'));
            const tumbnailSrc = $modalMainImage.src.slice(0, -4) + '-thumbnail' + $mainImg.src.slice(-4);
            changeTumbnailImage(true, undefined, tumbnailSrc);
        } else if (vector === 'prev' && imgNumber === 1) {
            $modalMainImage.src = $modalMainImage.src.replace((imgNumber + '.jpg'), ((imgNumber + 3) + '.jpg'));
            const tumbnailSrc = $modalMainImage.src.slice(0, -4) + '-thumbnail' + $mainImg.src.slice(-4);
            changeTumbnailImage(true, undefined, tumbnailSrc);
        }
        return;

    } else if (changePos) {
        const imgNumber = parseInt($mainImg.src.slice(-5, -4));
        if (vector === 'next' && imgNumber < 4) {
            $mainImg.src = $mainImg.src.replace((imgNumber + '.jpg'), ((imgNumber + 1) + '.jpg'));
            changeTumbnailImage()
        } else if (vector === 'next' && imgNumber === 4) {
            $mainImg.src = $mainImg.src.replace((imgNumber + '.jpg'), ((imgNumber - 3) + '.jpg'));
            changeTumbnailImage()
        } else if (vector === 'prev' && imgNumber > 1) {
            $mainImg.src = $mainImg.src.replace((imgNumber + '.jpg'), ((imgNumber - 1) + '.jpg'));
            changeTumbnailImage()
        } else if (vector === 'prev' && imgNumber === 1) {
            $mainImg.src = $mainImg.src.replace((imgNumber + '.jpg'), ((imgNumber + 3) + '.jpg'));
            changeTumbnailImage()
        }
        return;
    }
    if (tumbnail != currentTumbnail) {
        const mainImageSrc = tumbnail.src.replace('-thumbnail', '');
        $mainImg.src = mainImageSrc;
        currentTumbnail.parentElement.classList.toggle('current-tumbnail')
        currentTumbnail = tumbnail;
        currentTumbnail.parentElement.classList.toggle('current-tumbnail')

        currentModalTumbnail.parentElement.classList.toggle('current-tumbnail');
        $$modalTumbnails.forEach((element) => {
            if (element.src === currentTumbnail.src) {
                currentModalTumbnail = element;
                currentModalTumbnail.parentElement.classList.toggle('current-tumbnail');
            }
        })
    }
}

const changeTumbnailImage = (modal = false, modal_item = undefined, modal_item_src) => {
    if (modal) {
        if (modal_item) {
            var src = modal_item.src;
        } else if (modal_item_src) {
            var src = modal_item_src;
            $$modalTumbnails.forEach((element) => {
                if (element.src === modal_item_src) {
                    modal_item = element;
                }
            })
        }
        $modalMainImage.src = src.replace('-thumbnail', '');
        $$modalTumbnails.forEach((element) => {
            if (element.parentElement.className.includes('current-tumbnail')) {
                element.parentElement.classList.toggle('current-tumbnail');
            }
        })
        modal_item.parentElement.classList.toggle('current-tumbnail');
        currentModalTumbnail = modal_item
        return;
    }

    const tumbnailSrc = $mainImg.src.slice(0, -4) + '-thumbnail' + $mainImg.src.slice(-4);
    currentTumbnail.parentElement.classList.toggle('current-tumbnail');
    $$tumbnails.forEach((element) => {
        if (element.src === tumbnailSrc) {
            currentTumbnail = element;
        }
    })
    currentTumbnail.parentElement.classList.toggle('current-tumbnail');

    currentModalTumbnail.parentElement.classList.toggle('current-tumbnail');
    $$modalTumbnails.forEach((element) => {
        if (element.src === tumbnailSrc) {
            currentModalTumbnail = element;
        }
    })
    currentModalTumbnail.parentElement.classList.toggle('current-tumbnail');

    $modalMainImage.src = $mainImg.src
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
    changeImage(currentTumbnail, true, 'next');
});

$prevImg.addEventListener('click', () => {
    changeImage(currentTumbnail, true, 'prev');
});

$modalNextImg.addEventListener('click', () => {
    changeImage(currentModalTumbnail, true, 'next', true);
})

$modalPrevImg.addEventListener('click', () => {
    changeImage(currentModalTumbnail, true, 'prev', true);
})

$modal.addEventListener('click', () => {
    if (!matchMedia('(min-width: 1200px)').matches) {
        $modal.classList.toggle('hidden');
        $sideMenu.classList.toggle('hidden');
    }
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

$$tumbnails.forEach((item) => {
    item.addEventListener('click', () => {
        changeImage(item);
    })
})

$$modalTumbnails.forEach((item) => {
    item.addEventListener('click', () => {
        changeTumbnailImage(true, item);
    })
})

$mainImg.addEventListener('click', () => {
    if (matchMedia('(min-width: 1200px)').matches === true) {
        $modal.classList.toggle('hidden');
        $modalGallery.classList.toggle('hidden');
        changeTumbnailImage();
    }
})

$modalCloseIcon.addEventListener('click', () => {
    $modal.classList.toggle('hidden');
    $modalGallery.classList.toggle('hidden');
    $modalMainImage.src = $mainImg.src;
    changeTumbnailImage();
})

mql.addEventListener('change', () => {
    if (!mql.matches) {
        if (!$modal.className.includes('hidden')) {
            $modal.classList.toggle('hidden');
        }
        if (!$modalGallery.className.includes('hidden')) {
            $modalGallery.classList.toggle('hidden');
        }
    }
})