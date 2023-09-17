<section class="shop container">
    <div class="shop__wrapper">

        <h1 class="h h--1"><?=showPageTitle($mainMenu); ?></h1>
        <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/shop_sorting_tmp.php'; ?>
        <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/shop_list_tmp.php'; ?>
        <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/shop_paginator_tmp.php'; ?>
    </div>
</section>
<section class="shop-page__order" hidden="">
    <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/shop_order_tmp.php'; ?>
</section>
<section class="shop-page__popup-end" hidden="">
    <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/shop_end_tmp.php'; ?>
</section>
