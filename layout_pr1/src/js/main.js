(() => {

  if ( document.querySelector('#gallery-select') ) {
    const choices = new Choices(document.querySelector('#gallery-select'), {
      searchEnabled: false,
      shouldSortItems: false,
    });
  };

  if ( document.querySelector('.top-wrapper__banners-swiper') ) {
    var swiperBanners = new Swiper(".top-wrapper__banners-swiper", {
      allowTouchMove: false,
      loop: true,
      effect: 'fade',
      speed: 10000,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      }
    });
  };

  if ( document.querySelector('.gallery__swiper') ) {
    var swiperGallery = new Swiper(".gallery__swiper", {
      slidesPerView: 3,
      navigation: {
        nextEl: ".gallery__button-next",
        prevEl: ".gallery__button-prev",
      },
      pagination: {
        el: ".gallery__pagination",
        type: "fraction",
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 28
        },
        541: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 22
        },
        769: {
          slidesPerView: 2,
          slidesPerGroup: 3,
          spaceBetween: 28
        },
        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 47
        },
      },
    });
  };

  if ( document.querySelector('.catalog__accordion') ) {
    $( ".catalog__accordion" ).accordion({
      "header": ".catalog__acc-item",
      heightStyle: "content",
    });
  };

  if ( document.querySelector('.events__swiper') ) {
    var swiperEvents = new Swiper(".events__swiper", {
      slidesPerView: 3,
      navigation: {
        nextEl: ".events__button-next",
        prevEl: ".events__button-prev",
      },
      pagination: {
        el: ".events__pagination",
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 34
        },
        541: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        769: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 27
        },
        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        },
      },
    });
  };

  if ( document.querySelector('.partners__swiper') ) {
    var swiperPartners = new Swiper(".partners__swiper", {
      slidesPerView: 3,
      slidesPerGroup: 1,
      navigation: {
        nextEl: ".partners__button-next",
        prevEl: ".partners__button-prev",
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
          spaceBetween: 34
        },
        541: {
          slidesPerView: 2,
          spaceBetween: 34
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 50
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 49
        },
      },
    });
  };

  // Инициализация тултипов
  tippy('.tooltip-btn', {
    theme: 'tooltipBtn',
    maxWidth: 264,
  });

  // Модерация формы
  if ( document.querySelector('#callform') ) {
    let selectorTel = document.querySelector("input[type='tel']");
    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selectorTel);

    new JustValidate('#callform', {
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
            return Number(phone) && phone.length === 10;
          }
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
      },

      submitHandler: function(form) {
        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // console.log('Отправлено');
              document.querySelector('.contacts__submit-box').style.display = 'none';
              document.querySelector('.contacts__submit-massage').style.display = 'block';
            };
          };
        };
        xhr.open('POST', './resourses/mail.php', true);
        xhr.send(formData);
        form.reset();
      }
    });
  };

  // Модальные окна
  function actionModal(typeModal) {
    const modalRoot = document.querySelector(typeModal);
    const modalClose = modalRoot.querySelector('.modal__close-btn');
    function animateRemoveModal() {
      modalRoot.classList.remove('modal__opacity');
      document.querySelector('body').style.overflow = 'visible';
      setTimeout(() => {
        modalRoot.classList.remove('modal__show');
      }, 1010);
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
    if (document.querySelector('.gallery__list-img')) {
      document.querySelectorAll('.gallery__item-img-link').forEach(el => {
        el.addEventListener('click', () => {
          actionModal('#modal-wind');
        });
        el.addEventListener('keyup', (event) => {
          if( event.code === 'Enter' ) {
            actionModal('#modal-wind');
          }
        });
      });
    };

    // Мобильное меню
    const mainMenu = document.querySelector('.mobile-menu');
    document.querySelector('.burger').addEventListener('click', () => {
      mainMenu.classList.toggle('mobile-menu__menu-active');
    });
    document.querySelectorAll('.mobile-menu__menu-link').forEach(el => {
      el.addEventListener('click', () => {
        mainMenu.classList.remove('mobile-menu__menu-active');
        document.querySelector('.burger__input').checked = false;
      })
    })
    document.querySelector('.mobile-menu__enter-link').addEventListener('click', () => {
      mainMenu.classList.remove('mobile-menu__menu-active');
      document.querySelector('.burger__input').checked = false;
    })

    // Мобильный поиск
    const searchBox = document.querySelector('.search-mobile');
    document.querySelector('.header__search-open').addEventListener('click', () => {
      searchBox.classList.add('search-mobile__active');
    });
    document.querySelector('.search-mobile__close').addEventListener('click', () => {
      searchBox.classList.remove('search-mobile__active');
    });

    // Скрипт выпадающего верхнего меню
    const allButtons = document.querySelectorAll('.drop-menu__menu-btn');
    allButtons.forEach((brn) => {
      brn.addEventListener('click', (event) => {
        const path = event.currentTarget.dataset.path;

        document.querySelectorAll('.custom-scrol-menu__link').forEach((el) => {el.removeAttribute('tabindex')});

        document.querySelectorAll('.menu-btn-active').forEach((el) => {
          el.classList.remove('menu-btn-active');
        })

        brn.classList.add('menu-btn-active');

        document.querySelectorAll('.custom-scrol-active').forEach((el) => {
          if (path !== el.getAttribute('data-target')) {
            el.classList.remove('custom-scrol-active');
          }
        })

        const activePath = document.querySelector(`[data-target="${path}"]`);
        activePath.classList.toggle('custom-scrol-active');
        if (document.querySelectorAll('.custom-scrol-active').length > 0 ) {
          activePath.querySelectorAll('.custom-scrol-menu__link').forEach((link) => {
            link.setAttribute('tabindex', '0');
          });
        } else {
          activePath.querySelectorAll('.custom-scrol-menu__link').forEach((link) => {
            link.removeAttribute('tabindex');
          });
        }

      });
    });
    // Скрипт закрываниия верхнего меню по клику на свободную область
    const body = document.querySelector('.body')
    allButtons.forEach((btn) => {
      btn.addEventListener('click', event => {
        event._isClickWithinModal = true;
        body.querySelectorAll('.custom-scrol-active').forEach((box) => {
          box.addEventListener('click', event => {
            event._isClickWithinModal = true;
          })
        })
      })
    })
    body.addEventListener('click', event => {
      if (event._isClickWithinModal) return;
      body.querySelectorAll('.custom-scrol-active').forEach((el) => {
        el.classList.remove('custom-scrol-active');
      })
      allButtons.forEach((el) => {
        el.classList.remove('menu-btn-active');
      })
      document.querySelectorAll('.custom-scrol-menu__link').forEach((el) => {el.removeAttribute('tabindex')});
    })

    // Табы в аккордионе
    const accOpenBtn = document.querySelectorAll('.greed-acc__open-btn');
    accOpenBtn.forEach(el => {
      el.addEventListener('click', (event) => {
        const path = event.currentTarget.dataset.path;
        document.querySelectorAll('.painter-tabs__item').forEach((tabContent) => {
          tabContent.classList.remove('painter-tabs__avtive')
        })
        accOpenBtn.forEach(btn => {
          btn.classList.remove('greed-acc__active-btn');
        })
        el.classList.add('greed-acc__active-btn');
        document.querySelector(`[data-target="${path}"]`).classList.add('painter-tabs__avtive')
      })
    })

    // Карта Яндекс
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("yamap",
        {
            center: [55.758799, 37.610950],
            controls: ['geolocationControl', 'zoomControl'],
            zoom: 14
        },
        {
          suppressMapOpenBlock: true,
          zoomControlSize: "small",
          zoomControlFloat: "none",
          zoomControlPosition: { top: "280px", right: "20px" },
          geolocationControlSize: "large",
          geolocationControlPosition:  { top: "360px", right: "20px" },
          geolocationControlFloat: 'none',
        });

        var myPlacemark = new ymaps.Placemark([55.758799, 37.610950], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/yapoint.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [-10, -10]
        }
      );
      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable(['scrollZoom', 'drag']);
    }

    // Скрол
    const MOBILE_WIDTH = 580;
    function getWindowWidth () {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }
    function scrollToContent (link, isMobile) {
      if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
        return;
      }
      const href = link.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
    }
    document.querySelectorAll('.mobile-menu__menu-link').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToContent(this, true);
      });
    });

  });

})();
