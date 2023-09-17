<?php
session_start();

// error_reporting(E_ALL);
// ini_set('error_reporting', E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/sql_connect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/constants.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/data/closePage.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/data/specialPages.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/data/sort_param.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/auth/updateCookeis.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/auth/userAccess.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/auth/unAuthoriz.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/auth/authFilterMenu.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/base/showPageTitle.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/pdoConnect.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getMenuList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getCategoriesList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getProductList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getProductId.php';

updateCookeis();
unAuthoriz();
userAccess($allClosePage, $managerClosePage);
$mainMenu = authFilterMenu(getMenuList());
$categories = getCategoriesList();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Fashion</title>

    <meta name="description" content="Fashion - интернет-магазин">
    <meta name="keywords" content="Fashion, интернет-магазин, одежда, аксессуары">

    <meta name="theme-color" content="#393939">

    <link rel="preload" href="/img/intro/coats-2018.jpg" as="image">
    <link rel="preload" href="/fonts/opensans-400-normal.woff2" as="font">
    <link rel="preload" href="/fonts/roboto-400-normal.woff2" as="font">
    <link rel="preload" href="/fonts/roboto-700-normal.woff2" as="font">

    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/css/style.min.css">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="/js/scripts.js" defer=""></script>
</head>
<body>
<header class="page-header">
    <a class="page-header__logo" href="/">
        <img src="/img/logo.svg" alt="Fashion">
    </a>
    <nav class="page-header__menu">
        <ul class="main-menu main-menu--header">
            <?php require $_SERVER['DOCUMENT_ROOT'] . '/templates/base_menu_tmp.php'; ?>
        </ul>
    </nav>
    <div class="auth">
        <?php if ( isset($_SESSION['session_authoriz']) ): ?>
            <form class="auth__exit-form" method="post" action="/">
                <input class="btn auth__btn" type="submit" value="Выйти" name="unauthoriz">
            </form>
        <?php else: ?>
            <a class="btn auth__btn" href="/admin/">Войти</a>
        <?php endif; ?>
    </div>
</header>
