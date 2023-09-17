<?php
/**
* Функция отвечает за доступ к определнным разделам сайта
* Она проверяет авторизован ли пользователь, если нет то перенаправляет на страннцу авторизации
* @return ничего не возвращает
*/
function userAccess($allClosePage, $managerClosePage)
{
    $path = parse_url($_SERVER['REQUEST_URI'])["path"];
    if ( ! isset($_SESSION['session_authoriz']) && in_array($path, $allClosePage) ) {
        header("Location: /admin/");
        exit;
    } elseif ( ( isset($_SESSION['session_authoriz']) && $_SESSION['session_authoriz'] !== 'admin' && $_SESSION['session_authoriz'] !== 'manager' ) && in_array($path, $allClosePage) ) {
        header("Location: /admin/");
        exit;
    } elseif ( isset($_SESSION['session_authoriz']) && $_SESSION['session_authoriz'] === 'manager' && in_array($path, $managerClosePage) ) {
        header("Location: /admin/orders/");
        exit;
    }
}
