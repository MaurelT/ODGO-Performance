
<div class="back-black">
  <section id="header-programmes">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <?= $this->Flash->render() ?>
          <h1 id="offres-txt2" class="fadeInDownBig d-md-none text-center">
            Recevez notre</br><p class="m-0 title-odgo-programme d-inline-flex p-2">Ebook gratuit</p> en vous</br> inscrivant par mail</br>
          </h1>
          <h1 id="offres-txt2" class="fadeInDownBig d-md-block d-none ">
            Recevez notre</br><p class="m-0 title-odgo-programme d-inline-flex p-2">Ebook gratuit</p> en vous</br> inscrivant par mail</br>
          </h1>
          <form method="post" class="captcha mt-5 d-md-block d-none">
            <?= $this->Flash->render('sendingblue') ?>
            <div>
              <!-- <a href="https://fr.ulule.com/projects/109744/checkout/" target="_blank" class="btn">Commander</a> -->
              <input class="email-header" type="email" name="email" placeholder="Votre email" required>
              <button class="btn btn-odgo" type="submit" value="" id="sendFormLanding">
                <img src="<?= $this->Url->build('/img/paper-plane.png') ?>"/>
              </button>
            </div>
          </form>
          <p class="text-uppercase title-odgo-home-green pt-5 d-md-block d-none ">Champ text 1</p>
          <p class="text-uppercase title-odgo-home-green pt-5 d-md-block d-none ">Champ text 2</p>
        </div>
        <div class="col-md-6">
          <div class="d-md-none text-center mt-3">
            <img src="<?= $this->Url->build('/img/Image 3.png') ?>" class="w-75"/>
          </div>
          <div class="d-md-block d-none ">
            <img src="<?= $this->Url->build('/img/Image 3.png') ?>"/>
          </div>
        </div>
        <div class="col-12 d-md-none text-center">
          <form method="post" class="captcha mt-3">
            <?= $this->Flash->render('sendingblue') ?>
            <div>
              <!-- <a href="https://fr.ulule.com/projects/109744/checkout/" target="_blank" class="btn">Commander</a> -->
              <input class="email-header" type="email" name="email" placeholder="Votre email" required>
              <button class="btn btn-odgo" type="submit" value="" id="sendFormLanding">
                <img src="<?= $this->Url->build('/img/paper-plane.png') ?>"/>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center mt-5 mb-5 d-md-block d-none ">
            <div class="icon-scroll"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="endurance">
    <div class="container">
      <h2 class="title-odgo-home text-uppercase text-left mt-5 mb-5 p-2 d-inline-flex">Programme endurance</h2>
      <div class="row ">
        <div class="col-md-6 text-center">
          <h2 id="offres-txt2" class="fadeInDownBig d-md-none">
            Découvrez notre</br><p class="m-0 title-odgo-programme d-inline-flex p-2">programme endurance</p></br> en 5 semaines
          </h2>
          <div class="d-md-none text-center">
            <img src="<?= $this->Url->build('/img/endurance.png') ?>" class="w-50"/>
          </div>
          <div class="d-md-block d-none ">
            <img src="<?= $this->Url->build('/img/endurance.png') ?>" class="mx-100"/>
          </div>
        </div>
        <div class="col-md-6 text-md-left text-center mt-auto mb-auto">
          <h2 id="offres-txt2" class="fadeInDownBig d-md-block d-none">
            Découvrez notre</br><p class="m-0 title-odgo-programme d-inline-flex p-2">programme endurance</p></br> en 5 semaines
          </h2>
          <p class="justify-content-left font-weight-bold details-pro " >&#8226; Augmentez votre VMA</p>
          <p class="justify-content-left font-weight-bold details-pro" >&#8226; Devenez plus résistant à l’effort</p>
          <p class="justify-content-left font-weight-bold details-pro" >&#8226; Un programme adapté à votre niveau</p>
          <p class="justify-content-left font-weight-bold details-pro" >&#8226; Adapté à vos besoins :</br> en complément de vos entraînements</br> (2 séances/semaine) ou durant</br> l’intersaison (4 séances/semaine)</p>
        </div>
      </div>
      <div class="row pt-5 mb-5">
        <div class="col text-center">
          <img src="<?= $this->Url->build('/img/Image 9.png') ?>" class="w-100 d-md-none"/>
          <img src="<?= $this->Url->build('/img/Image 9.png') ?>" class="w-75 d-none d-md-block mx-auto"/>
          <div class="mt-4">
            <div class="text-center mx-auto">
              <img class="p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/dumbbell-dark-grey.png') ?>"/>
              <p class="p-header bold mt-auto mb-auto pl-3">Pour chaque séance d’entraînement :</br> un échauffement + le cœur de séance + une séance de récupération</p>
            </div>
            <div class="text-center mx-auto">
              <img class="p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/video-camera.png') ?>"/>
              <p class="p-header bold mt-auto mb-auto pl-3">Vidéos des exercices à réaliser</p>
            </div>
            <div class="text-center mx-auto">
              <img class=" p-3" style="width: 55px; height: 55px;"src="<?= $this->Url->build('/img/chat.png') ?>"/>
              <p class="p-header bold mt-auto mb-auto pl-3">Nos conseils pour éviter les blessures</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 m-0">
      <div class="col-md-6 text-center m-0 green-block">
        <div class="p-5">
          <h2 class="p-5 endurance-white-tilte">Le programme <p class="m-0 pl-2 p-1 bg-white-odgo-g d-inline-flex">2 séances par semaine</p></br> est fait pour vous si:</h2>
          <p class="pl-5 pr-5 endurance-block-color">Vous voulez un programme complémentaire à vos séances d’entraînement classiques</br></br></br> Vous souhaitez vous préparer physiquement avant un événement important (détection, phases finales de championnat, tournois…)</br></br></br> Vous avez constaté une baisse ou une stagnation de votre endurance ou de votre forme globale</p>
        </div>
        <button type="button" class=" btn mb-3 btn-choose-g tada popupClick font-weight-bold position-relative mx-auto" data-toggle="modal" data-target="#inscription-etape-1" style="bottom: 10px">Choisir</button>
      </div>
      <div class="col-md-6 text-center m-0 orange-block position-relative">
        <div class="p-5">
          <h2 class="p-5 endurance-white-tilte">Le programme <p class="m-0 p-1 bg-white bg-white-odgo-o d-inline-flex">4 séances par semaine</p></br> est fait pour vous si:</h2>
          <p class="pl-5 pr-5 endurance-block-color">Vous voulez préparer votre saison ou vous maintenir en forme durant la trêve</br></br></br> Vous avez dû stopper votre pratique durant une longue période (Covid, blessure…)</br></br></br> Vous souhaitez pouvoir enchaîner les efforts durant toute une saison</p>
        </div>
        <button type="button" class="btn mb-3 btn-choose-o tada popupClick font-weight-bold position-relative mx-auto" data-toggle="modal" data-target="#inscription-etape-1" style="bottom: 10px">Choisir</button>
      </div>
    </div>
  </section>

  <section id="ilsNousFontConfiance" class="pt-5 pb-5 mb-5">
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
                <p class="m-0 p-header-grey" style="color:#FF3600"> Julien Lopez, Paris FC</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="row text-md-center">
            <div class="col-3">
              <img src="<?= $this->Url->build('/img/julien-lopez.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
            </div>
            <div class="col-9">
              <div class="p-2 mt-auto mb-auto">
                <p class="p-header-grey m-0">« Merci à Odgo pour les conseils personnalisés. Au top ! »</p>
                <p class="m-0 p-header-grey" style="color:#FF3600"> Julien Lopez, Paris FC</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="row text-md-center">
            <div class="col-3">
              <img src="<?= $this->Url->build('/img/julien-lopez.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
            </div>
            <div class="col-9">
              <div class="p-2 mt-auto mb-auto">
                <p class="p-header-grey m-0">« Merci à Odgo pour les conseils personnalisés. Au top ! »</p>
                <p class="m-0 p-header-grey" style="color:#FF3600"> Julien Lopez, Paris FC</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
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
