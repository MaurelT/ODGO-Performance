<!doctype html>
<html lang="fr">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="<?= $this->Url->build('/css/bootstrap.min.css') ?>" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="<?= $this->Url->build('/css/animate.min.css') ?>" />
    <link rel="stylesheet" href="<?= $this->Url->build('/css/all.min.css') ?>" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" href="https://use.typekit.net/qcv1fph.css" />
    <link rel="shortcut icon" type="image/png" href="<?= $this->Url->build('/img/favicon-odgo.png') ?>" />

    <link rel="apple-touch-icon" sizes="57x57" href="<?= $this->Url->build('/favicon/apple-icon-57x57.png') ?>">
    <link rel="apple-touch-icon" sizes="60x60" href="<?= $this->Url->build('/favicon/apple-icon-60x60.png') ?>">
    <link rel="apple-touch-icon" sizes="72x72" href="<?= $this->Url->build('/favicon/apple-icon-72x72.png') ?>">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= $this->Url->build('/favicon/apple-icon-76x76.png') ?>">
    <link rel="apple-touch-icon" sizes="114x114" href="<?= $this->Url->build('/favicon/apple-icon-114x114.png') ?>">
    <link rel="apple-touch-icon" sizes="120x120" href="<?= $this->Url->build('/favicon/apple-icon-120x120.png') ?>">
    <link rel="apple-touch-icon" sizes="144x144" href="<?= $this->Url->build('/favicon/apple-icon-144x144.png') ?>">
    <link rel="apple-touch-icon" sizes="152x152" href="<?= $this->Url->build('/favicon/apple-icon-152x152.png') ?>">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= $this->Url->build('/favicon/apple-icon-180x180.png') ?>">
    <link rel="icon" type="image/png" sizes="192x192" href="<?= $this->Url->build('/favicon/android-icon-192x192.png') ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $this->Url->build('/favicon/favicon-32x32.png') ?>">
    <link rel="icon" type="image/png" sizes="96x96" href="<?= $this->Url->build('/favicon/favicon-96x96.png') ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $this->Url->build('/favicon/favicon-16x16.png') ?>">
    <link rel="manifest" href="<?= $this->Url->build('/favicon/manifest.json') ?>">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?= $this->Url->build('/favicon/ms-icon-144x144.png') ?>">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="L'application de gestion de votre perfomance sportive. Testez gratuitement l’application.">

    <title>Odgo Performance</title>
    <?= $this->Html->css('custom.css') ?>
    <?= $this->Html->css('stripe.css') ?>
    <?= $this->fetch('css') ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161236421-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-161236421-1');
    </script>
</head>

