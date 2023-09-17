<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getStatusList.php';
/**
* Функция меняет статус заказа в базе данных
* @return нечего не возвоащает
*/
function setOrderStatus($post)
{
    $statuses = getStatusList();
    $statusId = null;
    foreach($statuses as $status) {
        if ( $post['status'] == $status['status'] ) {
            $statusId = $status['id'];
        }
    }
    pdoConnect()
        ->prepare("UPDATE orders SET statys_id = :statys_id WHERE id = :order_id")
        ->execute([
            'statys_id' => (int) $statusId,
            'order_id' => (int) $post["orderId"],
        ]);
}
