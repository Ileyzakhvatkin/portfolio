<?php $getParam = $_GET; ?>
<section class="shop__filter filter">
    <form class="form_filters" method="GET">

    <?php
        $sortaram = ['order', 'order-by'];
        foreach( $sortaram as $param ):
            if ( isset($getParam[$param]) ): ?>
                <input type="hidden" name="<?=$param; ?>" value="<?=$getParam[$param]; ?>">
            <?php endif;
        endforeach;
    ?>

    <div class="filter__wrapper">
      <b class="filter__title">Категории</b>
      <ul class="filter__list">
        <li>
          <a class="filter__list-item
          <?=parse_url($_SERVER['REQUEST_URI'])['path'] == '/' ? 'active' : ''; ?>"
          " href="/">Все</a>
        </li>
        <?php foreach ( $categories as $category ): ?>
            <li>
                <a class="filter__list-item
                <?=parse_url($_SERVER['REQUEST_URI'])['path'] == $category['path'] ? 'active' : ''; ?>"
                href="<?=$category['path']; ?>">
                <?=$category['name']; ?>
                </a>
            </li>
        <?php endforeach; ?>
      </ul>
    </div>
        <div class="filter__wrapper">
            <b class="filter__title">Фильтры</b>
            <span class="range__res-item all-min-price" style="display: none;"><?=min($allCosts); ?></span>
            <span class="range__res-item all-max-price" style="display: none;"><?=max($allCosts); ?></span>
            <div class="filter__range range">
                <span class="range__info">Цена</span>
                <div class="range__line" aria-label="Range Line"></div>
                <div class="range__res">

                <span><span class="range__res-item range-min"><?php if ( isset($_GET['min-price']) ) { echo $_GET['min-price']; } else { echo min($allCosts); } ?></span> руб.</span>
                <span><span class="range__res-item range-max"><?php if ( isset($_GET['max-price']) ) { echo $_GET['max-price']; } else { echo max($allCosts); } ?></span> руб.</span>
                </div>

                <input class="input-min-price" type="hidden" name="min-price"
                    id="min-price" value="<?php if ( isset($_GET['min-price']) ) { echo $_GET['min-price']; } else { echo min($allCosts); } ?>" >
                <input class="input-max-price" type="hidden" name="max-price"
                    id="max-price" value="<?php if ( isset($_GET['max-price']) ) { echo $_GET['max-price']; } else { echo max($allCosts); } ?>" >

                <input class="min-price-current" type="hidden"
                    id="min-price" value="<?=$_GET['min-price'] ?? ''; ?>" >
                <input class="max-price-current" type="hidden"
                    id="max-price" value="<?=$_GET['max-price'] ?? ''; ?>" >
            </div>
      </div>

    <fieldset class="custom-form__group">
        <input type="checkbox" name="novelty" id="novelty"
        class="custom-form__checkbox" <?php if ( isset($getParam['novelty']) ) {echo 'checked';} ?>>
        <label for="novelty" class="custom-form__checkbox-label custom-form__info" style="display: block;">Новинка</label>
        <input type="checkbox" name="sale" id="sale"
        class="custom-form__checkbox" <?php if ( isset($getParam['sale']) ) {echo 'checked';} ?>>
        <label for="sale" class="custom-form__checkbox-label custom-form__info" style="display: block;">Распродажа</label>
    </fieldset>
        <button class="button" type="submit" style="width: 100%">Применить</button>
        <br>
        <?php if ( isset(parse_url($_SERVER['REQUEST_URI'])['query']) ): ?>
            <a class="custom-form__clear" href="<?=parse_url($_SERVER['REQUEST_URI'])['path']; ?>">Сбросить</a>
        <?php endif; ?>
    </form>
  </section>
