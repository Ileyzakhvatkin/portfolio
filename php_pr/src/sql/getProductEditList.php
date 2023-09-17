<?php
/**
* Функция получает из БД данные о товарах
* @return productList данные о товарах
*/
function getProductEditList($params)
{
    $stmt = pdoConnect()->query("
        SELECT GROUP_CONCAT(categories.name SEPARATOR ', ') as cat_name,
        products.id, products.active, products.title, products.price, products.photo,
        products.novelty, products.sale FROM products
        LEFT JOIN products_categories ON product_id = products.id
        LEFT JOIN categories ON category_id = categories.id
        WHERE products.active = '1' " . $params . "
        GROUP BY products.id ORDER BY id DESC"
    );

    $list = [];
    while ( $row = $stmt->fetch() )
    {
        $item = [
            'id' => $row['id'],
            'title' => $row['title'],
            'cat_name' => explode(', ', $row['cat_name']),
            'price' => $row['price'],
            'photo' => $row['photo'],
            'new' => $row['novelty'],
            'sale' => $row['sale'],
        ];
        $list[] = $item;
    }
    return $list;
}
