<?php
/**
* Функция создает подключение к базе данных
* @return pdo - переменную для подкючения через плагин PDO
*/
function pdoConnect()
{
    static $pdo = null;
    if (null === $pdo) {
        $pdo = new PDO(MYSQL_DNS, MYSQL_USER, MYSQL_PASS) or die('Ошибка соединения');
    }
    return $pdo;
}
