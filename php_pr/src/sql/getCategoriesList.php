<?php
/**
* Функция получает из БД данные о товарах
* @return данные о товарах
*/
function getCategoriesList()
{
    $stmt = pdoConnect()->query("SELECT *  FROM categories");

    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'name' => $row['name'],
            'path' => $row['path'],
            'alias' => $row['alias'],
        ];
        $list[] = $item;
    }
    return $list;
}
