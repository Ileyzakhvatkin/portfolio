'use strict';

const toggleHidden = (...fields) => {

  fields.forEach((field) => {

    if (field.hidden === true) {

      field.hidden = false;

    } else {

      field.hidden = true;

    }
  });
};

const labelHidden = (form) => {

  form.addEventListener('focusout', (evt) => {

    const field = evt.target;
    const label = field.nextElementSibling;

    if (field.tagName === 'INPUT' && field.value && label) {

      label.hidden = true;

    } else if (label) {

      label.hidden = false;

    }
  });
};

// Выбор способа доставки
const toggleDelivery = (elem) => {

    const delivery = elem.querySelector('.js-radio');
    const deliveryYes = elem.querySelector('.shop-page__delivery--yes');
    const deliveryNo = elem.querySelector('.shop-page__delivery--no');
    const fields = deliveryYes.querySelectorAll('.custom-form__input');

    delivery.addEventListener('change', (evt) => {

    if (evt.target.id === 'dev-no') {

        fields.forEach(inp => {
            if (inp.required === true) {
            inp.required = false;
            }
        });


        toggleHidden(deliveryYes, deliveryNo);

        deliveryNo.classList.add('fade');
        setTimeout(() => {
            deliveryNo.classList.remove('fade');
        }, 1000);

    } else {

        fields.forEach(inp => {
            if (inp.required === false) {
            inp.required = true;
            }
        });

        toggleHidden(deliveryYes, deliveryNo);

        deliveryYes.classList.add('fade');
        setTimeout(() => {
            deliveryYes.classList.remove('fade');
        }, 1000);
    }
  });
};

// Фильтры в категори
const filterWrapper = document.querySelector('.filter__list');
if (filterWrapper) {

  filterWrapper.addEventListener('click', evt => {

    const filterList = filterWrapper.querySelectorAll('.filter__list-item');

    filterList.forEach(filter => {

      if (filter.classList.contains('active')) {

        filter.classList.remove('active');

      }

    });

    const filter = evt.target;

    filter.classList.add('active');

  });

}

// Список товаров в категории, тут же форма заказа
const shopList = document.querySelector('.shop__list');
if (shopList) {

  shopList.addEventListener('click', (evt) => {

        const productPrice = evt.target.getAttribute('id');

        const prod = evt.path || (evt.composedPath && evt.composedPath());;
    if (prod.some(pathItem => pathItem.classList && pathItem.classList.contains('shop__item'))) {

        const shopOrder = document.querySelector('.shop-page__order');

        const hiddenTotalPrise = shopOrder.querySelector('.total-price');
        // console.log(productPrice);
        hiddenTotalPrise.value = productPrice;

        if (document.querySelector('.intro')) {
            toggleHidden(document.querySelector('.intro'), document.querySelector('.shop'), shopOrder);
        } else {
            toggleHidden(document.querySelector('.shop'), shopOrder);
        }

        window.scroll(0, 0);

        shopOrder.classList.add('fade');
        setTimeout(() => shopOrder.classList.remove('fade'), 1000);
        // Работа с формой ЗАКАЗА
        const form = shopOrder.querySelector('.custom-form');

        labelHidden(form);

        toggleDelivery(shopOrder);

        const buttonOrder = shopOrder.querySelector('.button');
        const popupEnd = document.querySelector('.shop-page__popup-end');

        buttonOrder.addEventListener('click', (evt) => {

            form.noValidate = true;

            const inputs = Array.from(shopOrder.querySelectorAll('[required]'));

            inputs.forEach(inp => {

            if (!!inp.value) {
                if (inp.classList.contains('custom-form__input--error')) {
                inp.classList.remove('custom-form__input--error');
                }

            } else {
                inp.classList.add('custom-form__input--error');
            }
            });

            if (inputs.every(inp => !!inp.value)) {

                evt.preventDefault();

                toggleHidden(shopOrder, popupEnd);

                popupEnd.classList.add('fade');
                setTimeout(() => popupEnd.classList.remove('fade'), 1000);

                window.scroll(0, 0);

                const buttonEnd = popupEnd.querySelector('.button');

                buttonEnd.addEventListener('click', () => {

                    popupEnd.classList.add('fade-reverse');

                    setTimeout(() => {
                        popupEnd.classList.remove('fade-reverse');
                        if (document.querySelector('.intro')) {
                            toggleHidden(popupEnd, document.querySelector('.intro'), document.querySelector('.shop'));
                        } else {
                            toggleHidden(popupEnd, document.querySelector('.shop'));
                        }
                        location.reload();
                    }, 750);

                });

            } else {
                window.scroll(0, 0);
                evt.preventDefault();
            }

            const errorsGroup = document.querySelector('.errors-group');
            const formOrderDate = $('.custom-form').serialize();
            // console.log(formOrderDate);
            $.ajax({
                method: 'POST',
                url: '/src/ajax/actionSetOrder.php',
                data: formOrderDate,
            }).done(function(response) {
                // console.log(response);
                errorsGroup.style.display = 'none';
                errorsGroup.innerHTML = '';
                if (response) {
                    const responseDate = JSON.parse(response)
                    // console.log(responseDate);
                    errorsGroup.style.display = 'block';
                    responseDate.forEach(el => {
                        const item = document.createElement('div');
                        item.textContent = el;
                        errorsGroup.append(item);
                    });
                } else {
                    // console.log(response);
                    form.hidden = true;
                    popupEnd.hidden = false;
                }
            });
      });
    }
  });
}

