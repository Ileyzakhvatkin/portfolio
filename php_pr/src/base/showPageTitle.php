<?php
/**
* Функция вывода заголовка страницв
* @param массив в который передаются данные меню
* @return функция возвращает строку - заголовок страницы
*/
function showPageTitle($array)
{
    foreach ($array as $item) {
        if ( $item['path'] == $_SERVER["REQUEST_URI"] ) {
            return $item['title'];
        }
    }
}
