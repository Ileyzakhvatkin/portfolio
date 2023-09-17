<?php
/**
* Функция получает из БД данные о товарах
* @return данные о товарах
*/
function getMenuList()
{
    $stmt = pdoConnect()->query("SELECT * FROM menu ORDER by sort ASC");
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'title' => $row['title'],
            'path' => $row['path'],
            'sort' => $row['sort'],
            'access' => $row['access'],
        ];
        $list[] = $item;

    }
    return $list;
}