// Список заказов в админке
const pageOrderList = document.querySelector('.page-order__list');
if (pageOrderList) {

    // Изменение статуса заказа
    pageOrderList.addEventListener('click', evt => {

        if (evt.target.classList && evt.target.classList.contains('order-item__toggle')) {
            var path = evt.path || (evt.composedPath && evt.composedPath());
            Array.from(path).forEach(element => {
                if (element.classList && element.classList.contains('page-order__item')) {
                element.classList.toggle('order-item--active');
                }
            });
            evt.target.classList.toggle('order-item__toggle--active');
        }

        if (evt.target.classList && evt.target.classList.contains('order-item__btn')) {
            const status = evt.target.previousElementSibling;
            let statusValue = null;
            if (status.classList && status.classList.contains('order-item__info--no')) {
              status.textContent = 'Выполнено';
            } else {
              status.textContent = 'Не выполнено';
            }

            status.classList.toggle('order-item__info--no');
            status.classList.toggle('order-item__info--yes');

            $.ajax({
                method: 'POST',
                url: '/src/ajax/actionSetStatus.php',
                data:  {
                    orderId: evt.target.getAttribute('name'),
                    status: status.textContent,
                },
              }).done(function(response) {
                if (response !== '') {
                    const responseDate = JSON.parse(response)
                    // console.log(responseDate);
                }
            });
        }

  });

}

const checkList = (list, btn) => {

    if (list.children.length === 1) {

        btn.hidden = false;

    } else {
        btn.hidden = true;
    }

};

