
<div class="back-black">
  <div class="d-lg-none d-flex position-relative">
    <img class="w-100" src="<?= $this->Url->build('/img/arnaud-coach-mobile.png') ?>"/>
    <div class="position-absolute w-100" style="bottom: 0;">
      <p class="text-center">Arnaud Chabert en séance avec Kévin Strootman,<br/> joueur de l’Olympique de Marseille</p>
    </div>
  </div>
  <section id="header-grey">
    <div class="container ">
      <div class="row">
        <div class="col-lg-6">
        </div>
        <div class="col-lg-6 text-lg-left text-center justify-content-center">
          <?= $this->Flash->render() ?>
          <h1 id="offres-txt2" class="fadeInDownBig">
            Le mot du fondateur :</br><p class="text-uppercase title-qui-sommes-nous">Arnaud CHABERT</p>
          </h1>
          <p class="p-header fadeInRightBig mt-4">
            «  Odgo est née d’une observation de terrain et des nombreux échanges avec les sportifs sur leurs problématiques. L’application et les programmes sont le fruit d’années de travail et d’expérience que je souhaitais mettre au profit des athlètes en quête de performance  »
          </p>
          <div class="row mt-4">
            <div class="col-lg-6 col-12">
              <div class="d-lg-flex text-lg-left text-center align-items-center">
                <img class="rounded-circle bg-dark-grey p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/medal-grey.png') ?>"/>
                <p class="p-header bold mt-auto mb-auto pl-lg-3"> 10 ans</br>d'expérience</p>
              </div>
              <div class="d-lg-flex text-lg-left text-center align-items-centers mt-3">
                <img class="rounded-circle bg-dark-grey p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/dumbbell.png') ?>"/>
                <div class="mt-auto mb-auto pl-lg-3">
                  <p class="p-header bold m-0">Double casquette</p>
                  <p class="p-header-grey">Kiné du sport</br>et préparateur physique</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="d-lg-flex text-lg-left">
                <img class="rounded-circle bg-dark-grey p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/profile-user.png') ?>"/>
                <div class="mt-auto mb-auto pl-lg-3">
                  <p class="p-header bold m-0">Collaborations prestigieuses</p>
                  <p class="p-header-grey">Footballeurs</br> professionnels, sélection</br> nationale de football,</br> tournois de tennis ATP…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="d-none d-lg-block">
      <div class="row mx-1">
        <div class="col-6">
          <p class="mt-5">Arnaud Chabert en<br/> séance avec Kévin<br/> Strootman, joueur de<br/> Genoa</p>
        </div>
        <div class="col-6 text-left mt-5">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center mt-5 mb-5">
        <div class="icon-scroll"></div>
      </div>
    </div>
  </section>
  <section id="carrousel-human">
    <div id="carouselHuman" class="carousel slide text-center" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item">
          <img src="<?= $this->Url->build('/img/human-smile.png') ?>" class="w-50" />
        </div>
        <div class="carousel-item active" >
          <img src="<?= $this->Url->build('/img/human-smile.png') ?>" class="w-50" />
        </div>
        <div class="carousel-item">
          <img src="<?= $this->Url->build('/img/human-smile.png') ?>" class="w-50" />
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselHuman" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon arrow-prev" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselHuman" role="button" data-slide="next">
        <span class="carousel-control-next-icon arrow-next" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </section>

  <div class="content-home">
    <div id="arrow-background">
      <div class="clipped-polygon-grey-2"></div>
    </div>
    <div>
      <section id="onParleDeNous" class="pb-5">
        <div class="container">
          <h2 class="title-odgo-home text-uppercase text-left mt-5 mb-5 p-2 d-inline-flex">On parle de nous</h2>
          <div class="row">
            <div class="col-md-6 text-center">
              <a href="">
                <img src="<?= $this->Url->build('/img/article-La-Provence.png') ?>" class="w-75" />
              </a>
            </div>
            <div class="col-md-6 text-center mt-auto mb-auto j">
              <h2 id="offres-txt2" class="fadeInDownBig">
                On en parle sur</br> laprovence.com
              </h1>
              <p class="p-header mt-3">Retrouvez l'article à l'adresse <a href="">ici</a></p>
            </div>
          </div>
        </div>
      </section>


        <section id="ilsNousFontConfiance" class="pb-5" style="background: transparent">
          <div class="container">
            <div class="row">
              <div class="col-12 pt-5 pb-5">
                <h2 class="title-odgo-home text-uppercase text-left mt-5 mb-5 p-2 d-inline">Ils Nous font confiance</h2>
              </div>
              <div class="col-md-4">
                <div class="row text-md-center">
                  <div class="col-3">
                    <img src="<?= $this->Url->build('/img/julien-lopez.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
                  </div>
                  <div class="col-9">
                    <div class="p-2 mt-auto mb-auto">
                      <p class="p-header-grey m-0">« Merci à Odgo pour les conseils personnalisés. Au top ! »</p>
                      <p class="m-0 p-header-grey" style="color:#FF3600">Julien Lopez, Paris FC</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="row text-md-center">
                  <div class="col-3">
                    <img src="<?= $this->Url->build('/img/Kevin_Strootman.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
                  </div>
                  <div class="col-9">
                    <div class="p-2 mt-auto mb-auto">
                      <p class="p-header-grey m-0">« Grâce à Odgo j’ai pu retrouver mon niveau de performance . Un grand merci! »</p>
                      <p class="m-0 p-header-grey" style="color:#FF3600">Kevin Strootman, Genoa CFC</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="row text-md-center">
                  <div class="col-3">
                    <img src="<?= $this->Url->build('/img/maxime-lopez.jpeg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
                  </div>
                  <div class="col-9">
                    <div class="p-2 mt-auto mb-auto">
                      <p class="p-header-grey m-0">«  Odgo m'a apporter de la structure dans ma préparation invisible ce qui m’a permis d’optimiser mes performances. »</p>
                      <p class="m-0 p-header-grey" style="color:#FF3600">Maxime Lopez, Sassuolo Calcio</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </section>
  </div>
</div>


<section id="back-to-top">
  <i class="fa fa-angle-up"></i>
</section>

<?php $this->append('script') ?>
<script>
var offset = 450;
var duration = 1000;
var upToTop = $("#back-to-top");
upToTop.hide();
$(window).on('scroll', function () {
  if ($(this).scrollTop() > offset) {
    upToTop.fadeIn(duration);
  } else {
    upToTop.fadeOut(duration);
  }
});
upToTop.on('click', function (event) {
  event.preventDefault();
  $('html, body').animate({scrollTop: 0}, duration);
  return false;
});
</script>
<?php $this->end() ?>
