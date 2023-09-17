<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getLastId.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/deleteImg.php';
/**
* Функция проверяет есть ди ID товара в базе данных
* если есть то обновляет данные по товару
* если товара с таким ID нет то создает новый товар
* @return нечего не возвоащает
*/
function setProductInfo($post)
{

    if (isset($post["product-id"])) {
        // Обновляем данные товара в таблицу если не меняется картинка
        if ( $post['photo'] === '' ) {
                pdoConnect()
                ->prepare("
                UPDATE products SET title=:title, price=:price, novelty=:novelty, sale=:sale WHERE id = " . (int) $post["product-id"])
                ->execute([
                    'title' => strip_tags($post['product-name']),
                    'price' => strip_tags($post['product-price']),
                    'novelty' => strip_tags($post['new']),
                    'sale' => strip_tags($post['sale']),
                ]);
        } else {
            // Если картинка поменялась, удаляем лишние картинки
            $stmt = pdoConnect()
                ->query("SELECT photo FROM products WHERE id = " . (int) $post["product-id"]);
            $list = [];
            while ($row = $stmt->fetch())
            {
                $item = [ 'photo' => $row['photo'] ];
                $list[] = $item;
            }
            deleteImg(array_pop($list)['photo']);

            // Обновляем данные товара в таблицу если меняется картинка
            pdoConnect()
                ->prepare("
                    UPDATE products SET title=:title, price=:price, photo=:photo, novelty=:novelty, sale=:sale WHERE id = " . (int) $post["product-id"])
                ->execute([
                    'title' => strip_tags($post['product-name']),
                    'price' => strip_tags($post['product-price']),
                    'photo' => strip_tags($post['photo']),
                    'novelty' => strip_tags($post['new']),
                    'sale' => strip_tags($post['sale']),
                ]);
        }

        // Удалаем данные из таблицы продукт-категория, чтобы потом перезадать все категории
        pdoConnect()
            ->prepare("DELETE FROM products_categories WHERE product_id = " . (int) $post["product-id"])
            ->execute();

        // Делаем запись (обновляем данные) в таблице продукт-категория
        foreach($post["category"] as $category) {
            $stmt = pdoConnect()
                ->query("
                    INSERt INTO products_categories (product_id, category_id)
                    VALUES('" . (int) $post["product-id"] . "', '" . (int) $category . "')"
                );
        }

    } else {
        // Записываем данные товара в таблицу products
        pdoConnect()
            ->prepare("INSERt INTO products (title, price, photo, novelty, sale)
                        VALUES(:title, :price, :photo, :novelty, :sale)")
            ->execute([
                'title' => strip_tags($post['product-name']),
                'price' => strip_tags($post['product-price']),
                'photo' => strip_tags($post['photo']),
                'novelty' => strip_tags($post['new']),
                'sale' => strip_tags($post['sale']),
            ]);

        // Берем последний индентификатор
        $lastId = getLastId('products');

        // Делаем запись в таблице продукт-категория
        foreach($post["category"] as $category) {
            pdoConnect()
                ->query("
                        INSERt INTO products_categories (product_id, category_id)
                        VALUES('" . (int) $lastId . "', '" . (int) $category . "')"
                    );
        }
    }
}
