<?php
/**
* Функция прекращения сесии
* @return ничего не возвращает
*/
function unAuthoriz()
{
    if (! empty($_POST['unauthoriz'])) {
        session_destroy();
        unset($_SESSION['session_authoriz']);
    }
}
