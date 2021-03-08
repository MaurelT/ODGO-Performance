<div class="container-fluid content-top">
    <div class="row content-body">
        <?= $this->element('menu_compte'); ?>
        <div id="mon-abonnement" class="col-lg-8 space-card">
            <div class="back-card row">
                <div class="col-lg-12 text-center">
                    <p class="title-mon-abonnement m-0">Mon abonnement</p>
                    <?php if (!$abonnement) { ?>
                        <a class="link-validation" href="<?= $this->Url->build('/users/choix-offres') ?>">
                            <div class="validation-essai-mobile">
                                Valider ma période d'essai
                                <i style="margin-left: 5px" class="fas fa-angle-double-right"></i>
                            </div>
                        </a>
                        <div class="mt-3">
                            <a class="btn-souscription" href="<?= $this->Url->build('/users/choix-offres') ?>">Souscrire à une offre</a>
                            <a class="link-validation" href="<?= $this->Url->build('/users/choix-offres') ?>"></a>
                        </div>
                    <?php } ?>
                </div>
            </div>
            <div class="row offre-en-cours">
                <div class="col-lg-6 p-0">
                    <img src="<?= $this->Url->build('/img/course.png') ?>" class="img-fluid img-course" alt="offre" />
                    <?php if ($abonnement) { ?>
                        <div class="row info-offre">
                            <div class="col-12">
                                <p class="uppercase">offre en cours</p>
                                <p class="type-offre"><span class="uppercase"><?= $abonnement->abonnement_engagement->abonnement->name ?></span><br> <?= $abonnement->abonnement_engagement->engagement->name ?></p>
                            </div>
                            <div class="col-6">
                                <p>Début le :<br><?= $abonnement->date_debut->format('d/m/Y') ?></p>
                            </div>
                            <div class="col-6">
                                <p>Fin le :<br><?= $abonnement->date_fin->format('d/m/Y') ?></p>
                            </div>
                        </div>
                    <?php } else { ?>
                        <div class="row info-offre">
                            <div class="col-12">
                                <p class="type-offre">
                                    <span class="uppercase">Fin de votre période d'essai de 20 jours gratuits le : <?= $auth['created']->format('d/m/Y') ?></span>
                                </p>
                            </div>
                        </div>
                    <?php } ?>
                </div>
                <div class="col-lg-6 p-0">
                    <img src="<?= $this->Url->build('/img/course2.png') ?>" class="img-fluid img-course" alt="offre" />
                    <?php if (!$abonnement) { ?>
                        <a class="link-validation" href="<?= $this->Url->build('/users/choix-offres') ?>">
                            <div class="validation-essai">
                                Valider ma période d'essai
                                <i class="fas fa-angle-double-right"></i>
                            </div>
                        </a>
                    <?php } else if (false) { ?>
                        <a class="link-validation" href="<?= $this->Url->build('/users/cancel-offer') ?>">
                            <div class="validation-essai">
                                Annuler mon abonnement
                                <i class="fas fa-angle-double-right"></i>
                            </div>
                        </a>
                    <?php } ?>
                </div>
            </div>
            <div class="back-card-small row">
                <div class="col-12">
                    <p class="white"><b>Historique de mes abonnements :</b></p>
                </div>
            </div>
            <?php
            if ($history) {
                foreach ($history as $abonnement) :
                    ?>
                    <div class="back-card-small row">
                        <div class="col-6">
                            <p><?= $abonnement->abonnement_engagement->abonnement->name ?> - <?= $abonnement->abonnement_engagement->engagement->name ?></p>
                        </div>
                        <div class="col-6">
                            <p>Expiré le <?= $abonnement->date_fin->format('d/m/Y') ?></p>
                        </div>
                    </div>
                    <?php
                endforeach;
            } else {
                echo 'Vous n\'avez jamais souscrits à une de nos offres.';
            }
            ?>
        </div>
    </div>
</div>
