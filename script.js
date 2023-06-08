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

$btnIncrease.addEventListener('click', () => {
    const initAmount = parseInt($amountToAdd.innerText) 
    $amountToAdd.innerText = (initAmount + 1).toString()
})

$btnDecrease.addEventListener('click', () => {
    const initAmount = parseInt($amountToAdd.innerText)
    if (initAmount > 0) {
        $amountToAdd.innerText = (initAmount - 1).toString()
    }
})

$nextImg.addEventListener('click', () => {
    const imgSrc = $mainImg.src
    let imgNumber = parseInt(imgSrc.slice(-5, -4))
    if (imgNumber < 4) {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber + 1) + '.jpg'))
    } else {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber - 3) + '.jpg'))
    }
})

$prevImg.addEventListener('click', () => {
    const imgSrc = $mainImg.src
    let imgNumber = parseInt(imgSrc.slice(-5, -4))
    if (imgNumber > 1) {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber - 1) + '.jpg'))
    } else {
        $mainImg.src = imgSrc.replace((imgNumber + '.jpg'), ((imgNumber + 3) + '.jpg'))
    }
})

$modal.addEventListener('click', () => {
    $modal.classList.toggle('hidden');
    $sideMenu.classList.toggle('hidden')
})

$burger.addEventListener('click', () => {
    $modal.classList.toggle('hidden')
    $sideMenu.classList.toggle('hidden')
})

$iconClose.addEventListener('click', () => {
    $modal.classList.toggle('hidden')
    $sideMenu.classList.toggle('hidden')
})