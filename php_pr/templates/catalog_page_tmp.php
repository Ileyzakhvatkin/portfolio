<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_header_tmp.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/allFiltersCatalog.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/allCosts.php';

$productCatalog = allFiltersCatalog($_SERVER['REQUEST_URI'], $categories, $specialPages, $ordersBy, $orders);
if ( count($productCatalog[1]) > 0 ):
    $allCosts = allCosts($productCatalog[1]);
else:
    $allCosts = [0];
endif;
