<?= $this->Form->create(null, ['action' => '/charge', 'id' => 'payment-form']) ?>
<input type="hidden" name="abonnement_id" value="<?= $abonnement_id ?>" />
<input type="hidden" name="engagement_id" value="<?= $engagement_id ?>" />
<div id="paiement" class="container-fluid content-top">
    <div class="row content-body">
        <div class="p-0 offset-lg-2 col-lg-8 modal-content paiement">
            <div class="row barre">
                <div class="col-6 left-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-6 right-barre">
                    <p class="red-barre-active"></p>
                </div>
            </div>
            <div class="head-content-modal text-center">
                <img src="<?= $this->Url->build('/img/logo.png') ?>" class="logo" alt="odgo" />
                <p class="subtitle-modal">Choix de votre offre<br>et de votre période d'engagement</p>
            </div>
        </div>
        <div class="p-0 offset-lg-2 col-lg-8 modal-content paiement">
            <div class="row">
                <div class="col-lg-12">
                    <div class="left-side row">
                        <div class="offset-lg-3 col-lg-6 choix-periode">
                            <?php if ($abonnement_engagement->engagement->value != 0) { ?>
                                <div class="form-check choix">
                                    <input class="form-check-input" type="radio" name="choix" id="periode" value="periode" checked>
                                    <label class="form-check-label" for="periode">
                                        A la période
                                    </label>
                                </div>
                            <?php } ?>
                            <div class="form-check choix">
                                <input class="form-check-input" type="radio" name="choix" id="mois" value="mois" <?= ($abonnement_engagement->engagement->value == 0) ? 'checked' : '' ?>>
                                <label class="form-check-label" for="mois">
                                    Au mois
                                </label>
                            </div>
                        </div>
                        <div class="offset-lg-3 col-lg-6 recap-periodes">
                            <div class="offre-selection">
                                <p>
                                    <span class="offer"><?= $abonnement_engagement->abonnement->name ?></span> 
                                    <span class="time">- <?= $abonnement_engagement->engagement->name ?></span>
                                </p>
                                <p class="paymentChoice">
                                    <?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>€ / période
                                </p>
                            </div>
                            <a class="change-engagement" href="<?= $this->Url->build('/users/choix-offres') ?>">Changer mon engagement</a>
                        </div>
                    </div>
                    <div class="back-price">
                        <div class="bloc-price offset-lg-3 col-lg-6">
                            <div class="recap-price">
                                <span>Sous-total</span>
                                <span class="paymentChoice2"><?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>€</span>
                            </div>
                            <div id="promotion_zone">
                                <!-- Insert promo -->
                            </div>
                            <div class="recap-price total-price">
                                <span>Total</span>
                                <span><span class="prix_final"><?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?> €</span>
                            </div>
                        </div>
                    </div>
                    <div class="facture col-12">
                        <div class="offset-lg-3 col-lg-6">
                            <div class="recap-price">
                                <p><b>Facturé aujourd'hui</b></p>
                                <p><b><span class="today_price"><?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?> €</span></b></p>
                            </div>
                            <div class="">
                                <div class="input text d-flex">
                                    <input type="text" name="promo" class="form-control form-control-popup" placeholder="Ajouter un code promo" maxlength="255" id="code_promo" value="">
                                    <button id="apply_promo" type="button" class="btn btn-block btn-payer">
                                        Appliquer
                                    </button>
                                </div>
                                <div id="return_promo">

                                </div>
                                <br />
                            </div>
                            <div class="form-row">
                                <div id="card-element">
                                    <!-- a Stripe Element will be inserted here. -->
                                </div>
                                <!-- Used to display form errors -->
                                <div id="card-errors"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 p-0 ">
                        <button type="submit" class="btn btn-block btn-payer">
                            Payer <span class="today_price"><?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?> €</span>
                        </button>
                    </div>
                    <div class="col-12" style="background-color: #000;">
                        <a href="<?= $this->Url->build('/users/choix-offres') ?>" class="link-connexion deja-compte">
                            <span>Retour</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->Form->end() ?>

