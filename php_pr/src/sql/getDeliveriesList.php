<?php
/**
* Функция получает из БД данные о способах доставки
* @return данные о товарах
*/
function getDeliveriesList()
{
    $stmt = pdoConnect()->query("SELECT * FROM order_deliveries");

    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'delivery' => $row['delivery'],
            'type' => $row['type'],
        ];
        $list[] = $item;
    }
    return $list;
}
