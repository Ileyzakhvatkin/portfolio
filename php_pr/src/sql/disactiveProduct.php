<?php
/**
* Функция удаляет данные о товаре из базы
* @return ничего не возвращает
*/
function disactiveProduct($id)
{
    $stmt = pdoConnect()->query("UPDATE products SET active = '0' WHERE id = " . (int) $id);
}