<body>
    <div class="popup_cross position-fixed d-none">
        <i class="fas fa-2x fa-times"></i>
    </div>


    <div class="popup_landing row d-none">
        <div class="offset-md-3 col-md-6">
            <!-- <h1><span style="font-size: 30px;">💥 Commandes Disponibles 💥 </span><br></h1> -->
            <h1>
                <span style="font-size: 30px;">L'application est bientôt prête !</span><br><br><i>Laissez votre adresse mail pour être prévenu(e) de sa sortie et bénéficier de <strong style="color:#f44130;">-50% </strong>sur l'abonnement</i></h1>
            </h1>
            <form method="post" class="captcha">
                <?= $this->Flash->render('sendingblue') ?>
                <div>
                    <!-- <a href="https://fr.ulule.com/projects/109744/checkout/" target="_blank" class="btn">Commander</a> -->
                    <input type="email" name="email" placeholder="Veuillez rentrer un email" required>
                    <input class="btn" type="submit" value="Envoyer" id="sendFormLanding">
                </div>
            </form>
            <div class="icon">
                <a class="w-38" target="_blank" href="https://www.instagram.com/odgoperformance/?hl=fr"><img src="<?= $this->Url->build('/img/insta-blanc.png') ?>" class="wow zoomIn" /></a>
                <a class="w-38" target="_blank" href="https://www.facebook.com/OdgoPerformance/"><img src="<?= $this->Url->build('/img/facebook-blanc.png') ?>" class="wow zoomIn" /></a>
                <a href="mailto:contact@odgoperformance.com"><img src="<?= $this->Url->build('/img/mail-blanc.png') ?>" class="wow zoomIn" /></a>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-connexion bg-dark pt-0 pb-0">
        <a class="navbar-brand" href="<?= $this->Url->build('/') ?>">
            <img src="<?= $this->Url->build('/img/ODGO_logo_RVB_couleur_horizontal.png') ?>" class="logo-odgo" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
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
                  <a href="<?= $this->Url->build('/#contact') ?>" class="nav-link scrollTo" data-href="#contact">CONTACT</a>
              </li>
          </ul>
          <div class="block-btn-connexion row m-0">
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
    <div class="back-black-footer">
        <footer>

            <div id="div_footer">
                <img src="<?= $this->Url->build('/img/ODGO_logo_RVB_couleur_horizontal.png') ?>" class="wow zoomInUp logo-footer" />
            </div>
            <p>
                <a href="https://www.instagram.com/odgoperformance/" title="Instagram odgo" target="_blank">
                    <img src="<?= $this->Url->build('/img/insta.png') ?>" class="wow zoomIn" />
                </a>
                <a href="https://fr-fr.facebook.com/OdgoPerformance" title="Facebook odgo" target="_blank">
                    <img src="<?= $this->Url->build('/img/facebook.png') ?>" class="wow zoomIn" />
                </a>
            </p>
            <br />
            <a href="<?= $this->Url->build('/politique-de-confidentialite') ?>" style="color: #BDBDBD">Politique de confidentialité</a> -
            <a href="<?= $this->Url->build('/cgu') ?>" style="color: #BDBDBD">CGU</a> -
            <a href="<?= $this->Url->build('/cgv') ?>" style="color: #BDBDBD">CGV</a>

        </footer>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="<?= $this->Url->build('/js/jquery-3.2.1.slim.min.js') ?>"></script>
    <script src="<?= $this->Url->build('/js/popper.min.js') ?>"></script>
    <script src="<?= $this->Url->build('/js/bootstrap.min.js') ?>"></script>
    <script src="<?= $this->Url->build('/js/wow.min.js') ?>"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <?= $this->Html->script('https://www.google.com/recaptcha/api.js?render=6LcbJeQUAAAAAL8pZgxPKsvXjygKS1VmrYyqCF8o'); ?>

    <script>
        new WOW().init();

        jQuery(function($) {
            let lastScrollTop = 0;
            let phonesHeight = $('.trio').height();
            let phonesOffset = $('.trio').offset().top;
            let phonesMiddleDiv = Math.round(phonesOffset + (phonesHeight / 2));
            let windowHeight = $(window).height();
            document.addEventListener("scroll", function() {
                let st = window.pageYOffset || document.documentElement.scrollTop;

                if (st > lastScrollTop) {
                    // downscroll
                    let downBar = window.pageYOffset + windowHeight;
                    if (phonesMiddleDiv <= downBar && phonesMiddleDiv > window.pageYOffset) {
                        $('.animatable').each(function() {
                            if ($(this).hasClass('rightAni')) {
                                $(this).removeClass('fadeOutRight').addClass('animated fadeInRight');
                            } else if ($(this).hasClass('leftAni')) {
                                $(this).removeClass('fadeOutLeft').addClass('animated fadeInLeft');
                            }
                        });
                    } else if (phonesMiddleDiv <= window.pageYOffset) {
                        $('.animatable').each(function() {
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
                        $('.animatable').each(function() {
                            if ($(this).hasClass('rightAni')) {
                                $(this).removeClass('fadeOutRight').addClass('animated fadeInRight');
                            } else if ($(this).hasClass('leftAni')) {
                                $(this).removeClass('fadeOutLeft').addClass('animated fadeInLeft');
                            }
                        });
                    } else if (phonesMiddleDiv >= downBar || window.pageYOffset == 0) {
                        $('.animatable').each(function() {
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

            $('body').on('click', '.scrollTo', function() {
                $('.navbar-collapse').collapse('hide');
                $('html, body').animate({
                    scrollTop: $($(this).data('href')).offset().top - 100
                }, 1500);
                return false;
            });

            $('#sendFormLanding').on('click', function() {
                if ($(this).closest('form')[0].checkValidity()) {
                    $(this).attr('disabled', 'disabled');
                    $(this).closest('form').submit();
                }
            });
            <?php if ($censure) : ?>
                $('body').on('click', '.popupClick', function() {
                    $('.popup_landing, .popup_cross').removeClass('d-none');
                    $('body').addClass('popup_body');
                    return false;
                });
                $('.popup_cross').on('click', function() {
                    $('.popup_landing, .popup_cross').addClass('d-none');
                    $('body').removeClass('popup_body');
                    return false;
                });
            <?php endif ?>
        });

        $(document).ready(function() {
            var formCaptcha = $('.captcha');
            formCaptcha.submit(function(event) {
                event.preventDefault();
                var form = $(this);
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LcbJeQUAAAAAL8pZgxPKsvXjygKS1VmrYyqCF8o', {
                        action: 'contact'
                    }).then(function(token) {
                        form.prepend('<input type="hidden" name="recaptcha_token" value="' + token + '">');
                        form.unbind('submit').submit();
                    });
                });
                return false;
            });
        });
    </script>
    <?= $this->fetch('script') ?>

</body>

</html>
