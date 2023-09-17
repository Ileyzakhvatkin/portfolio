<?php
/**
* Функция получает из БД данные о заказах их сттатусах, доствке, оплате и покупателях
* @return данные о товарах
*/
function getOrdersList()
{
    $stmt = pdoConnect()->query("
        SELECT orders.id, orders.total, orders.comment,
        users.phone, users.name, users.lastname, users.surname,
        order_addreses.city, order_addreses.street, order_addreses.home, order_addreses.aprt,
        order_statuses.status,
        order_payments.payment,
        order_deliveries.delivery
        FROM orders
            LEFT JOIN users ON user_id = users.id
            LEFT JOIN order_addreses ON addres_id = order_addreses.id
            LEFT JOIN order_statuses ON statys_id = order_statuses.id
            LEFT JOIN order_payments ON payment_id = order_payments.id
            LEFT JOIN order_deliveries ON delivery_id = order_deliveries.id
        ORDER by statys_id ASC, id DESC
    ");

    $list = [];
    while ( $row = $stmt->fetch() )
    {

        $item = [
            'id' => $row['id'],
            'address' => [
                'sity' => $row['city'],
                'street' => $row['street'],
                'house' => $row['home'],
                'appart' => $row['aprt'],
            ],
            'comment' => $row['comment'],
            'phone' => $row['phone'],
            'user' => [
                'surname' => $row['surname'],
                'name' => $row['name'],
                'lastname' => $row['lastname'],
            ],
            'status' => $row['status'],
            'payment' => $row['payment'],
            'delivery' => $row['delivery'],
            'total' => $row['total'],
        ];

        $list[] = $item;

    }
    return $list;
}
