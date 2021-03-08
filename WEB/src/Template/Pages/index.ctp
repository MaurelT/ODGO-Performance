
<div class="back-black">
  <?= $this->Flash->render() ?>
  <section id="header">
    <div class="container">
      <div class="row">
        <div class="col-12 d-md-none text-center mb-5">
          <h1 id="offres-txt2" class="fadeInDownBig ">
            Le guide quotidien</br> de votre performance
          </h1>
        </div>
        <div class="col-md-6">
          <div id="carousel-header" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carousel-header" data-slide-to="0" class="active"></li>
              <li data-target="#carousel-header" data-slide-to="1"></li>
              <li data-target="#carousel-header" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner text-center">
              <div class="carousel-item active">

                <img src="<?= $this->Url->build('/img/left-phone.png') ?>" class=" d-md-none" style="height: 380px"/>
                <img src="<?= $this->Url->build('/img/left-phone.png') ?>" class=" d-none d-md-block mx-auto" style="height: 520px;"/>
              </div>
              <div class="carousel-item">

                <img src="<?= $this->Url->build('/img/center-phone.png') ?>" class=" d-md-none" style="height: 380px"/>
                <img src="<?= $this->Url->build('/img/center-phone.png') ?>" class=" d-none d-md-block mx-auto" style="height: 520px;"/>
              </div>
              <div class="carousel-item">

                <img src="<?= $this->Url->build('/img/right-phone.png') ?>" class=" d-md-none" style="height: 380px"/>
                <img src="<?= $this->Url->build('/img/right-phone.png') ?>" class=" d-none d-md-block mx-auto" style="height: 520px;"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-md-block d-none ">
            <h1 id="offres-txt2" class="fadeInDownBig pb-3">
              Le guide quotidien</br> de votre performance
            </h1>
            <p class="p-header fadeInRightBig">
              Inscription rapide et facile : </br>Renseignez votre adresse mail et bénéficiez de 3 jours d’essai gratuits !
            </p>
            <form method="post" class="captcha">
              <?= $this->Flash->render('sendingblue') ?>
              <div>
                <!-- <a href="https://fr.ulule.com/projects/109744/checkout/" target="_blank" class="btn">Commander</a> -->
                <input class="email-header" type="email" name="email" placeholder="Votre email" required>
                <button class="btn btn-odgo" type="submit" value="" id="sendFormLanding">
                  <img src="<?= $this->Url->build('/img/paper-plane.png') ?>"/>
                </button>
              </div>
            </form>
            <p class="text-uppercase title-odgo-home-green pt-5">Ils nous font confiance:</p>
            <div class="row pl-3">
              <img src="<?= $this->Url->build('/img/julien-lopez.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
              <div class="p-2 mt-auto mb-auto">
                <p class="p-header-grey m-0">« Merci à Odgo pour les conseils personnalisés. Au top ! »</p>
                <p class="m-0 p-header-grey" style="color:#FF3600"> Julien Lopez, Paris FC</p>
                <div class="col-12">
                  <p class="m-0 p-header-grey text-right text-uppercase" style="text-decoration: underline ; cursor: pointer">voir plus</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="d-md-none text-center col-12">
          <p class="p-header fadeInRightBig">
            Inscription rapide et facile : renseignez votre</br> adresse mail dans le champs ci-dessous</br> 3 jours d’essai gratuits !
          </p>
          <form method="post" class="captcha">
            <?= $this->Flash->render('sendingblue') ?>
            <div>
              <!-- <a href="https://fr.ulule.com/projects/109744/checkout/" target="_blank" class="btn">Commander</a> -->
              <input class="email-header" type="email" name="email" placeholder="Votre email" required>
              <button class="btn btn-odgo" type="submit" value="" id="sendFormLanding">
                <img src="<?= $this->Url->build('/img/paper-plane.png') ?>"/>
              </button>
            </div>
          </form>
          <p class="text-uppercase title-odgo-home-green pt-5">Ils nous font confiance:</p>
          <div class="">
            <img src="<?= $this->Url->build('/img/julien-lopez.jpg') ?>" class="rounded-circle" style="width: 60px; height: 60px;" />
            <div class="p-2 mt-auto mb-auto">
              <p class="p-header-grey m-0">« Merci à Odgo pour les conseils personnalisés. Au top ! »</p>
              <p class="m-0 p-header-grey" style="color:#FF3600"> Julien Lopez, Paris FC</p>
              <p class="m-0 p-header-grey text-center text-uppercase" style="text-decoration: underline ; cursor: pointer">voir plus</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center mt-5 mb-5">
          <div class="icon-scroll"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="odgo1min">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center mt-auto mb-auto j">
          <h2 id="offres-txt2" class="fadeInDownBig mb-5">
            ODGO en moins</br> d’une minute !
          </h1>
        </div>
        <div class="col-md-6">
          <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/acWh9paT4jQ" frameborder="0" allow="modestbranding, accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>

  <div class="content-arrow">
    <div id="arrow-background">
      <div class="clipped-polygon-grey"></div>
      <div class="clipped-polygon-white"></div>
    </div>
    <div>
      <section id="appIn3point">
        <div class="container">
          <div class="row">
            <h2 class="title-odgo-home text-uppercase text-left mb-5 p-2 ml-2">L’application en 3 points</h2>
            <div class="col-md-12 text-center">
              <div id="carouselAppExplain" class="carousel slide pt-5" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item">
                    <img src="<?= $this->Url->build('/img/left-phone.png') ?>" class=" d-md-none" style="height: 380px"/>
                    <img src="<?= $this->Url->build('/img/left-phone.png') ?>" class="d-none d-md-block mx-auto"  style="height: 520px;"/>
                    <div class="carousel-caption mx-auto mw-100" style="width: 360px; height: 200px;">
                      <h5 class="carrousel-subtitle">Nutrition</h5>
                      <p class="justify-content-left carrousel-subtitle-text text-md-left">&#8226; Chrono-nutrition : le bon aliment au bon moment</br>&#8226; Équilibre : répartition calorique en fonction de vos objectifs</br>&#8226; Prévention : Les bonnes associations alimentaires</p>
                    </div>
                  </div>
                  <div class="carousel-item active" >

                    <img src="<?= $this->Url->build('/img/center-phone.png') ?>" class=" d-md-none" style="height: 380px"/>

                    <img src="<?= $this->Url->build('/img/center-phone.png') ?>" class="d-none d-md-block mx-auto" style="height: 520px;"/>
                    <div class="carousel-caption mx-auto mw-100" style="width: 360px; height: 200px;">
                      <h5 class="carrousel-subtitle">Personnalisation</h5>
                      <p class="justify-content-left carrousel-subtitle-text">« Remplissez chaque jour vos objectifs de préparation invisible en fonction de vos besoins »</p>
                    </div>
                  </div>
                  <div class="carousel-item">

                    <img src="<?= $this->Url->build('/img/right-phone.png') ?>" class=" d-md-none" style="height: 380px"/>
                    <img src="<?= $this->Url->build('/img/right-phone.png') ?>" class=" d-none d-md-block mx-auto" style="height: 520px;"/>

                    <div class="carousel-caption mx-auto mw-100" style="width: 360px; height: 200px;">
                      <h5 class="carrousel-subtitle">Prévention des blessures</h5>
                      <p class="justify-content-left carrousel-subtitle-text text-md-left" >&#8226; Des programmes de prévention de la blessure créés par des professionnels de santé</br>&#8226; Un carnet de santé pour vos blessures et tensions</p>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselAppExplain" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon arrow-prev" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselAppExplain" role="button" data-slide="next">
                  <span class="carousel-control-next-icon arrow-next" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="offres" class="d-none d-md-block">
        <div class="container">
          <div class="row">
            <h2 class="title-odgo-home text-uppercase text-left mb-5 p-2 ml-2">Nos offres</h2>
            <div class="col-md-12 fadeInLeftBig text-center mb-5">
              <p id="contact-txt2">
                Choisissez votre</br> durée d’engagement.</br> 3 jours d’essai gratuits ! 
              </p>
            </div>

            <div class="col-md-4">
              <div class="block-offre fadeInUpBig pt-5 pb-5">
                <h3 class="font-weight-bold text-center m-0 ">1 Mois = 12€</h3>

              </div>
            </div>
            <div class="col-md-4">
              <div class="block-offre fadeInUpBig">
                <div class="text-right mt-0">
                  <p class="badge-odgo p-1 m-0 ">la + populaire</p>
                </div>
                <div class="row pt-5 pb-5 ml-auto mr-auto justify-content-center">
                  <h3 class="font-weight-bold m-0">3 Mois = 28€</h3>
                  <p class=" font-weight-bold reduc m-0 pl-2">-22%</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="block-offre fadeInUpBig">
                <div class="row pt-5 pb-5 ml-auto mr-auto justify-content-center">
                  <h3 class="font-weight-bold m-0">6 Mois = 45€</h3>
                  <p class=" font-weight-bold reduc m-0 pl-2">-36%</p>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div style="border: 1px solid #FF3600">
                <div class="row m-0 p-0 border-bottom">
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/speedometer.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 col-9 text-left mt-auto mb-auto">
                        <p class="p-header m-0">Tableau de bord personnalisé</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/restaurant.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 col-9 text-left mt-auto mb-auto">
                        <p class="p-header m-0">Suggestions nutritionnelles en fonction de votre activité physique</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0 border-bottom">
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/film-strip.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Vidéos d’exercices personnalisées suivant vos besoins (pour vous échauffer, pour récupérer…)</p>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 border-right ">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/routine.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Compte rendu de séance d’entraînement ou de compétition</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row m-0 p-0 border-bottom">
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/test-tube.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Testing de votre mobilité</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 border-right">
                    <div class="row h-100r p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/drop.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Conseil en hydratation</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row m-0 p-0 border-bottom">
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/history.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Historique de vos blessures et vos zones de tension</p>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/calendar.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Enregistrement de toutes vos échéances dans votre calendrier</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0">
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/statistics.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Suivi de vos résultats</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 border-right">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/bed.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Gestion du sommeil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center block-offre-bot">
                <button type="button" class="btn btn-odgo btn-sub tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center block-offre-bot">
                <button type="button" class="btn btn-odgo btn-sub tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center sub-perso-but block-offre-bot">
                <button type="button" class="btn btn-odgo btn-sub mb-n3 tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offres-md" class="d-block d-md-none">
        <div class="container">
          <div class="row">
            <h2 class="title-odgo-home text-uppercase text-left mb-5 p-2 ml-2">Nos offres</h2>
            <div class="col-md-12 fadeInLeftBig text-center mb-5">
              <p id="contact-txt2">
                Choisissez votre</br> durée d’engagement.</br> 3 jours d’essai gratuits ! 
              </p>
            </div>
            <div class="col-md-12 pb-5">
              <div class="rounded" style="border: 1px solid #FF3600">
                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/speedometer.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 col-9 text-left mt-auto mb-auto">
                        <p class="p-header m-0">Tableau de bord personnalisé</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/film-strip.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Vidéos d’exercices personnalisées suivant vos besoins (pour vous échauffer, pour récupérer…)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/test-tube.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Testing de votre mobilité</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/history.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Historique de vos blessures et vos zones de tension</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/statistics.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Suivi de vos résultats</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/restaurant.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 col-9 text-left mt-auto mb-auto">
                        <p class="p-header m-0">Suggestions nutritionnelles en fonction de votre activité physique</p>
                      </div>
                    </div>
                  </div>
                </div>




                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/routine.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Compte rendu de séance d’entraînement ou de compétition</p>
                      </div>
                    </div>
                  </div>
                </div>




                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100r p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/drop.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Conseil en hydratation</p>
                      </div>
                    </div>
                  </div>
                </div>




                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/calendar.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Enregistrement de toutes vos échéances dans votre calendrier</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row m-0 p-0 ">
                  <div class="col-12 border-bottom">
                    <div class="row h-100 p-3">
                      <div class="col-3 text-right mt-auto mb-auto">
                        <img src="<?= $this->Url->build('/img/bed.png') ?>" style="width: 32px; height: 32px;"/>
                      </div>
                      <div class="p-2 mt-auto mb-auto col-9 text-left">
                        <p class="p-header m-0">Gestion du sommeil</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-12 mb-5">
              <div class="block-offre fadeInUpBig pt-5">
                <h3 class="font-weight-bold text-center ">1 Mois = 12€</h3>
                <div class="text-center">
                  <button type="button" class="btn btn-odgo btn-sub tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
                </div>
              </div>
            </div>
            <div class="col-12  mb-5">
              <div class="block-offre fadeInUpBig">
                <div class="text-right mt-0">
                  <p class="badge-odgo p-1 m-0 ">la + populaire</p>
                </div>
                <div class="row pt-5 ml-auto mr-auto justify-content-center">
                  <h3 class="font-weight-bold">3 Mois = 28€</h3>
                  <p class=" font-weight-bold reduc pl-2">-22%</p>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-odgo btn-sub tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
                </div>
              </div>
            </div>
            <div class="col-12  mb-5">
              <div class="block-offre fadeInUpBig">
                <div class="row pt-5 ml-auto mr-auto justify-content-center">
                  <h3 class="font-weight-bold">6 Mois = 45€</h3>
                  <p class=" font-weight-bold reduc pl-2">-37%</p>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-odgo btn-sub tada popupClick" data-toggle="modal" data-target="#inscription-etape-1">Ajouter au panier</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

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

<div class="back-black-4">
  <section id="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12 fadeInLeftBig text-center mb-5">
          <p id="contact-txt2">
            Une question ?<br> Une remarque ?<br> Une idée ?
          </p>
        </div>
        <div class="col-md-12 fadeInRightBig" id="contact-form">
          <?= $this->Form->create(null, ['class' => 'captcha', 'url' => ['action' => 'contact']]) ?>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input name="nom" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nom" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <input name="prenom" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Prénom" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input name="phone" type="tel" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Téléphone" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <textarea name="message" class="form-control" rows="5" placeholder="Message" required></textarea>
          </div>
          <div class="form-group text-center">
            <button class="btn btn-odgo">Envoyer<img src="<?= $this->Url->build('/img/paper-plane.png') ?>"/></button>
          </div>
          <?= $this->Form->end() ?>
        </div>
        <div class="col-1"></div>
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
});

$(document).ready(function(){
  $('.center').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });
  });




  </script>
  <?php $this->end() ?>
