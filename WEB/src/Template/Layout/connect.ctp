<!doctype html>
<html lang="fr">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="<?= $this->Url->build('/css/bootstrap.min.css') ?>" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="<?= $this->Url->build('/css/animate.min.css') ?>"/>
        <link rel="stylesheet" href="<?= $this->Url->build('/css/all.min.css') ?>"/>
        <link rel="stylesheet" href="<?= $this->Url->build('/css/solid.min.css') ?>"/>
        <link rel="stylesheet" href="https://use.typekit.net/qcv1fph.css" />

        <title><?= $this->fetch('title') ?></title>
        <?= $this->Html->css('custom.css') ?>
        <?= $this->Html->css('stripe.css') ?>
        <?= $this->fetch('css') ?>
    </head>
    <body class="bg-body-black">
        <div class="container-fluid layout-mon-compte">
            <div class="row align-item">
                <div class="col-3">
                    <a class="navbar-brand" href="<?= $this->Url->build('/') ?>">
                        <img src="<?= $this->Url->build('/img/ODGO_logo_RVB_couleur_horizontal.png') ?>" class="logo-compte" alt="Odgo" />
                    </a>
                </div>
                <div class="col-6 text-center">
                    <a class="navbar-brand" href="<?= $this->Url->build('/users/mon-abonnement') ?>"><p class="title-mon-compte">Mon compte</p></a>
                </div>
                <div class="col-3 text-right">
                    <a class="navbar-brand deconnexion flex-layout" href="<?= $this->Url->build(['controller' => 'Users', 'action' => 'logout']) ?>">
                        <span>Deconnexion</span>
                        <img src="<?= $this->Url->build('/img/sign-out-alt-solid.png') ?>" class="deconnexion-icon" alt="deconnexion" />
                    </a>
                </div>
            </div>
        </div>
        <?= $this->fetch('content') ?>

        <p class="text-center">
            <a href="<?= $this->Url->build('/politique-de-confidentialite') ?>" style="color: white">Politique de confidentialité</a> -
            <a href="<?= $this->Url->build('/cgu') ?>" style="color: white">CGU</a> -
            <a href="<?= $this->Url->build('/cgv') ?>" style="color: white">CGV</a>
        </p>



        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="<?= $this->Url->build('/js/jquery-3.2.1.slim.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/popper.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/bootstrap.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/wow.min.js') ?>"></script>

        <!-- Stripe JS -->
        <script src="https://js.stripe.com/v3/"></script>
        <script src="<?= $this->Url->build('/js/charge.js') ?>"></script>
        <script>
            new WOW().init();

            jQuery(function ($) {

                var doAnimations = function () {

                    var offset = $(window).scrollTop() + $(window).height(),
                            $animatables = $('.animatable');

//                    if ($animatables.length == 0) {
//                        $(window).off('scroll', doAnimations);
//                    }

                    $animatables.each(function (i) {
                        var $animatable = $(this);
                        //Scroll tout en haut
                        if ($(window).scrollTop() == 0) {
                            if ($(this).hasClass('rightAni')) {
                                $animatable.removeClass('fadeInRight').addClass('animated fadeOutRight');
                            } else if ($(this).hasClass('leftAni')) {
                                $animatable.removeClass('fadeInLeft').addClass('animated fadeOutLeft');
                            }
                        }
                        //Scroll au niveau des téléphones
                        else if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                            if ($(this).hasClass('rightAni')) {
                                $animatable.removeClass('fadeOutRight').addClass('animated fadeInRight');
                            } else if ($(this).hasClass('leftAni')) {
                                $animatable.removeClass('fadeOutLeft').addClass('animated fadeInLeft');
                            }
                        }
                    });
                };
                $(window).on('scroll', doAnimations);
            });
        </script>
        <?= $this->fetch('script') ?>

    </body>
</html>
