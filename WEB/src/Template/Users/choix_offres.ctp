<?= $this->Form->create(null, ['url' => '/users/paiement/' . $coupons->code]) ?>
<div id="choix-offres" class="container-fluid content-top">
    <div class="row content-body">
        <div class="p-0 offset-lg-3 col-lg-6 modal-content inscription">
            <div class="row barre">
                <div class="col-6 left-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-6 right-barre">
                    <p class="red-barre"></p>
                </div>
            </div>
            <div class="head-content-modal text-center">
                <img src="<?= $this->Url->build('/img/logo.png') ?>" class="logo" alt="odgo" />
                <p class="subtitle-modal">Choix de votre offre<br>et de votre période d'engagement</p>
            </div>
            <div class="row">
                <?php foreach ($abonnements as $abonnement) : ?>
                    <input type="hidden" name="abonnement_id" value="<?= $abonnement->id ?>" />
                    <div class="col-md">
                        <div class="card-popup card-popup-green">
                            <div class="reduc heartBeat" data-wow-delay="1s">
                                -50%
                            </div>
                            <p id="offre-green"><?= $abonnement->name ?></p>
                            <div class="row">
                                <div class="col-12 details-engagement">
                                    <p class="price">
                                        <span id="prix">9.99 EUR/<span>mois</span></span>
                                    </p>
                                    <span class="prix-barre popup-prix-barre">
                                        <span id="prixbarre">19.99</span> EUR<br>par mois
                                    </span>

                                    <p>Période d'engagement</p>
                                    <div class="col-4 p-0">
                                        <select name="engagement_id" class="form-control form-control-engagement" id="select-engagement">
                                            <?php foreach ($abonnement->abonnement_engagement as $engagement) : ?>
                                                <option data-prix="<?= $engagement->prix ?>" data-prixbarre="<?= $engagement->prix_barre ?>" value="<?= $engagement->engagement_id ?>" data-duree="<?= $engagement->engagement->value ?>"><?= $engagement->engagement->name ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <?= $abonnement->description ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="modal-footer-odgo">
                <div class="row">
                    <div class="col-8">
                        <a href="<?= $this->Url->build('/users/mon-abonnement') ?>" class="link-connexion deja-compte">
                            <span class="white">Retour</span>
                        </a>
                    </div>
                    <div class="btn-suivant text-right col-4">
                        <button type="submit" class="link-connexion">
                            <span class="connexion-under">Suivant</span>
                            <span class="connexion-above">Suivant</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->Form->end() ?>

<?php $this->append('script') ?>
<script>
    percent = <?= $coupons->reduction_pourcent ?>;
    prix = ($("#select-engagement option:selected").data('prix') * (percent / 100)).toFixed(2);
    prixbarre = $("#select-engagement option:selected").data('prixbarre');
    text_prix = prix + ' EUR/<span>mois</span>';
    $('#prix').html(text_prix);
    $('#prixbarre').html(prixbarre);
    $('#select-engagement').on('change', function() {
        $('.prix-barre').addClass('d-none');
        $('.reduc').addClass('d-none');
        if ($("#select-engagement option:selected").data('duree') != 0) {
            prix = ($("#select-engagement option:selected").data('prix') * (percent / 100)).toFixed(2);
            text_prix = prix + ' EUR/<span>mois</span>';
            $('#prix').html(text_prix);

            prixbarre = $("#select-engagement option:selected").data('prixbarre');
            $('#prixbarre').html(prixbarre);
            $('.prix-barre').removeClass('d-none');
            $('.reduc').removeClass('d-none');
        } else {
            prix = $("#select-engagement option:selected").data('prix');
            text_prix = prix + ' EUR/<span>mois</span>';
            $('#prix').html(text_prix);
        }
    });
</script>
<?php $this->end() ?>
