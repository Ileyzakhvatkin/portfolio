<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/sql/getUsersAccessDate.php';
/**
* Функция отвечает за авторизацию пользователя
* @return массив
*/
function userAuthoriz($statuses)
{
    $post = $_POST;
    if (isset($_SESSION['session_authoriz'])) {
        $statuses['showForm'] = false;
    }
    if (! empty($post) ) {
        $usersAccessDateArr = getUsersAccessDate($post['login']);
        $inputAccessDate = [
            "login" => $post['login'],
            "pass" => $post['password']
        ];
        if (in_array($inputAccessDate, $usersAccessDateArr)) {
            $_SESSION['session_authoriz'] = $post['login'];
            setcookie('old_user', $post['login'], time() + MAX_COOKEI_LIFE);
        } else {
            $statuses['showError'] = true;
        }
    }
    return $statuses;
}
