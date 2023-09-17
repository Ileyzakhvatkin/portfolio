<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getLastId.php';
/**
* Функция создает нового пользователя, адоес доставки и запись л новом заказе
* @return нечего не возвоащает
*/
function setOrderInfo($post)
{
    // Создаем пользователя
    pdoConnect()
        ->prepare("
            INSERt INTO users (surname, name, lastname, email, phone)
            VALUES(:surname, :name, :lastname, :email, :phone)")
        ->execute([
            'surname' => strip_tags($post['surname']),
            'name' => strip_tags($post['name']),
            'lastname' => strip_tags($post['lastname']),
            'email' => strip_tags($post['email']),
            'phone' => strip_tags($post['phone']),
        ]);

    // Получаем инжентификатор пользователя
    $user_id = getLastId('users');

    // Связываем пользователя с группой
    $stmt = pdoConnect()
        ->prepare("
            INSERt INTO user_group (user_id, group_id)
            VALUES(:user_id, :group_id)")
        ->execute([
            'user_id' => (int) $user_id,
            'group_id' => '3',
        ]);

    // Создаем запис об адресе
    $addres_id = 1;
    if ($post['delivery'] == '1') {
        pdoConnect()
            ->prepare("
                INSERt INTO order_addreses (city, street, home, aprt)
                VALUES(:city, :street, :home, :aprt);")
            ->execute([
                'city' => strip_tags($post['city']),
                'street' => strip_tags($post['street']),
                'home' => strip_tags($post['home']),
                'aprt' => strip_tags($post['aprt']),
            ]);
        // Получаем инжентификатор адреса
        $addres_id = getLastId('order_addreses');
    }

    // Создаем заказ
    $payment_id = 1;
    if ( isset($post['pay']) ) {
        $payment_id = strip_tags($post['pay']);
    }
    pdoConnect()
        ->prepare("
            INSERt INTO orders (user_id, statys_id, delivery_id, payment_id, addres_id, total, comment)
            VALUES(:user_id, :statys_id, :delivery_id, :payment_id, :addres_id, :total, :comment)")
        ->execute([
            'user_id' => $user_id,
            'statys_id' => '1',
            'delivery_id' => (int) $post['delivery'],
            'payment_id' => (int)  $payment_id,
            'addres_id' => (int) $addres_id,
            'total' => strip_tags($post['total']),
            'comment' => strip_tags($post['comment']),
        ]);
}
