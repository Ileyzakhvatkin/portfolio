<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/imageLoad.php';

if ( $_FILES['product-photo']['name'] === '' ) {
    $result =  ['noload', ''];
} else {
    $result = imageLoad('/img/products/', $_FILES['product-photo']);
}
echo json_encode($result);
exit;
