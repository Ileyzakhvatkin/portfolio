// Серекты на jQuery
$(document).ready(() => {
  lazyload();
  $('select').styler();
});

(() => {
  // const element = document.querySelector('select');
  // const choices = new Choices(element, {
  //   searchEnabled: false,
  //   shouldSortItems: false,
  //   //removeItemButton: false,
  //   //resetScrollPosition: false,
  //   //noResultsText: 'Ни что ни нашел((',
  //   //itemSelectText: 'Выбери',
  // });

  // Слайдеры
  const swiper1 = new Swiper('.banners', {
    loop: true,
    spaceBetween: 0,
    autoplay: {
      delay: 500000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".banners__pagination",
      clickable: true,
    },
  });
  const swiper2 = new Swiper('.special-offer__slader', {
    navigation: {
      nextEl: '.special-offer__button-next',
      prevEl: '.special-offer__button-prev',
    },
    // height: 511,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    breakpoints: {
      541: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32
      },
      769: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32
      }
    }
  });
  const swiper3 = new Swiper('.useful__slader', {
    navigation: {
      nextEl: '.useful__button-next',
      prevEl: '.useful__button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      541: {
        slidesPerView: 2,
        spaceBetween: 32
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 32
      },
      1025: {
        slidesPerView: 2,
        spaceBetween: 32
      }
    }
  });
  const swiperPr1 = new Swiper(".swiperProduct1", {
    loop: true,
    slidesPerGroup: 1,
    spaceBetween: 78,
    breakpoints: {
      541: {
        slidesPerView: 2,
      },
      769: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 4,
      }
    },
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".product-images__thumbs-next",
      prevEl: ".product-images__thumbs-prev",
    },
  });
  const swiperPr2 = new Swiper(".swiperProduct2", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerGroup: 1,
    thumbs: {
      swiper: swiperPr1,
    },
  });
  const swiper5 = new Swiper('.add-prod__slader', {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 16,
    breakpoints: {
      541: {
        slidesPerView: 2,
        spaceBetween: 32
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 32
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 32
      }
    },
    navigation: {
      nextEl: '.add-prod__button-next',
      prevEl: '.add-prod__button-prev',
    },

  });

  // Модерация формы
  if ( document.querySelector('#userform') ) {
    let selectorTel = document.querySelector("input[type='tel']");
    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selectorTel);

    new JustValidate('#userform', {
      rules: {
        username: {
          required: true,
          minlength: 3,
          maxlength: 20,
        },
        userphone: {
          required: true,
          function: (name, value) => {
            const phone = selectorTel.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          }
        },
        useremail: {
          required: true,
          email: true
        },
      },
      messages: {
        username: {
          required: 'Введите ваше имя',
          minlength: 'Нужно ввести минимум 3 буквы',
          maxlength: 'Нужно ввести максимум 20 букв',
        },
        userphone: {
          required: 'Введите ваш телефон',
          function: 'Полностью введите номер',
        },
        useremail: {
          required: 'Введите ваш e-mail',
          email:  'Неверный формат e-mail',
        },
      },
      submitHandler: function(form) {
        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              actionModal('one-click');
              document.querySelector('.modal__one-clisk').style.display = 'none';
              document.querySelector('.modal__thank-you-win').style.display = 'block';
            };
          };
        };
        xhr.open('POST', 'https://crmrealtor.ru/dist/resourses/mail.php', true);
        xhr.send(formData);
        form.reset();
      }
    });
  };

  if ( document.querySelector('#userorder') ) {
    let selectorTel = document.querySelector("input[type='tel']");
    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selectorTel);

    new JustValidate('#userorder', {
      rules: {
        userordername: {
          required: true,
          minlength: 3,
          maxlength: 20,
        },
        userorderphone: {
          required: true,
          function: (name, value) => {
            const phone = selectorTel.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          }
        },
      },
      messages: {
        userordername: {
          required: 'Введите ваше имя',
          minlength: 'Нужно ввести минимум 3 буквы',
          maxlength: 'Нужно ввести максимум 20 букв',
        },
        userorderphone: {
          required: 'Введите ваш телефон',
          function: 'Полностью введите номер',
        },
      },
      submitHandler: function(form) {
        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              document.querySelector('.modal__one-clisk').style.display = 'none';
              document.querySelector('.modal__thank-you-win').style.display = 'block';
            };
          };
        };
        xhr.open('POST', 'https://crmrealtor.ru/dist/resourses/mail.php', true);
        xhr.send(formData);
        form.reset();
      }
    });
  };

  // Модальные окна
  function actionModal(typeModal) {
    const modalRoot = document.getElementById(typeModal);
    const modalClose = modalRoot.querySelector('.modal__close-btn');
    function animateRemoveModal() {
      modalRoot.classList.remove('modal__opacity');
      document.querySelector('body').style.overflow = 'visible';
      setTimeout(() => {
        modalRoot.classList.remove('modal__show');
      }, 310);
    };
    function animateAddModal() {
      modalRoot.classList.add('modal__show');
      document.querySelector('body').style.overflow = 'hidden';
      setTimeout(() => {
        modalRoot.classList.add('modal__opacity');
      }, 10);
    };
    animateAddModal(typeModal);
    modalClose.addEventListener('click', () => {
      animateRemoveModal(typeModal);
    });
    modalRoot.querySelector('.modal__body').addEventListener('click', event => {
      event._isClickWithinModal = true;
    });
    modalRoot.addEventListener('click', event => {
      if (event._isClickWithinModal) return;
      animateRemoveModal(typeModal);
    });
  };

  window.addEventListener('DOMContentLoaded', () => {

    // Запускаем модальные окна
    if (document.querySelector('.prod-details')) {
      document.querySelectorAll('.prod-btn__btn').forEach(el => {
        el.addEventListener('click', () => {
          document.querySelector('.modal__one-clisk').style.display = 'block';
          document.querySelector('.modal__thank-you-win').style.display = 'none';
          actionModal('one-click')
        });
      });

      document.querySelector('.prod-details__images').addEventListener('click', () => {
        console.log('test');
        actionModal('prod-img-group')
      });
    };

    // Запускаем мобильное меню
    document.querySelector('.header__main-burger-icon').addEventListener('click', () => {
      document.querySelector('.header__mobile-menu').classList.toggle('header__mobile-menu-active')
    });
    document.querySelector('.header__mobile-menu-icon').addEventListener('click', () => {
      document.querySelector('.header__mobile-menu').classList.toggle('header__mobile-menu-active')
    });

    // Формируем пагинацию по страницам категори
    if ( document.querySelector('.products__slader')) {
      const products = [{rat: '5.0', img: 'images/home/prod-high-1.png', name: 'Диван кожаный “R-94”', price: '94 990'}, {rat: '4.9', img: 'images/home/prod-high-2.png', name: 'Диван апартековый “T-75”', price: '69 990'}, {rat: '4.8', img: 'images/home/prod-high-3.png', name: 'Диван тканевый “D-31”', price: '28 490'}, {rat: '4.8', img: 'images/home/prod-high-4.png', name: 'Диван велюровый “Y-68”', price: '22 990'}, {rat: '4.8', img: 'images/home/prod-high-5.png', name: 'Диван из шинила “W-95”', price: '22 990'}, {rat: '4.8', img: 'images/home/prod-high-6.png', name: 'Диван флоковый “G-41”', price: '17 990'}, {rat: '4.8', img: 'images/home/prod-high-7.png', name: 'Диван шиниловый “V-43”', price: '19 990'}, {rat: '4.7', img: 'images/home/prod-high-8.png', name: 'Диван велюровый “S-99”', price: '19 990'} , {rat: '4.7', img: 'images/home/prod-high-9.png', name: 'Диван из кожзама “F-85”', price: '26 990'}, {rat: '4.6', img: 'images/category/prod-s-1.png', name: 'Диван флоковый “H-64”', price: '25 990'}, {rat: '4.6', img: 'images/category/prod-s-2.png', name: 'Диван флоковый “H-58”', price: '23 990'}, {rat: '4.6', img: 'images/category/prod-s-3.png', name: 'Диван из кожзама “R-43”', price: '33 990'}, {rat: '4.6', img: 'images/category/prod-s-4.png', name: 'Диван из шинила “С-42”', price: '18 990'}, {rat: '4.5', img: 'images/category/prod-s-5.png', name: 'Диван велюровый “U-58”', price: '21 990'}, {rat: '4.5', img: 'images/category/prod-s-6.png', name: 'Диван флоковый “F-41”', price: '17 990'}, {rat: '4.5', img: 'images/category/prod-s-7.png', name: 'Диван велюровый “R-85”', price: '34 990'}, {rat: '4.5', img: 'images/category/prod-s-8.png', name: 'Диван велюровый “S-44”', price: '19 990'} , {rat: '4.4', img: 'images/category/prod-s-9.png', name: 'Диван из шинила “С-80”', price: '20 990'}];
      let prodOnPage = 9;
      // console.log(window.innerWidth);
      if ( window.innerWidth < 769 ) prodOnPage = 6;
      function renderProductCart(el) {
        const prodCart = document.createElement('div');
        prodCart.classList.add('products__item', 'prod-cart');
        prodCart.innerHTML = `
        <div class="prod-cart__raiting">
          <svg class="prod-cart__icon" width="16" height="15">
            <use xlink:href="symbol/svg/sprite.symbol.svg#svg--star"></use>
          </svg><span>${el.rat}</span></div>
        <div class="prod-cart__img-box"><a class="prod-cart__link" href="./product.html" aria-label="подробнее о товаре">
          <img class="prod-cart__img lazyload" data-src="${el.img}" alt="${el.name}"></a>
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
      // console.log(counterPages);
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
        let productsOnPage = products.slice(start, end);
        for ( let el of productsOnPage) {
          prodPage.append(renderProductCart(el));
        };
        const counterItem = document.createElement('button');
        counterItem.classList.add('products-list-counter__item');
        counterItem.setAttribute('data-path', `page${pageNumb}`)
        counterItem.textContent = pageNumb;
        if ( pageNumb === 1 ) {counterItem.classList.add('products-list-counter__active')};
        pageCounter.append(counterItem);
        allBullits.push(counterItem)
      };
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
      };
    };

    // Формируем органичение в фильтрах страницы категории
    if ( document.querySelector('.products__slader') ) {
      const categories = [{title: 'Диваны', id: 'cat-1'}, {title: 'Кресла', id: 'cat-2'}, {title: 'Пуфы', id: 'cat-3'}, {title: 'Кровати', id: 'cat-4'}, {title: 'Тумбы', id: 'cat-5'}, {title: 'Комоды', id: 'cat-6'}, {title: 'Стулья', id: 'cat-7'}, {title: 'Столы', id: 'cat-8'}, {title: 'Аксессуары', id: 'cat-9'}, {title: 'Вешалки', id: 'cat-10'}, , {title: 'Вазы', id: 'cat-9'}]
      const discounts = [{title: 'Более 5 000', id: 'disc-1'}, {title: 'Менее 5 000', id: 'disc-2'}, {title: 'Не важно', id: 'disc-3'}]
      const colors = [{title: 'Коричневый', id: 'col-1'}, {title: 'Черный', id: 'col-2'}, {title: 'Бежевый', id: 'col-3'}, {title: 'Серый', id: 'col-4'}, {title: 'Белый', id: 'col-5'}, {title: 'Синий', id: 'col-6'}, {title: 'Оранжевый', id: 'col-7'}, {title: 'Желтый', id: 'col-8'}, {title: 'Зеленый', id: 'col-9'} ]

      function createChekGroup(id, arr, open) {
        let flag = false;
        const chekGroup = document.getElementById(id);
        function createChekItem(element) {
          const label = document.createElement('label');
          label.classList.add('filters__lable', 'cust-check');
          label.setAttribute('for', `${element.id}`)
          label.innerHTML = `
            <input class="filters__input cust-check__input" type="checkbox" id="${element.id}">
              <span class="cust-check__span" tabindex="0"></span>
              <span>${element.title}</span>
          `;
          chekGroup.append(label);
        };

        arr.forEach((element, index) => {
          // console.log(flag);
          if ( open === false ) {
            if ( index > 8 ) {
              flag = true;
              return false;
            } else {
              createChekItem(element);
            };
          } else {
            createChekItem(element);
          };
        });
        const showAll = document.createElement('button');
        showAll.classList.add('filters__show-all');
        showAll.innerHTML = '<span>Показать все</span>';
        chekGroup.append(showAll);
        if ( flag === true ) showAll.style.display = 'block';
        showAll.addEventListener('click', () => {
          Array.from(chekGroup.childNodes).forEach(el => el.remove());
          createChekGroup(id, arr, true);
        })
      };

      createChekGroup('categoryGrope', categories, false);
      createChekGroup('discountGrope', discounts, false);
      createChekGroup('colorGrope', colors, false);
    };

  });

})();
