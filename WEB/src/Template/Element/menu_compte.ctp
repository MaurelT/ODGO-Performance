<div class="col-lg-4">
    <?= $this->Form->create(null, ['type' => 'file', 'url' => ['controller' => 'Users', 'action' =>'uploadPhoto'], 'class' => 'profil text-center row']) ?>
        <div class="col-12">
            <div class="rounded-circle" style="background-image: url('<?= $this->Url->build($auth['picture']) ?>');background-position: center; background-size: cover;background-repeat: no-repeat; margin: auto;">&nbsp;</div>
            <p class="nom-profil"><?= ucfirst($auth['firstname']) ?> <?= ucfirst($auth['lastname']) ?></p>
            <p class="sport"><?= ucfirst($auth['sport']['name']) ?></p>
            <p class="type-abonnement">Version d&apos;essai</p>
            <span class="choix-photo"><a href="<?= $this->Url->build('#') ?>" id="btnLogo">+</a></span>
            <input name="picture" id="inputLogo" class="d-none" type="file">
        </div>
    <?= $this->Form->end() ?>
    <a class="link-card" href="<?= $this->Url->build('/users/mon-abonnement') ?>">
        <div class="mon-abonnement row <?= (in_array($this->request->getParam('action'), ['monAbonnement']) ? 'active' : '') ?>">
            <div class="col-3 text-center">
                <i class="far fa-clipboard icon-perso"></i>
            </div>
            <div class="col-9">
                <p>Mon abonnement</p>
            </div>
        </div>
    </a>
    <a class="link-card" href="<?= $this->Url->build('/users/mes-informations') ?>">
        <div class="mes-informations row <?= (in_array($this->request->getParam('action'), ['mesInformations']) ? 'active' : '') ?>">
            <div class="col-3 text-center">
                <i class="far fa-id-card icon-perso"></i>
            </div>
            <div class="col-9">
                <p>Mes informations</p>
            </div>
        </div>
    </a>
    <a class="link-card" href="<?= $this->Url->build('/users/aide-contact') ?>">
        <div class="aide-contact row <?= (in_array($this->request->getParam('action'), ['aideContact']) ? 'active' : '') ?>">
            <div class="col-3 text-center">
                <i class="far fa-question-circle icon-perso"></i>
            </div>
            <div class="col-9">
                <p>Aide & contact</p>
            </div>
        </div>
    </a>
</div>
<?php $this->append('script') ?>
    <script>
        $(document).ready(function () {
            function readURL(input, div) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(div).attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $('#btnLogo').on('click', function () {
                $('#inputLogo').click();
            });
            $('#inputLogo').on('change', function () {
                readURL(this, '#logo');
                $(this).closest('form').submit();
            });
        });
    </script>
<?php $this->end() ?>
