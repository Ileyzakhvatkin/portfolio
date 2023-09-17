<?php
/**
* Функция получает из БД данные о товарах
* @return productList данные о товарах
*/
function getProductList($params)
{
    $baseRequest = "SELECT products.id, products.active, products.title, products.price, products.photo,
    products.novelty, products.sale FROM products ";
    // Чтобы проверять запросы
    // var_dump($baseRequest . $params);
    $stmt = pdoConnect()->query($baseRequest . $params);
    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'title' => $row['title'],
            'price' => $row['price'],
            'photo' => $row['photo'],
            'new' => $row['novelty'],
            'sale' => $row['sale'],
        ];
        $list[] = $item;
    }
    return $list;
}
