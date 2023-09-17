<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_header_tmp.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getProductEditList.php';
$products = getProductEditList('');
?>

<main class="page-products">

    <h1 class="h h--1">Товары</h1>
    <!-- <pre>
        <?php var_dump($products[3]) ?>
    </pre> -->
    <a class="page-products__button button" href="./add/">Добавить товар</a>
    <div class="page-products__header">
    <span class="page-products__header-field">Название товара</span>
    <span class="page-products__header-field">ID</span>
    <span class="page-products__header-field">Цена</span>
    <span class="page-products__header-field">Категория</span>
    <span class="page-products__header-field">Новинка</span>
    </div>
    <ul class="page-products__list">
    <?php if (isset($products )) {
    foreach ($products as $key => $product) {?>
        <li class="product-item page-products__item">
            <b class="product-item__name"><?=$product['title']; ?></b>
            <span class="product-item__field"><?=$product['id']; ?></span>
            <span class="product-item__field"><?=number_format($product['price'], 2, '.', ' '); ?> руб.</span>
            <span class="product-item__field">
                <?php foreach($product['cat_name'] as $name) { ?>
                    <div><?=$name; ?> </div>
                <?php };?>
            </span>
            <span class="product-item__field"><?=$product['new'] === 'on' ? 'Да' : 'Нет'; ?></span>
            <a href="./add/?prod_id=<?=$product['id']; ?>" class="product-item__edit" aria-label="Редактировать"></a>
            <button class="product-item__delete" name="<?=$product['id']; ?>"></button>
        </li>
    <?php }}?>

    </ul>
</main>

<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_footer_tmp.php'; ?>
