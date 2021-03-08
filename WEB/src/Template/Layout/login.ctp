<!DOCTYPE html>
<html class="fixed sidebar-light">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <title>Console d'administration</title>
        <link rel=icon href=""<?= $this->Url->build('/img/favicon.png'); ?>" sizes="20x20" type="image/png">
        <?= $this->fetch('meta') ?>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

        <?= $this->Html->css(['/bo/vendor/bootstrap/css/bootstrap.css', '/bo/vendor/animate/animate.css', '/bo/vendor/font-awesome/css/all.min.css', '/bo/vendor/magnific-popup/magnific-popup.css', '/bo/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css', '/bo/css/theme.css', '/bo/css/skins/default.css', '/bo/css/custom.css']) ?>
        <?= $this->fetch('css') ?>
        <meta name="robots" content="noindex, nofollow">
    </head>
    <body>
        <section class="body-sign">
            <?= $this->Flash->render() ?>
            <?= $this->fetch('content') ?>
        </section>
        <?= $this->Html->script(['/bo/vendor/modernizr/modernizr.js', '/bo/vendor/jquery/jquery.js', '/bo/vendor/jquery-browser-mobile/jquery.browser.mobile.js', '/bo/vendor/popper/umd/popper.min.js', '/bo/vendor/bootstrap/js/bootstrap.js', '/bo/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js', '/bo/vendor/common/common.js', '/bo/vendor/nanoscroller/nanoscroller.js', '/bo/vendor/magnific-popup/jquery.magnific-popup.js', '/bo/vendor/jquery-placeholder/jquery.placeholder.js', '/bo/js/theme.js', '/bo/js/theme.init.js']); ?>
        <?= $this->fetch('script') ?>

    </body>
</html>
