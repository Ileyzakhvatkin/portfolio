<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/setOrderInfo.php';

$result = [];
if ( isset($_POST) ) {
    $post = $_POST;
    if ( empty($post['surname'])) {
        $result[] = 'Заполните фамилию';
    }
    if ( empty($post['name']) ) {
        $result[] = 'Заполните имя';
    }
    if ( empty($post['phone']) ) {
        $result[] = 'Заполните телефон';
    }
    if ( empty($post['email']) ) {
        $result[] = 'Заполните email';
    }
    if ( $post['delivery'] == '1' ) {
        if ( empty($post['city']) ) {
            $result[] = 'Введите название города';
        }
        if ( empty($post['street']) ) {
            $result[] = 'Введите название улицы';
        }
        if ( empty($post['home']) ) {
            $result[] = 'Введите номер дома';
        }
        if ( empty($post['aprt']) ) {
            $result[] = 'Введите номер квартиры';
        }
    }

    if ( count($result) > 0 ) {
        echo json_encode($result);
    } else {
        if ( isset($post['total']) && $post['delivery'] == '1' && $post['total'] < BACKET_MIN ) {
            $post['total'] = $post['total'] + DELIVERY_COST;
        }
        setOrderInfo($post);
    }
}
exit;
