<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/auth/userAuthoriz.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_header_tmp.php';

$statuses = [
    'showForm' => true,
    'showError' => false,
];
$statusesResult = userAuthoriz($statuses);

?>

<main class="page-authorization">
    <h1 class="h h--1">Авторизация</h1>
    <?php
		if (isset($_SESSION['session_authoriz'])) { ?>
            <div>
                <a class="button" href="/admin/orders/">Панель администратора</a>
            </div>
            <p class="success">Вы успешно авторизованы</p>
            <form method="post" action="/admin/">
                <input class="button" type="submit" value="Выйти" name="unauthoriz">
            </form>
		<?php } else {
			if (! empty($statusesResult['showForm'])) { ?>
                <form class="custom-form" action="#" method="post">
                    <input
                        class="custom-form__input"
                        type="text"
                        required=""
                        size="20"
                        name="login"
                        <?php if (isset($_COOKIE['old_user'])) { ?>
                            value="<?=htmlspecialchars($_COOKIE['old_user'] ?? '') ?>"
                            placeholder="<?=$_COOKIE['old_user']; ?>"
                        <?php } else { ?>
                            value="<?=htmlspecialchars($_POST['login'] ?? '') ?>"
                        <?php } ?>
                    >
                    <input
                        class="custom-form__input"
                        type="password"
                        required=""
                        size="20"
                        name="password"
                        value="<?=htmlspecialchars($_POST['password'] ?? '') ?>"

                    >
                    <?php if (! empty($statusesResult['showError'])) { ?>
                        <p class="error">Неверный логин или пароль</p>
                    <?php } ?>

                    <input class="button" type="submit" value="Войти в личный кабинет">

                </form>
            <?php }
		}?>
</main>

<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/base_footer_tmp.php'; ?>
