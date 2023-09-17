<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_header_tmp.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getProductEditList.php';

if (isset($_GET['prod_id'])) {
    $productDate = getProductEditList("and products.id = " . (int) $_GET['prod_id'])[0];

    $pageTitle = 'Изменение товара';
    $buttonTitle = 'Изменить товар';
    $finishTitle = 'Товар успешно изменен';
} else {
    $pageTitle = 'Добавление товара';
    $buttonTitle = 'Добавить товар';
    $finishTitle = 'Товар успешно добавлен';
}

?>
<main class="page-add">
    <h1 class="h h--1"><?=$pageTitle; ?></h1>
        <form action="<?=$_SERVER['REQUEST_URI']?>" class="custom-form" method="post" enctype="multipart/form-data" >
        <fieldset class="page-add__group custom-form__group">
            <legend class="page-add__small-title custom-form__title">Данные о товаре</legend>
            <?php if (isset($productDate["id"])) { ?>
                <label for="product-id">
                    <input type="hidden" class="custom-form__input"
                    name="product-id" id="product-id" value="<?=$productDate["id"]; ?>">
                </label>
            <?php } ?>

            <label for="product-name" class="custom-form__input-wrapper page-add__first-wrapper">
                <input type="text" class="custom-form__input"
                name="product-name" id="product-name"
                <?php if (isset($productDate["title"])) { ?>
                    value="<?=htmlspecialchars($productDate["title"] ?? ''); ?>">
                <?php } else { ?>
                >
                <p class="custom-form__input-label">Название товара</p>
                <?php } ?>
            </label>

            <label for="product-price" class="custom-form__input-wrapper">
                <input type="text" class="custom-form__input"
                name="product-price" id="product-price"
                <?php if (isset($productDate["price"])) { ?>
                value="<?=htmlspecialchars($productDate["price"] ?? ''); ?>">
                <?php }  else { ?>
                >
                <p class="custom-form__input-label">Цена товара</p>
                <?php } ?>

            </label>
        </fieldset>
        <fieldset class="page-add__group custom-form__group">
            <legend class="page-add__small-title custom-form__title">Фотография товара</legend>
            <ul class="add-list">
            <!-- id="<?=$productDate["photo"]; ?>" -->
                <li class="add-list__item add-list__item--add"
                <?php if (isset($productDate["photo"])): ?>
                    style="background: url('<?=$productDate["photo"]; ?>') no-repeat center center"
                <?php endif; ?> >
                    <input type="file" name="product-photo"
                    id="product-photo" hidden="">
                    <label for="product-photo">Добавить фотографию</label>
                </li>
            </ul>
        </fieldset>

        <fieldset class="page-add__group custom-form__group">
            <legend class="page-add__small-title custom-form__title">Раздел</legend>
            <div class="page-add__select">
            <select name="category[]" class="custom-form__select" multiple="multiple">
                <option hidden="">Название раздела</option>
                <?php foreach ($categories as $category) { ?>
                    <option value="<?=$category['id']; ?>"
                    <?php
                    if ( isset($productDate['cat_name']) ) {
                        if (in_array($category['name'], $productDate['cat_name'])) {?>
                            selected
                        <?php }} ?>
                    >
                        <?=$category['name']; ?>
                    </option>
                <?php } ?>
            </select>
            </div>
            <input type="checkbox" name="new"
            id="new" class="custom-form__checkbox"
            <?php if (isset($productDate["new"]) && $productDate["new"] == 'on') { ?>
                checked="checked"
            <?php } ?>
            >
            <label for="new" class="custom-form__checkbox-label">Новинка</label>
            <input type="checkbox" name="sale"
            id="sale" class="custom-form__checkbox"
            <?php if (isset($productDate["sale"]) && $productDate["sale"] == 'on') { ?>
                checked="checked"
            <?php } ?>
            >
            <label for="sale" class="custom-form__checkbox-label">Распродажа</label>
        </fieldset>

        <fieldset class="page-add__group custom-form__group errors-group">
        </fieldset>

        <button class="button" type="submit"><?=$buttonTitle; ?></button>
    </form>

  <section class="shop-page__popup-end page-add__popup-end" hidden="">
    <div class="shop-page__wrapper shop-page__wrapper--popup-end">
      <h2 class="h h--1 h--icon shop-page__end-title"><?=$finishTitle; ?></h2>
      <a class="page-products__button button" href="/admin/products/">Продолжить...</a>
    </div>
  </section>
</main>

<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_footer_tmp.php'; ?>
