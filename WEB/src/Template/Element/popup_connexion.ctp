<?= $this->Form->create(null, ['url' => ['controller' => 'Users', 'action' => 'login'], 'id' => 'loginForm']) ?>
    <div class="modal fade" id="connexion" tabindex="-1" role="dialog" aria-labelledby="connexion" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content connexion">
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
                    <p class="subtitle-modal">Accéder à mon compte</p>
                </div>
                <div class="modal-body modal-odgo row">
                    <div class="form-group col-md-12">
                        <label for="email-connexion">Email</label>
                        <input name="email" type="email" class="form-control form-control-popup" id="email-connexion" required>
                        <a href="#forget-adresse" class="forget-mail" data-dismiss="modal" data-toggle="modal" data-target="#forget-adresse">Adresse e-mail oubliée ?</a>
                    </div>
                </div>
                <div class="modal-footer-odgo">
                    <div class="row">
                        <div class="col-8">
                            <a href="<?= $this->Url->build('#inscription-etape-1') ?>" data-dismiss="modal" data-toggle="modal" data-target="#inscription-etape-1" class="link-connexion deja-compte">Créer un compte</a>
                        </div>
                        <div class="btn-suivant text-right col-4">
                            <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#connexion-etape-2" class="link-connexion checkForm">
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
    <div class="modal fade" id="connexion-etape-2" tabindex="-1" role="dialog" aria-labelledby="connexion-etape-2" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content connexion">
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
                    <p class="subtitle-modal">Accéder à mon compte</p>
                </div>
                <div class="modal-body modal-odgo row">
                    <div class="form-group col-md-12">
                        <label for="password-connexion">Mot de passe</label>
                        <input name="password" type="password" class="form-control form-control-popup" id="password-connexion" required>
                        <a href="#forget-adresse" class="forget-mail" data-dismiss="modal" data-toggle="modal" data-target="#forget-adresse">Mot de passe oublié ?</a>
                    </div>
                </div>
                <div class="modal-footer-odgo">
                    <div class="row">
                        <div class="col-8">
                            <a href="<?= $this->Url->build('#') ?>" data-toggle="modal" data-target="#inscription-etape-1" class="link-connexion deja-compte">
                                <span></span>
                            </a>
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
<!--récupération-->
<div class="modal fade" id="forget-adresse" tabindex="-1" role="dialog" aria-labelledby="forget-adresse" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content connexion">
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
                <p class="subtitle-modal">Saisir mon adresse email ou numéro de téléphone de récupération</p>
            </div>
            <form>
                <div class="modal-body modal-odgo row">
                    <div class="form-group col-md-12">
                        <label for="email-connexion">Email/Telephone</label>
                        <input name="email-connexion" type="email" class="form-control form-control-popup" id="email-connexion">
                    </div>
                </div>
                <div class="modal-footer-odgo">
                    <div class="row">
                        <div class="col-8">
                            <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#" class="link-connexion deja-compte">
                                <span></span>
                            </a>
                        </div>
                        <div class="btn-suivant text-right col-4">
                            <a href="<?= $this->Url->build('#') ?>" data-dismiss="modal" data-toggle="modal" data-target="#forget-adresse-2" class="link-connexion">
                                <span class="connexion-under">Suivant</span>
                                <span class="connexion-above">Suivant</span>
                            </a>
                        </div>
                    </div>
                </div>
            </form>
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
<div class="modal fade" id="forget-adresse-2" tabindex="-1" role="dialog" aria-labelledby="forget-adresse-2" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content connexion">
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
                <p class="subtitle-modal">Récupération de compte</p>
            </div>
            <form>
                <div class="modal-body modal-odgo row">
                    <div class="col-12 text-center">
                        <img src="<?= $this->Url->build('/img/paper-plane-regular.png') ?>" class="logo mb-5" alt="odgo" />
                        <p>ODGO enverra vos identifiants de connexion<br> aux coordonnées indiquées</p>
                    </div>
                </div>
            </form>
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

<?php $this->append('script') ?>
<script>
    $(document).ready(function() {
        $('#loginForm .checkForm').on('click', function() {
            let dontHaveErrors = true;
            $('.inputRequired').remove();
            let allInput = $(this).closest('.modal').find('input');
            allInput.each(function() {
                if ($(this).attr('required')) {
                    if ($(this).val() == '') {
                        dontHaveErrors = false;
                        $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                    }
                }
            });
            return dontHaveErrors;
        });
        $('#loginForm').on('submit', function() {
            let dontHaveErrors = true;
            $('.inputRequired').remove();
            let allInput = $(this).find('input');
            allInput.each(function() {
                if ($(this).attr('required')) {
                    if ($(this).val() == '') {
                        dontHaveErrors = false;
                        $(this).after('<div class="inputRequired text-danger">Champ requis</div>');
                    }
                }
            });
            return dontHaveErrors;
        });
    });
</script>
<?php $this->end() ?>
