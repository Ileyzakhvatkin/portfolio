<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getOrdersList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getStatusList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_header_tmp.php';
$orders = getOrdersList();
$statuses = getStatusList();
?>

<main class="page-order">
    <h1 class="h h--1">Список заказов</h1>
    <ul class="page-order__list">
    <?php if (isset($orders)) {
    foreach ($orders as $key => $order) {  ?>
        <li class="order-item page-order__item">
            <div class="order-item__wrapper">
            <div class="order-item__group order-item__group--id">
                <span class="order-item__title">Номер заказа</span>
                <span class="order-item__info order-item__info--id">
                    <?=$order['id'] ?? ''; ?>
                </span>
            </div>
            <div class="order-item__group">
                <span class="order-item__title">Сумма заказа</span>
                <?=number_format($order['total'], 0, '', ' ') ?? 'не указан'; ?> руб.
            </div>
            <button class="order-item__toggle"></button>
            </div>
            <div class="order-item__wrapper">
            <div class="order-item__group order-item__group--margin">
                <span class="order-item__title">Заказчик</span>
                <span class="order-item__info">
                    <?=implode(' ', $order['user']); ?>
                </span>
            </div>
            <div class="order-item__group">
                <span class="order-item__title">Номер телефона</span>
                <span class="order-item__info">
                <?=$order['phone']; ?>
                </span>
            </div>
            <div class="order-item__group">
                <span class="order-item__title">Способ доставки</span>
                <span class="order-item__info">
                    <?=$order['delivery'] ?? 'не указан'; ?>
                </span>
            </div>
            <div class="order-item__group">
                <span class="order-item__title">Способ оплаты</span>
                <span class="order-item__info">
                    <?=$order['payment'] ?? 'не указан'; ?>
                </span>
            </div>
            <div class="order-item__group order-item__group--status">
                <span class="order-item__title">Статус заказа</span>
                <span class="order-item__info
                <?php if ($order['status'] == 'Не выполнено') {
                    echo 'order-item__info--no';
                } else {
                    echo 'order-item__info--yes';
                } ?>"><?=$order['status']; ?></span>
                <button class="order-item__btn" name="<?=$order['id'] ?? 'не указан'; ?>">Изменить</button>
            </div>
            </div>
            <div class="order-item__wrapper">
            <div class="order-item__group">
                <span class="order-item__title">Адрес доставки</span>
                <span class="order-item__info">
                    <?=implode(', ', $order['address']); ?>
                </span>
            </div>
            </div>
            <div class="order-item__wrapper">
            <div class="order-item__group">
                <span class="order-item__title">Комментарий к заказу</span>
                <span class="order-item__info">
                    <?=$order['comment'] ?? 'не указан'; ?>
                </span>
            </div>
            </div>
        </li>
    <?php }}?>

    </ul>
</main>

<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_footer_tmp.php'; ?>
