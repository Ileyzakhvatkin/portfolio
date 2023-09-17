<section class="shop__list">
    <?php if ( isset($productCatalog[0]) ):
        foreach ( $productCatalog[0] as $key => $product ): ?>
            <article id="<?=$product['price'] ?? 'не указан'; ?>" class="shop__item product" tabindex="<?=$key; ?>">
                <div class="product__image">
                    <img src="<?php if ( $product['photo'] !== '' ) { echo $product['photo']; } else { echo '/img/plug.jpg'; } ?>" alt="<?=$product['title'] ?? 'изображение товара'; ?>">
                </div>
                <p class="product__name"><?=$product['title'] ?? 'не указан'; ?></p>
            <span class="product__price"><?=number_format($product['price'], 0, '', ' ') ?? 'не указан'; ?> руб.</span>
        </article>
        <?php endforeach;
    endif; ?>
</section>
