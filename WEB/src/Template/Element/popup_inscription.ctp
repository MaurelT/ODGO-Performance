<?= $this->Form->create(null, ['url' => ['controller' => 'Users', 'action' => 'add'], 'id' => 'registerForm']) ?>
<div class="modal fade" id="inscription-etape-1" tabindex="-1" role="dialog" aria-labelledby="inscription-etape-1" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content inscription">
            <div class="row barre">
                <div class="col-4 left-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-4 center-barre">
                    <p class="red-barre"></p>
                </div>
                <div class="col-4 right-barre">
                    <p class="red-barre"></p>
                </div>
            </div>
            <div class="head-content-modal text-center">
                <img src="<?= $this->Url->build('/img/logo.png') ?>" class="logo" alt="odgo" />
                <p class="subtitle-modal">Création de votre compte</p>
            </div>
            <div class="modal-body modal-odgo row">
                <div class="form-group col-md-6">
                    <label for="nom">Nom</label>
                    <input name="lastname" type="text" class="form-control form-control-popup" id="nom" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="prenom">Prénom</label>
                    <input name="firstname" type="text" class="form-control form-control-popup" id="prenom" required>
                </div>
                <div class="form-group col-md-12">
                    <label for="email">Email</label>
                    <input name="email" type="email" class="form-control form-control-popup" id="email" autocomplete="off" required>
                </div>
                <div class="form-group col-md-12">
                    <label for="password">Mot de passe</label>
                    <input name="password" type="password" class="form-control form-control-popup" id="password" autocomplete="off" required>
                    <img src="<?= $this->Url->build('/img/eye-slash-solid.png') ?>" class="oeil" alt="oeil" />
                </div>
                <div class="form-group col-md-12">
                    <label for="password-confirmation">Confirmation</label>
                    <input name="password-confirmation" type="password" class="form-control form-control-popup" id="password-confirmation" required>
                    <img src="<?= $this->Url->build('/img/eye-slash-solid.png') ?>" class="oeil" alt="oeil" />
                </div>
                <div class="row modal-mdp-conseil">
                    <div class="col-md-9">
                        <p>Utilisez au moins huit caractères avec au minimum une majuscule et un symbole</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer-odgo">
                <div class="row">
                    <div class="col-8">
                        <a href="#connexion" class="deja-compte" data-dismiss="modal" data-toggle="modal" data-target="#connexion">Je possède déjà un compte</a>
                    </div>
                    <div class="btn-suivant text-right col-4">
                        <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#inscription-etape-2" class="link-connexion checkForm">
                            <span class="connexion-under">Suivant</span>
                            <span class="connexion-above">Suivant</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row link-footer-page">
                <ul class="link-footer">
                    <li><a href="<?= $this->Url->build('#') ?>">Aide / Question</a></li>
                    <li><a href="<?= $this->Url->build('/politique-de-confidentialite') ?>"> Politique de confidentialité</a></li>
                    <li><a href="<?= $this->Url->build('#') ?>">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="inscription-etape-2" tabindex="-1" role="dialog" aria-labelledby="inscription-etape-2" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content inscription">
            <div class="row barre">
                <div class="col-4 left-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-4 center-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-4 right-barre">
                    <p class="red-barre"></p>
                </div>
            </div>
            <div class="head-content-modal text-center">
                <img src="<?= $this->Url->build('/img/logo.png') ?>" class="logo" alt="odgo" />
                <p class="subtitle-modal">Création de votre compte</p>
            </div>
            <div class="modal-body modal-odgo row">
                <div class="form-group col-md-12">
                    <label for="telephone">N° de téléphone</label>
                    <input name="phone" type="tel" class="form-control form-control-popup" id="telephone" required>
                </div>
                <div class="form-group col-md-12">
                    <label for="email-recuperation">Email de récupération <span class="info">?</span></label>
                    <input name="recup_email" type="email" class="form-control form-control-popup" id="email-recuperation" required>
                </div>
                <div class="form-group col-md-12">
                    <label for="date-naissance">Date de naissance</label>
                    <input name="date_naissance" value="<?= date('Y-m-d') ?>" type="date" class="form-control form-control-popup" id="date-naissance" required>
                </div>
                <div class="form-group col-md-12">
                    <label for="sexe">Sexe</label>
                    <select name="sexe" class="form-control form-control-popup" id="sexe" required>
                        <option value="H">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                </div>
                <div class="form-group col-md-12">
                    <label for="sport">Sport pratiqué</label>
                    <select name="sport_id" class="form-control form-control-popup" id="sport" required>
                        <option selected disabled>Sélectionnez</option>
                        <?php foreach ($sports as $sport) : ?>
                            <option value="<?= $sport->id ?>"><?= $sport->name ?></option>
                        <?php endforeach; ?>

                    </select>
                </div>
                <div class="form-group col-md-12 otherSport d-none">
                    <label for="other-sport">Précisez</label>
                    <input name="other_sport" type="text" class="form-control form-control-popup" id="other-sport">
                </div>
                <div class="form-group col-md-12">
                    <label for="problematique">Si vous ne deviez en citer qu&apos;une, à quelle problématique principale êtes-vous confronté(e) ?</label>
                    <select name="problematique_id" class="form-control form-control-popup" id="problematique" required>
                        <option selected disabled>Sélectionnez</option>
                        <?php foreach ($problematiques as $problematique) : ?>
                            <option value="<?= $problematique->id ?>"><?= $problematique->name ?></option>
                        <?php endforeach; ?>
                    </select>
                    <div id="autre" class="">
                        <label for="autre">Précisez</label>
                        <textarea name="autre" class="form-control form-control-popup"></textarea>
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <label for="code_parrain">Code parrain</label>
                    <input name="code_parrain" maxlength="7" type="text" class="form-control form-control-popup" id="code_parrain">
                </div>
            </div>
            <div class="modal-footer-odgo">
                <div class="row">
                    <div class="col-8">
                        <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#inscription-etape-1" class="link-connexion deja-compte">
                            <span class="white">Retour</span>
                        </a>
                    </div>
                    <div class="btn-suivant text-right col-4">
                        <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#inscription-etape-3" class="link-connexion checkForm">
                            <span class="connexion-under">Suivant</span>
                            <span class="connexion-above">Suivant</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row link-footer-page">
                <ul class="link-footer">
                    <li><a href="<?= $this->Url->build('#') ?>">Aide / Question</a></li>
                    <li><a href="<?= $this->Url->build('/politique-de-confidentialite') ?>"> Politique de confidentialité</a></li>
                    <li><a href="<?= $this->Url->build('#') ?>">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="inscription-etape-3" tabindex="-1" role="dialog" aria-labelledby="inscription-etape-3" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content inscription">
            <div class="row barre">
                <div class="col-4 left-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-4 center-barre">
                    <p class="red-barre-active"></p>
                </div>
                <div class="col-4 right-barre">
                    <p class="red-barre-active"></p>
                </div>
            </div>
            <div class="head-content-modal text-center">
                <img src="<?= $this->Url->build('/img/logo.png') ?>" class="logo" alt="odgo" />
                <p class="subtitle-modal">Choix de votre offre</p><br>
                <p>Profitez de 20 jours d'essai <span class="bold-word">gratuits</span> sur notre offre <span class="bold-word green">green.</span><br>
                    Pas besoin de rentrer vos coordonnées bancaires.<br>
                    Le vrai « sans engagement ».
                </p>
            </div>
            <div class="card-popup">
                <div class="card-essai">Version <br>d'essai</div>
                <p class="offre-green">Offre Green</p>
                <p class="offre-fonct-title">
                    Fonctionnalités
                </p>
                <ul class="ul-fonctionnalites">
                    <li>Tableau de bord personnalisé</li>
                    <li>Suggestions nutritionnelles en fonction de votre activité physique</li>
                    <li>Vidéos d'exercices personnalisées suivant vos besoins (pour vous échauffer, pour récupérer...)</li>
                    <li>Compte rendu de séance d'entraînement ou de compétition</li>
                    <li>Testing de votre mobilité</li>
                </ul>
                <div class="collapse" id="fonctionnalites-inscription">
                    <ul class="ul-fonctionnalites">
                        <li>Conseil en hydratation</li>
                        <li>Historique de vos blessures et vos zones de tension</li>
                        <li>Enregistrement de toutes vos échéances dans votre calendrier</li>
                        <li>Suivi de vos résultats</li>
                        <li>Gestion du sommeil</li>
                    </ul>
                </div>
                <div class="flex-center">
                    <button class="text-right link-plus m-less btn btn-slide" type="button" data-toggle="collapse" data-target="#fonctionnalites-inscription" aria-expanded="false">
                        <em>+ de fonctionnalités</em><i class="fa fa-angle-down"></i>
                    </button>
                </div>
            </div>
            <input type="hidden" name="offer" value="" required id="selectedOffer">
            <div class="abonnement">
                <div>A la suite de 20 jours d'essai et <span style="text-decoration: underline;">uniquement si vous validez l'offre,</span> abonnement à partir de 9.99€ par mois*</div>
            </div>
            <div class="modal-footer-odgo-inactif">
                <div class="row">
                    <div class="col-8">
                        <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#inscription-etape-2" class="link-connexion deja-compte">
                            <span class="white">Retour</span>
                        </a>
                        <span class="asterisque">*Pour un abonnement de 12 mois</span>
                    </div>
                    <div class="btn-suivant text-right col-4">
                        <button class="link-connexion checkForm">
                            <span class="connexion-under">Suivant</span>
                            <span class="connexion-above">Suivant</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row link-footer-page">
                <ul class="link-footer">
                    <li><a href="<?= $this->Url->build('#') ?>">Aide / Question</a></li>
                    <li><a href="<?= $this->Url->build('/politique-de-confidentialite') ?>"> Politique de confidentialité</a></li>
                    <li><a href="<?= $this->Url->build('#') ?>">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<?= $this->Form->end() ?>

