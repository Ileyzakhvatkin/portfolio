<?php
/**
* Функция перезадает куки у авторизованных пользователей
* @return ничего не возвращает
*/
function updateCookeis()
{
    // var_dump($_SESSION['session_authoriz']);
    if (! empty($_SESSION['session_authoriz']) && isset($_COOKIE['old_user']) ) {
        // var_dump($_COOKIE['old_user']);
        setcookie('old_user', $_COOKIE['old_user'], time() + MAX_COOKEI_LIFE);
        // var_dump('обновили куки!');
    }
}
