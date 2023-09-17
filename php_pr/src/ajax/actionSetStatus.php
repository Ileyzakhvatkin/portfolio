<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/setOrderStatus.php';

$result = [];
if ( isset($_POST) ) {
    $post = $_POST;
    if ( empty($post['orderId']) ) {
        $result[] = 'Незадан id заказа';
    }
    if ( empty($post['status']) ) {
        $result[] = 'Незадан статус заказа';
    }

    if ( count($result) === 0 ) {
        setOrderStatus($post);
    } else {
        echo json_encode($result);
    }
}