<?php $this->append('script') ?>
<?= $this->Html->script('https://www.google.com/recaptcha/api.js?render=6LcbJeQUAAAAAL8pZgxPKsvXjygKS1VmrYyqCF8o'); ?>
<script>
    var formCaptcha = $('#registerForm');

    formCaptcha.submit(function (event) {
        event.preventDefault();
        var form = $(this);
        grecaptcha.ready(function () {
            grecaptcha.execute('6LcbJeQUAAAAAL8pZgxPKsvXjygKS1VmrYyqCF8o', {
                action: 'contact'
            }).then(function (token) {
                form.prepend('<input type="hidden" name="recaptcha_token" value="' + token + '">');
                form.unbind('submit').submit();
            });
        });
        return false;
    });
</script>
<script>
    $(document).ready(function () {
        $('#sport').on('change', function () {
            $('.otherSport').addClass('d-none');
            if ($(this).val() == 14) {
                $('.otherSport').removeClass('d-none');
            }
        })
        $('#autre').hide();
        $("#problematique").change(function () {
            if ($("#problematique").val() == 5) {
                $('#autre').show(1);
            } else {
                $('#autre').hide();
            }
        });
        $('.card-popup').on('click', function () {
            $(this).addClass('card-popup-active');
            $(this).find('.card-essai').addClass('card-essai-active');
            $(this).find('.offre-green').addClass('offre-green-active');
            $(this).find('.fonctionnalite').addClass('fonctionnalite-active');
            $(this).find('.offre-fonct-body').removeClass('not-select');
            $('.modal-footer-odgo-inactif').addClass('modal-footer-odgo').removeClass('modal-footer-odgo-inactif');
            $('#selectedOffer').val(1);
        });
        $('#registerForm .checkForm').on('click', function () {
            let dontHaveErrors = true;
            $('.inputRequired').remove();
            let allInput = $(this).closest('.modal').find('input');
            let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            allInput.each(function () {
                if ($(this).attr('required')) {
                    if ($(this).attr('type') == 'password') {
                        if ($(this).attr('id') == 'password-confirmation') {
                            if ($('#password').val() != $(this).val()) {
                                dontHaveErrors = false;
                                $(this).after('<div class="inputRequired text-danger">Les mots de passe ne sont pas identiques.</div>');
                            }
                        } else {
                            if (!strongRegex.test($(this).val())) {
                                dontHaveErrors = false;
                                $(this).after('<div class="inputRequired text-danger">Utilisez au moins huit caractères avec au minimum une majuscule et un symbole</div>');
                            }
                        }
                    }
                    if ($(this).val() == '') {
                        dontHaveErrors = false;
                        if ($(this).attr('type') == 'hidden') {
                            $(this).after('<div class="inputRequired text-danger">Veuillez sélectionner une offre</div>');
                        } else {
                            $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                        }
                    }
                }
            });

            let allSelect = $(this).closest('.modal').find('select');
            allSelect.each(function () {
                if ($(this).attr('required')) {
                    let haveSelectedOption = false;
                    $(this).find('option').each(function () {
                        if ($(this).is(':selected') && !$(this).attr('disabled')) {
                            haveSelectedOption = true;
                        }
                    });

                    if (!haveSelectedOption) {
                        dontHaveErrors = false;
                        $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                    }
                }
            });
            return dontHaveErrors;
        });
        $('#registerForm').on('submit', function () {
            let dontHaveErrors = true;
            $('.inputRequired').remove();
            let allInput = $(this).find('input');
            let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            allInput.each(function () {
                if ($(this).attr('required')) {
                    if ($(this).attr('type') == 'password') {
                        if (!strongRegex.test($(this).val())) {
                            dontHaveErrors = false;
                            $(this).after('<div class="inputRequired text-danger">Utilisez au moins huit caractères avec au minimum une majuscule et un symbole</div>');
                        }
                    }
                    if ($(this).val() == '') {
                        dontHaveErrors = false;
                        if ($(this).attr('type') == 'hidden') {
                            $(this).after('<div class="inputRequired text-danger">Veuillez sélectionner une offre</div>');
                        } else {
                            $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                        }
                    }
                }
            });

            let allSelect = $(this).find('select');
            allSelect.each(function () {
                if ($(this).attr('required')) {
                    let haveSelectedOption = false;
                    $(this).find('option').each(function () {
                        if ($(this).is(':selected') && !$(this).attr('disabled')) {
                            haveSelectedOption = true;
                        }
                    });

                    if (!haveSelectedOption) {
                        dontHaveErrors = false;
                        $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                    }
                }
            });
            if (dontHaveErrors) {


//                grecaptcha.ready(function() {
//                    grecaptcha.execute('6LcbJeQUAAAAAL8pZgxPKsvXjygKS1VmrYyqCF8o', {
//                        action: 'contact'
//                    }).then(function(token) {
//                        form.prepend('<input type="hidden" name="recaptcha_token" value="' + token + '">');
//                        form.unbind('submit').submit();
//                    });
//                });
            }
            return dontHaveErrors;
        });
    });
</script>
<?php $this->end() ?>
