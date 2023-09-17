<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/disactiveProduct.php';
disactiveProduct($_POST['id']);
exit;
