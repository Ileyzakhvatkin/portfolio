<?php
/**
* Функция  базе данных
* @return ID
*/
function getLastId($table)
{
    $stmt = pdoConnect()->query("SELECT id FROM " . $table );
    $arr = [];
    while ( $row = $stmt->fetch() )
    {
        $arr[] = $row['id'];
    }
    $lastId = $arr[count($arr) - 1];

    return $lastId;
}
