const products = [{rat: '5.0', img: 'images/home/prod-high-1.png', name: 'Диван кожаный “R-94”', price: '94 990'}, {rat: '4.9', img: 'images/home/prod-high-2.png', name: 'Диван апартековый “T-75”', price: '69 990'}, {rat: '4.8', img: 'images/home/prod-high-3.png', name: 'Диван тканевый “D-31”', price: '28 490'}, {rat: '4.8', img: 'images/home/prod-high-4.png', name: 'Диван велюровый “Y-68”', price: '22 990'}, {rat: '4.8', img: 'images/home/prod-high-5.png', name: 'Диван из шинила “W-95”', price: '22 990'}, {rat: '4.8', img: 'images/home/prod-high-6.png', name: 'Диван флоковый “G-41”', price: '17 990'}, {rat: '4.8', img: 'images/home/prod-high-7.png', name: 'Диван шиниловый “V-43”', price: '19 990'}, {rat: '4.7', img: 'images/home/prod-high-8.png', name: 'Диван велюровый “S-99”', price: '19 990'} , {rat: '4.7', img: 'images/home/prod-high-9.png', name: 'Диван из кожзама “F-85”', price: '26 990'}, {rat: '4.6', img: 'images/category/prod-s-1.png', name: 'Диван флоковый “H-64”', price: '25 990'}, {rat: '4.6', img: 'images/category/prod-s-2.png', name: 'Диван флоковый “H-58”', price: '23 990'}, {rat: '4.6', img: 'images/category/prod-s-3.png', name: 'Диван из кожзама “R-43”', price: '33 990'}, {rat: '4.6', img: 'images/category/prod-s-4.png', name: 'Диван из шинила “С-42”', price: '18 990'}, {rat: '4.5', img: 'images/category/prod-s-5.png', name: 'Диван велюровый “U-58”', price: '21 990'}, {rat: '4.5', img: 'images/category/prod-s-6.png', name: 'Диван флоковый “F-41”', price: '17 990'}, {rat: '4.5', img: 'images/category/prod-s-7.png', name: 'Диван велюровый “R-85”', price: '34 990'}, {rat: '4.5', img: 'images/category/prod-s-8.png', name: 'Диван велюровый “S-44”', price: '19 990'} , {rat: '4.4', img: 'images/category/prod-s-9.png', name: 'Диван из шинила “С-80”', price: '20 990'}];
let prodOnPage = 9;
console.log(window.innerWidth);
if ( window.innerWidth < 769 ) prodOnPage = 6;

function renderProductCart(el) {
  const prodCart = document.createElement('div');
  prodCart.classList.add('products__item', 'prod-cart');
  prodCart.innerHTML = `
  <div class="prod-cart__raiting">
    <svg class="prod-cart__icon" width="16" height="15">
      <use xlink:href="symbol/svg/sprite.symbol.svg#svg--star"></use>
    </svg><span>${el.rat}</span></div>
  <div class="prod-cart__img-box"><a class="prod-cart__link" href="./product.html">
    <img class="prod-cart__img" src="${el.img}" alt="${el.name}"></a>
  </div>
  <h3 class="prod-cart__name">${el.name}</h3>
  <h4 class="prod-cart__price">${el.price} руб</h4>
  <div class="prod-cart__btn-box">
    <button class="prod-cart__btn btn btn-light">Купить</button>
  </div>
  `;
  return prodCart;
};

const productsSlader = document.querySelector('.products__slader')
const pageCounter = document.createElement('div');
pageCounter.classList.add('products-list-counter');

let counterPages = Math.ceil(products.length / prodOnPage);
console.log(counterPages);
let allPages = [];
let allBullits = [];
for (let pageNumb = 1; pageNumb <= counterPages; pageNumb++) {
  const prodPage = document.createElement('div');
  prodPage.classList.add('products__list');
  prodPage.setAttribute('data-target', `page${pageNumb}`)
  if ( pageNumb === 1 ) {prodPage.classList.add('products__list-active')};
  productsSlader.append(prodPage);
  allPages.push(prodPage);

  let start = (pageNumb - 1) * prodOnPage;
  let end = start + prodOnPage;
  let productsOnPage = products.slice(start, end)

  for ( let el of productsOnPage) {
    prodPage.append(renderProductCart(el));
  }

  const counterItem = document.createElement('div');
  counterItem.classList.add('products-list-counter__item');
  counterItem.setAttribute('data-path', `page${pageNumb}`)
  counterItem.textContent = pageNumb;
  if ( pageNumb === 1 ) {counterItem.classList.add('products-list-counter__active')};
  pageCounter.append(counterItem);
  allBullits.push(counterItem)
}
productsSlader.append(pageCounter);

for ( let tabsBtn of allBullits) {
  tabsBtn.addEventListener('click', event => {
    const path = event.currentTarget.dataset.path
    document.querySelectorAll('.products__list').forEach( tabContent => {
      tabContent.classList.remove('products__list-active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('products__list-active')
  });
};
for ( let element of allBullits) {
  element.addEventListener('click', event => {
    document.querySelectorAll('.products-list-counter__active').forEach( tabContent => {
      tabContent.classList.remove('products-list-counter__active')
    });
    event.target.classList.toggle('products-list-counter__active')
  });
}



