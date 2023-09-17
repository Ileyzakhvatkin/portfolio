<section class="shop__sorting">
    <form class="shop__sorting form_sorting" method="GET">

        <?php
            $filterParam = ['novelty', 'sale', 'min-price', 'max-price'];
            foreach( $filterParam as $param ):
                if ( isset($getParam[$param]) ): ?>
                    <input type="hidden" name="<?=$param; ?>" value="<?=$getParam[$param]; ?>">
                <?php endif;
            endforeach;
        ?>

        <div class="shop__sorting-item custom-form__select-wrapper">
            <select class="custom-form__select select-order-by" name="order-by">
                <option hidden="">Сортировка</option>
                <?php foreach( $ordersBy as $key => $orderBy ): ?>
                    <option value="<?=$key; ?>"
                    <?php if ( isset($_GET["order-by"]) && $_GET["order-by"] == $key ): ?>
                        selected
                    <?php endif; ?>
                    ><?=$orderBy; ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="shop__sorting-item custom-form__select-wrapper">
            <select class="custom-form__select select-order" name="order">
                <option hidden="">Порядок</option>
                <?php foreach( $orders as $key => $order ): ?>
                    <option value="<?=$key; ?>"
                    <?php if ( isset($_GET["order"]) && $_GET["order"] == $key ): ?>
                        selected
                    <?php endif; ?>
                    ><?=$order; ?></option>
                <?php endforeach; ?>
            </select>
        </div>
    </form>
    <p class="shop__sorting-res">Найдено моделей:
        <span class="res-sort"><?=count($productCatalog[2]) ?? 'не определено'; ?></span>
    </p>
</section>
