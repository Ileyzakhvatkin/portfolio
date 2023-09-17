<?php
/**
* Функция - принимает часть входящего URI, обрабатывает все GET параметры и формирует выборку товаров
* @return массив в котором храняться данные двух массивов выбранных товаров и всех товаров в категории
*/
function allFiltersCatalog($path, $categories, $specialPages, $ordersBy, $orders)
{
    $get = $_GET;

    $clearPath = parse_url($path)["path"];
    $allWhere = [' active = 1 '];
    $maxWhere = [' active = 1 '];
    $addCategory = '';

    if ( in_array($clearPath, array_map(function($el) { return $el['path']; }, $categories))) {
        $addCategory = " LEFT JOIN products_categories ON product_id = products.id LEFT JOIN categories ON category_id = categories.id ";
        $allWhere[] = " categories.path = '" . $clearPath . "'";
        $maxWhere[] = " categories.path = '" . $clearPath . "'";
    }
    if ( isset($get['sale']) ) {
        $allWhere[] = "sale = 'on'";
    }
    if ( isset($get['novelty']) ) {
        $allWhere[] = "novelty = 'on'";
    }
    if ( isset($get['min-price']) ) {
        $allWhere[] = "price >= " . (int) $get['min-price'];
    }
    if ( isset($get['max-price']) ) {
        $allWhere[] = "price <= " . (int) $get['max-price'];
    }

    $pageSize = PAGE_SIZE;
    if ( in_array($clearPath, $specialPages) ) {
        $allWhere[] = str_replace("/", "", $specialPages[array_search($clearPath, $specialPages)]) . " = 'on'";
        $pageSize = SPECIAL_PAGE_SIZE;
    }

    if ( count($allWhere) > 0 ) {
        $requestAllWhere = ' WHERE ' . implode(' and ', $allWhere);
    }
    if ( count($maxWhere) > 0 ) {
        $requestMaxWhere = ' WHERE ' . implode(' and ', $maxWhere);
    }

    $paginProduct = 1;
    $requestLimit = ' LIMIT ' . $pageSize;
    $requestOffset = "";
    if ( isset($get['page']) ) {
        $paginProduct = ( (int) $get['page'] - 1 ) * $pageSize;
        $requestOffset = ' OFFSET ' . $paginProduct;
    };


    $requestOrder = ' ORDER by id ASC';
    if ( isset($get['order-by']) && isset($get['order']) ) {
        $requestOrder = " ORDER BY "
            . array_keys($ordersBy)[array_search($get['order-by'], array_keys($ordersBy))]
            . " "
            . array_keys($orders)[array_search($get['order'], array_keys($orders))];
    }

    $products = getProductList($addCategory . $requestAllWhere . $requestOrder . $requestLimit . $requestOffset );
    $productsId = getProductId($addCategory . $requestMaxWhere);
    $productsCount = getProductId($addCategory . $requestAllWhere);

    return [$products, $productsId, $productsCount];
}
