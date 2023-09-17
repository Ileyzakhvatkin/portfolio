<?php
/**
* Функция получает ои БД данные о пользователе
* @return логины и пароли всех пользователей
*/
function getUsersAccessDate($login)
{
    $stmt = pdoConnect()->query("SELECT * FROM users");
    $array = [];
    $i = 0;
    while ( $row = $stmt->fetch() )
    {
        $array[$i]['login'] = $row['login'];
        $array[$i]['pass'] = $row['pass'];
        $i++;
    }
    return $array;
}
