<div class="container-fluid content-top">
    <div class="row content-body">
        <?= $this->element('menu_compte'); ?>
        <?= $this->Form->create($user, ['class' => 'col-lg-8 space-card', 'id' => 'mes-informations']) ?>
        <div class="back-card back-card-information row">
            <div class="col-lg-12">
                <p class="title-mon-abonnement">Mes informations</p>
                <div class="row">
                    <div class="form-group col-md-10">
                        <?= $this->Form->control('lastname', ['label' => 'Nom', 'class' => 'form-control form-control-popup']) ?>
                    </div>
                    <div class="form-group col-md-10">
                        <?= $this->Form->control('firstname', ['label' => 'Prénom', 'class' => 'form-control form-control-popup']) ?>
                    </div>
                    <div class="form-group col-md-10">
                        <?= $this->Form->control('email', ['label' => 'Email', 'class' => 'form-control form-control-popup']) ?>
                    </div>
                    <div class="form-group col-md-10">
                        <?= $this->Form->control('phone', ['label' => 'N° de téléphone', 'class' => 'form-control form-control-popup']) ?>
                    </div>
                    <div class="form-group col-md-10">
                        <label for="email-recuperation">Email de récupération <span class="info">?</span></label>
                        <input name="email-recuperation" type="email" class="form-control form-control-popup" id="email-recuperation" value="<?= $user->recup_email ?>">
                    </div>
                    <div class="form-group col-md-10">
                        <label for="date-naissance">Date de naissance</label>
                        <input name="date_naissance" type="date" class="form-control form-control-popup" id="date-naissance" value="<?= $user->date_naissance->format('Y-m-d') ?>">
                    </div>
                    <div class="form-group col-md-10">
                        <label for="sexe">Sexe</label>
                        <select name="sexe" class="form-control form-control-popup" id="sexe">
                            <option value="H" <?= ($user->sexe == 'M') ? 'selected' : '' ?>>Masculin</option>
                            <option value="F" <?= ($user->sexe == 'F') ? 'selected' : '' ?>>Féminin</option>
                        </select>
                    </div>
                    <div class="form-group col-md-10">
                        <label for="sport">Sport</label>
                        <select name="sport_id" class="form-control form-control-popup" id="sport">
                            <option selected disabled>Sélectionnez</option>
                            <?php foreach ($sports as $sport): ?>
                                <option value="<?= $sport->id ?>" <?= ($sport->id == $user->sport_id) ? 'selected' : '' ?> ><?= $sport->name ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group col-md-10">
                        <label for="problematique">Problématique</label>
                        <select name="problematique_id" class="form-control form-control-popup" id="problematique">
                            <option selected disabled>Selectionnez</option>
                            <?php foreach ($problematiques as $problematique): ?>
                                <option value="<?= $problematique->id ?>" <?= ($problematique->id == $user->problematique_id) ? 'selected' : '' ?> ><?= $problematique->name ?></option>
                            <?php endforeach; ?>
                        </select>
                        <div id="autre" class="">
                            <label for="autre">Précisez</label>
                            <textarea name="autre" class="form-control form-control-popup"></textarea>
                        </div>
                    </div>
                </div>

                <p class="title-mon-abonnement">Parrainage</p>
                <div class="row">
                    <div class="form-group col-md-10">
                        <b>Code parrain :</b> <?= $user->code_parrain ?>
                        <ul>
                            <?php
                            if (!empty($filleuls)) {
                                echo '<b>Mes filleuls</b>';
                                foreach ($filleuls as $filleul) {
                                    ?>
                                    <li><?= $filleul->email ?></li>
                                    <?php
                                }
                            }
                            ?>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal-footer-odgo-compte">
            <div class="row">
                <div class="col-3">
                    <a href="<?= $this->Url->build('#') ?>" data-toggle="modal" data-target="#" class="link-connexion deja-compte">
                        <span></span>
                    </a>
                </div>
                <div class="btn-suivant text-right col-5">
                    <button class="link-connexion">
                        <span class="connexion-under btn-compte-under">Sauvegarder</span>
                        <span class="connexion-above btn-compte-above">Sauvegarder</span>
                    </button>
                </div>
            </div>
        </div>
        <?= $this->Form->end() ?>
    </div>
</div>



<?php $this->append('script') ?>
<script>
    $(document).ready(function () {
        $('#autre').hide();
        $("#problematique").change(function () {
            if ($("#problematique").val() == 5) {
                $('#autre').show(1);
            } else {
                $('#autre').hide();
            }
        });
    });
</script>
<?php $this->end() ?>
