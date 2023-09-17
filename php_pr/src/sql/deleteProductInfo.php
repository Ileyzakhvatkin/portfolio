<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/deleteImg.php';
/**
* Функция удаляет данные о товаре из базы
* @return ничего не возвращает
*/
function deleteProductInfo($id)
{
    $stmt = pdoConnect()->query("SELECT photo FROM products WHERE id = " .  (int) $id);
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [ 'photo' => $row['photo'] ];
        $list[] = $item;
    }

    deleteImg(array_pop($list)['photo']);

    $stmt = pdoConnect()
        ->query("
            DELETE FROM products_categories WHERE product_id = " . $id . ";
            DELETE FROM products WHERE id = " . $id . ";");
}