// Форма РЕДАКТИРОВАНИЯ ТОВАРА
const addList = document.querySelector('.add-list');
if (addList) {

    const form = document.querySelector('.custom-form');
    labelHidden(form);

    const addButton = addList.querySelector('.add-list__item--add');
    const addInput = addList.querySelector('#product-photo');

    checkList(addList, addButton);

    addInput.addEventListener('change', evt => {

        const template = document.createElement('LI');
        const img = document.createElement('IMG');

        template.className = 'add-list__item add-list__item--active';
        template.addEventListener('click', evt => {
            addList.removeChild(evt.target);
            addInput.value = '';
            checkList(addList, addButton);
        });

        const file = evt.target.files[0];
        // console.log(file);
        const reader = new FileReader();

        reader.onload = (evt) => {
            img.src = evt.target.result;
            // console.log(evt.target);
            template.appendChild(img);
            addList.appendChild(template);
            checkList(addList, addButton);
        };

        reader.readAsDataURL(file);

    });

        const button = document.querySelector('.button');
        const popupEnd = document.querySelector('.page-add__popup-end');
        const errorsGroup = document.querySelector('.errors-group');

        // Событие отправки формы редактирования товара
        button.addEventListener('click', (evt) => {
            evt.preventDefault();

            const customForm = document.querySelector('.custom-form');
            $.ajax({
                // Загружаем файл
                url: "/src/ajax/actionLoadFile.php",
                type: "POST",
                data:  new FormData(customForm),
                contentType: false,
                processData: false,
                success: function(data){
                    // console.log(data);
                    const loadRes = JSON.parse(data);
                    // console.log(loadRes);
                    if ( loadRes && loadRes[0] === 'err') {
                        errorsGroup.style.display = 'block';
                        const item = document.createElement('div');
                        item.textContent = loadRes[1];
                        errorsGroup.append(item);
                    } else {
                        // Подмешиваем адрес в данные
                        let loadDate = '';
                        if (loadRes[0] === 'noload') {
                            loadDate = $('.custom-form').serialize() + "&photo=" + '';
                        } else {
                            loadDate = $('.custom-form').serialize() + "&photo=" + loadRes[1];
                        }
                        // console.log(loadDate);
                        // Загружаем даннык
                        $.ajax({
                            method: 'POST',
                            url: '/src/ajax/actionSetProduct.php',
                            data: loadDate,
                        }).done(function(response) {
                            errorsGroup.style.display = 'none';
                            errorsGroup.innerHTML = '';
                            // console.log(response);
                            if (response !== '') {
                                const responseDate = JSON.parse(response)
                                // console.log(responseDate);
                                errorsGroup.style.display = 'block';
                                responseDate.forEach(el => {
                                    const item = document.createElement('div');
                                    item.textContent = el;
                                    errorsGroup.append(item);
                                })
                            } else {
                                form.hidden = true;
                                popupEnd.hidden = false;
                            }
                        });
                    }
                }
            });
        });
    };
    // Список товаров в админке - возможно удаление
    const productsList = document.querySelector('.page-products__list');
    if (productsList) {

    productsList.addEventListener('click', evt => {

        const target = evt.target;

        if (target.classList && target.classList.contains('product-item__delete')) {
            productsList.removeChild(target.parentElement);
            $.ajax({
                method: 'POST',
                url: '/src/ajax/actionDeleteProduct.php',
                data: { id: target.getAttribute('name') },
            }).done(function(res) {
                // console.log(res)
            });
        }
    });

}

// Отправляем параметры при сортировке
if (document.querySelector('.shop-page')) {

    const formSorting = document.querySelector('.form_sorting');
    const selectOrderBy = document.querySelector('.select-order-by');
    const selectOrder = document.querySelector('.select-order');

    selectOrderBy.addEventListener('change', () => {
        if (selectOrder.value === 'ASC' || selectOrder.value === 'DESC') {
            formSorting.submit();
        }
    });
    selectOrder.addEventListener('change', () => {
        if (selectOrderBy.value === 'price' || selectOrderBy.value === 'title') {
            formSorting.submit();
        }
    });

}

// jquery range maxmin
if (document.querySelector('.shop-page')) {
    let minPrice = Number($('.all-min-price').text().trim());
    let maxPrice = Number($('.all-max-price').text().trim());
    let minValue = minPrice;
    let maxValue = maxPrice;
    if ($('.min-price-current').val() > 0) {
        minValue = Number($('.min-price-current').val().trim());
    }
    if ($('.max-price-current').val() > 0) {
        maxValue = Number($('.max-price-current').val().trim());
    }
    // console.log(minValue)
    // console.log(maxValue)

    $('.range__line').slider({
        min: minPrice,
        max: maxPrice,
        values: [minValue, maxValue],
        range: true,

        stop: function(event, ui) {
            $('.range-min').text($('.range__line').slider('values', 0));
            $('.input-min-price').val($('.range__line').slider('values', 0));
            $('.range-max').text($('.range__line').slider('values', 1));
            $('.input-max-price').val($('.range__line').slider('values', 1));
        },

        slide: function(event, ui) {
            $('.range-min').text($('.range__line').slider('values', 0));
            $('.input-min-price').val($('.range__line').slider('values', 0));
            $('.range-max').text($('.range__line').slider('values', 1));
            $('.input-max-price').val($('.range__line').slider('values', 1));
        }

    });

}
