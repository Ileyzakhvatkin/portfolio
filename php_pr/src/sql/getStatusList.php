<?php
/**
* Функция получает из БД данные список всех статусов заказа
* @return данные о товарах
*/
function getStatusList()
{
    $stmt = pdoConnect()->query("SELECT * FROM order_statuses");
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'status' => $row['status'],
        ];
        $list[] = $item;
    }
    return $list;
}
