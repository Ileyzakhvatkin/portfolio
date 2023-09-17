<?php

function allCosts($products)
{
    $costsArr = [];
    foreach( $products as $product ) {
        $costsArr[] = (int) $product['price'];
    }
    return $costsArr;
}
