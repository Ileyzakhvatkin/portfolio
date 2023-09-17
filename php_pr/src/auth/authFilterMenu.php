<?php
/**
* Функция формирует меню в запвисимости от уровня авторизации
* @return массив с данными цпунктов меню
*/
function authFilterMenu($menuFull)
{
    $authMenu = array_filter($menuFull, function($el) { return $el['access'] == 0; });
    if ( isset($_SESSION['session_authoriz']) ) {
        if ( $_SESSION['session_authoriz'] === 'manager' ) {
            $authMenu = array_filter($menuFull, function($el) { return $el['access'] == 0 || $el['access'] == 1 ; });
        } elseif ( $_SESSION['session_authoriz'] === 'admin' ) {
            $authMenu = $menuFull;
        }
    }
     return $authMenu;
}
