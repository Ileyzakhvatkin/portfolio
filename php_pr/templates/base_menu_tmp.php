<?php foreach( $mainMenu as $item ): ?>
    <li>
        <a class="main-menu__item
        <?=parse_url($_SERVER['REQUEST_URI'])['path'] == $item['path'] ? 'active' : ''; ?>
        "href="<?=$item['path']; ?>">
            <?=$item['title']; ?>
        </a>
    </li>
<?php endforeach; ?>
