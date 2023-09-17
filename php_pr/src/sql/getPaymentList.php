<?php
/**
* Функция получает из БД данные о способах доставки
* @return данные о товарах
*/
function getPaymentList()
{
    $stmt = pdoConnect()->query("SELECT * FROM order_payments");
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'payment' => $row['payment'],
            'type' => $row['type'],
        ];
        $list[] = $item;
    }
    return $list;
}
