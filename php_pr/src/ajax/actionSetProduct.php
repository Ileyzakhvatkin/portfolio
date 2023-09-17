<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/setProductInfo.php';

$result = [];
if ( isset($_POST) ) {
    $post = $_POST;
    if ( empty($post['product-name'])) {
        $result[] ='Заполните название товара';
    }
    if ( empty($post['product-price'])) {
        $result[] = 'Заполните цену товара';
    } elseif ( preg_match('/^\-?\d+(\.\d{0,})?$/', $post['product-price']) === 0 ) {
        $result[] = 'Цена не является числом';
    }
    if ( empty($post['category']) ) {
        $result[] = 'Выберете категорию товара';
    }

    if ( count($result) === 0 ) {
        setProductInfo($_POST);
    } else {
        echo json_encode($result);
    }
}
exit;
