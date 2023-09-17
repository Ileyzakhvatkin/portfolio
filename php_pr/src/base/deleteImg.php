<?php
/**
* Функция - удаление изображений
* @param путь к файлу, который удаляется
* @return функция ничего не возвращает
*/
function deleteImg($deleteImg)
{
    $deleteImgPath = $_SERVER['DOCUMENT_ROOT'] . $deleteImg;
    if ( is_file($deleteImgPath) ) {
        unlink($deleteImgPath);
    }
}
