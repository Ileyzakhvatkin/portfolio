<?php

$pageSize = PAGE_SIZE;

if ( in_array(parse_url($_SERVER['REQUEST_URI'])["path"], $specialPages ) ) {
    $pageSize = SPECIAL_PAGE_SIZE;
}

if ( count($productCatalog[2]) >  $pageSize ) { ?>
<ul class="shop__paginator paginator">
    <?php
    $paginNumber = ceil( count($productCatalog[2]) /  $pageSize );
    $page = 1;
    // $oldGetPagin = array_filter($_GET, fn($key) => $key !== 'page', ARRAY_FILTER_USE_KEY);
    $oldGetPagin = array_filter($_GET, function($key) { return $key !== 'page'; }, ARRAY_FILTER_USE_KEY);
    while ( $page <=  $paginNumber ) { ?>
        <li>
            <a  class="paginator__item"
            <?php
            if ( empty($_GET['page']) || $_GET['page'] != $page ):
                if ( http_build_query($oldGetPagin) != '' ): ?>
                href="?page=<?=$page . '&' . http_build_query($oldGetPagin); ?>"
            <?php else: ?> href="?page=<?=$page; ?> "
            <?php endif;
                endif; ?> ><?=$page; ?></a>
        </li>
    <?php
        $page ++;
    } ?>
</ul>
<?php } ?>
