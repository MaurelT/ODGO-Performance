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
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <link rel="stylesheet" href="https://use.typekit.net/qcv1fph.css" />
        <link rel="shortcut icon" type="image/png" href="<?= $this->Url->build('/img/favicon-odgo.png') ?>"/>
        <title><?= $this->fetch('title') ?></title>
        <?= $this->Html->css('custom.css') ?>
        <?= $this->fetch('css') ?>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark layout-connect bg-dark">
            <a class="navbar-brand" href="<?= $this->Url->build('/') ?>">
                <img src="<?= $this->Url->build('/img/ODGO_logo_RVB_couleur_horizontal.png') ?>" class="logo-odgo" />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto mr-auto">
                    <li class="nav-item">
                        <a href="<?= $this->Url->build('/') ?>" class="nav-link scrollTo" data-href="#index">L'APP</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= $this->Url->build('/nos-programmes') ?>" class="nav-link scrollTo" data-href="#nos-programmes">NOS PROGRAMMES</a>
                    </li>
                    <li class="nav-item">
                      <a href="<?= $this->Url->build('/qui-sommes-nous') ?>" class="nav-link scrollTo" data-href="#qui-sommes-nous">QUI SOMMES-NOUS ?</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= $this->Url->build('/ils-nous-font-confiance') ?>" class="nav-link scrollTo" data-href="#ils-nous-font-confiance">ILS NOUS FONT CONFIANCE</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://blog.odgoperformance.com" target="_blank" class="nav-link">BLOG</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= $this->Url->build('#') ?>" class="nav-link scrollTo" data-href="#contact">CONTACT</a>
                    </li>
                </ul>
                <div class="layout-connect-img">
                    <a href="<?= $this->Url->build(['controller' => 'Users', 'action' => 'monAbonnement']) ?>" class="link-connexion">
                        <img src="<?= $this->Url->build($auth['picture']) ?>" class="img-fluid profil-picture-connect" alt="profil" />
                        <i class="fas fa-chevron-down"></i>
                    </a>
                </div>
            </div>
            <div class="block-btn-connexion row">
              <div class="btn-connexion p-2">
                  <a href="<?= $this->Url->build('#') ?>" data-toggle="modal" data-target="#connexion" class="link-connexion popupClick">
                    <span style="color: #FF3A28;">Connexion</span>
                  </a>
              </div>
              <div class="btn-connexion-2 p-2">
                  <a href="<?= $this->Url->build('#') ?>" data-toggle="modal" data-target="#inscription-etape-1" class="link-connexion popupClick">
                    <span style="color: #FF3A28;">Inscription</span>
                  </a>
              </div>
            </div>
            <div class="position-absolute mt-5 d-none d-md-block" style="top: 100px; right: 0;">
              <div class="text-center">
              <a href="https://www.instagram.com/odgoperformance/" title="Instagram odgo" target="_blank">
                  <img src="<?= $this->Url->build('/img/instagram-grey.png') ?>" class="wow zoomIn bg-dark-grey rounded-left p-3"  style="width: 50px; height: 50px;" />
              </a></div>
              <div class="mt-2 bg-dark-grey rounded text-center" style="width: 50px; height: 50px;">
              <a href="https://fr-fr.facebook.com/OdgoPerformance" title="Facebook odgo" target="_blank">
                  <img src="<?= $this->Url->build('/img/facebook-grey.png') ?>" class="wow zoomIn bg-dark-grey rounded-left p-3"  style="width: 50px; height: 50px;"  />
              </a>
            </div>
            </div>
        </nav>
        <?= $this->fetch('content') ?>
        <?= $this->element('popup_inscription'); ?>
        <?= $this->element('popup_connexion'); ?>
        <footer>
            <p>
                <img src="<?= $this->Url->build('/img/insta.png') ?>" class="wow zoomIn" />
                <img src="<?= $this->Url->build('/img/facebook.png') ?>" class="wow zoomIn" />
            </p>
            <div id="div_footer">
                <img src="<?= $this->Url->build('/img/logo-footer.png') ?>" class="text-center wow zoomInUp" />
            </div>
            <br />
            <a href="<?= $this->Url->build('/politique-de-confidentialite') ?>" style="color: white">Politique de confidentialité</a> -
            <a href="<?= $this->Url->build('/cgu') ?>" style="color: white">CGU</a> -
            <a href="<?= $this->Url->build('/cgv') ?>" style="color: white">CGV</a>


        </footer>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="<?= $this->Url->build('/js/jquery-3.2.1.slim.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/popper.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/bootstrap.min.js') ?>"></script>
        <script src="<?= $this->Url->build('/js/wow.min.js') ?>"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <script>
            new WOW().init();

            jQuery(function ($) {

                let lastScrollTop = 0;
                let phonesHeight = $('.trio').height();
                let phonesOffset = $('.trio').offset().top;
                let phonesMiddleDiv = Math.round(phonesOffset + (phonesHeight / 2));
                let windowHeight = $(window).height();
                document.addEventListener("scroll", function () {
                    let st = window.pageYOffset || document.documentElement.scrollTop;

                    if (st > lastScrollTop) {
                        // downscroll
                        let downBar = window.pageYOffset + windowHeight;
                        if (phonesMiddleDiv <= downBar && phonesMiddleDiv > window.pageYOffset) {
                            $('.animatable').each(function () {
                                if ($(this).hasClass('rightAni')) {
                                    $(this).removeClass('fadeOutRight').addClass('animated fadeInRight');
                                } else if ($(this).hasClass('leftAni')) {
                                    $(this).removeClass('fadeOutLeft').addClass('animated fadeInLeft');
                                }
                            });
                        } else if (phonesMiddleDiv <= window.pageYOffset) {
                            $('.animatable').each(function () {
                                if ($(this).hasClass('rightAni')) {
                                    $(this).removeClass('fadeInRight').addClass('fadeOutRight');
                                } else if ($(this).hasClass('leftAni')) {
                                    $(this).removeClass('fadeInLeft').addClass('fadeOutLeft');
                                }
                            });
                        }
                    } else {
                        // upscroll
                        let downBar = window.pageYOffset + windowHeight;
                        if (phonesMiddleDiv >= window.pageYOffset && phonesMiddleDiv < downBar && window.pageYOffset != 0) {
                            $('.animatable').each(function () {
                                if ($(this).hasClass('rightAni')) {
                                    $(this).removeClass('fadeOutRight').addClass('animated fadeInRight');
                                } else if ($(this).hasClass('leftAni')) {
                                    $(this).removeClass('fadeOutLeft').addClass('animated fadeInLeft');
                                }
                            });
                        } else if (phonesMiddleDiv >= downBar || window.pageYOffset == 0) {
                            $('.animatable').each(function () {
                                if ($(this).hasClass('rightAni')) {
                                    $(this).removeClass('fadeInRight').addClass('fadeOutRight');
                                } else if ($(this).hasClass('leftAni')) {
                                    $(this).removeClass('fadeInLeft').addClass('fadeOutLeft');
                                }
                            });
                        }
                    }

                    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
                });



                $('body').on('click', '.scrollTo', function () {
                    $('.navbar-collapse').collapse('hide');
                    $('html, body').animate({
                        scrollTop: $($(this).data('href')).offset().top - 100
                    }, 1500);
                    return false;
                });

            });
        </script>
        <?= $this->fetch('script') ?>

    </body>
</html>
