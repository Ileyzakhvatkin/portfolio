import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import CartPage from '@/pages/CartPage.vue';

// Сообщаем Vue что используется роутер
Vue.use(VueRouter);

// Создаем экземпляр роутера
const router = new VueRouter({
  // mode: 'history',
  // Массив маршрутов
  routes: [
    { name: 'main', component: MainPage, path: '/' },
    { name: 'mainCategory', component: MainPage, path: '/:categoryid' },
    { name: 'product', component: ProductPage, path: '/product/:id' },
    { name: 'cart', component: CartPage, path: '/cart' },
    { name: 'order', component: OrderPage, path: '/order' },
    { name: 'orderInfo', component: OrderInfoPage, path: '/order/:orderId' },
    { name: 'notFound', component: NotFoundPage, path: '*' },
  ],
});

export default router;
