<?php
/**
* Функция - загрузчик изображений, проверяет условия загрузки и записывает загружаемый файл
* @return функция возвращает сообщение о результатах загрузки и в случае ошибки и в случае успеха
*/
function imageLoad($path, $files)
{
    $uploadPath = $_SERVER['DOCUMENT_ROOT'] . $path;

    $imageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if ( ! in_array($files['type'], $imageType) ) {
        return ['err', 'Загружаемый файл ' . $files['name'] . ' не изображение - ошибка загрузки'];
    }
    if ( $files['size'] > (ONE_MEGABAIT * MAX_LOAD_FILE_SIZE) ) {
        return ['err', 'Размер файла ' . $files['name'] . ' больше ' . MAX_LOAD_FILE_SIZE . ' мегабайт - ошибка загрузки'];
    }
    if ( ! empty($files['error']) ) {
        return ['err', 'При загрузке файла ' . $files['name'] . ' возникла системная ошибка: ' . $error];
    }

    $loadFileName = rand(100000, 999999) . '-' . preg_replace('/[^0-9A-Za-z\.\_\-]/', '_',  $files['name']);

    move_uploaded_file($files['tmp_name'], $uploadPath . $loadFileName);

    return ['load',  $path . $loadFileName];
}