<?php $this->append('script') ?>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>
<script src="<?= $this->Url->build('/js/charge.js') ?>"></script>
<script>
    $(document).ready(function () {
        let price = <?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>;
        let finalPrice = <?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>;
        let paymentChoice = 'période';
        let engagement = <?= $abonnement_engagement->engagement->value ?>;

        function setCorrectPrice() {
            if ($('#periode').is(':checked')) {
                price = finalPrice = <?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>;
                paymentChoice = 'Période';
            } else {
                price = <?= $abonnement_engagement->prix_barre ?>;
                finalPrice = <?= $abonnement_engagement->prix_barre * $abonnement_engagement->engagement->value ?>;
                paymentChoice = 'mois';
            }
            $('.paymentChoice').html(`${price} € / ${paymentChoice}`);
            if (engagement != 0) {
                $('.prix_final').text(`${Math.round((finalPrice + Number.EPSILON) * 100) / 100} €`);
            } else {
                $('.prix_final').text(`${Math.round((price + Number.EPSILON) * 100) / 100} €`);
            }
            $('.today_price').text(`${price} €`);
            if (typeof (promo) !== 'undefined') {
                let new_prix;
                if (promo['reduction_valeur']) {
                    new_prix = price - promo['reduction_valeur'];
                } else {
                    let percentage = promo['reduction_pourcent'] / 100;
                    // new_prix = Math.round((price * percentage + Number.EPSILON) * 100) / 100;
                    new_prix = price * percentage;
                }

                if ($('#periode').is(':checked')) {
                    $('.prix_final').text(`${finalPrice - new_prix} €`);
                    $('.paymentChoice').html(`${finalPrice - new_prix} €`);
                    $('.paymentChoice2').html(`${finalPrice} €`);
                } else if (engagement != 0) {
                    $('.prix_final').text(`${(new_prix).toFixed(2)} €/mois`);
                    $('.paymentChoice').html(`${new_prix.toFixed(2)} €/` + paymentChoice);
                    $('.paymentChoice2').html(`${finalPrice / <?= $abonnement_engagement->engagement->value ?>} € /` + paymentChoice);
                } else {
                    $('.prix_final').text(`${price - new_prix} €`);
                    $('.paymentChoice').html(`${price - new_prix} € /` + paymentChoice);
                }

                period_promo = '/ mois';
                if ($('#periode').is(':checked')) {
                    period_promo = '';
                }

                $('.today_price').text(`${(((price - new_prix + Number.EPSILON) * 100) / 100).toFixed(2)} €`);

                $('#promotion_zone')
                        .html(`
                            <div class="recap-price promoDiv">
                                <span>${promo['libelle']}</span>
                                <span>- ${new_prix.toFixed(2)} € ${period_promo}</span>
                                <input type="hidden" name="coupon" value="${promo['stripe_id']}" />
                            </div>
                        `);
            }
        }

        function getPromo(code) {
            $.ajax({
                url: '<?= $this->Url->build(['controller' => 'Coupons', 'action' => 'verif']) ?>', // La ressource ciblée
                type: 'POST',
                dataType: 'json',
                data: {
                    code: code
                },
                success: function (data) {
                    if (engagement != 0) {
                        $('#return_promo').html(`<span class="text-success">Code promo appliqué (- ${data['reduction_pourcent']}%)</span>`);

                        // On désactive les input
                        $('#apply_promo').attr('disabled', 'disabled');
                        $('#code_promo').attr('disabled', 'disabled');
                        promo = data;
                    }
                    setCorrectPrice();
                },
                error: function () {
                    $('#return_promo').html('<span class="text-danger">Code promo invalide.</span>');
                }
            });
        }
        $('#apply_promo').on('click', function () {
            $('#return_promo').html('<span class="">Chargement...</span>');
            code = $('#code_promo').val();
            getPromo(code);
        });

        $('.choix input').on('change', function () {
            setCorrectPrice();
        });

        getPromo('<?= $coupons ?>');
    });
</script>
<?php $this->end() ?>
