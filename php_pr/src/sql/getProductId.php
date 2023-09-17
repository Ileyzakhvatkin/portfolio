<?php
/**
* Функция получает из БД данные о товарах
* @return productList данные о товарах
*/
function getProductId($params)
{
    $baseRequest = "SELECT products.id, products.title, products.price, products.photo,
    products.novelty, products.sale FROM products ";
    // Чтобы проверять запросы
    // var_dump($baseRequest . $params);
    $stmt = pdoConnect()->query($baseRequest . $params);
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'price' => $row['price'],
        ];
        $list[] = $item;
    }
    return $list;
}
