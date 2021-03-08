<div class="container-fluid content-top">
    <div class="row content-body">
        <?= $this->element('menu_compte'); ?>
        <?= $this->Form->create(null, ['class' => 'col-lg-8 space-card', 'id' => 'aide-contact']) ?>
            <div class="back-card back-card-information row">
                <div class="col-lg-12">
                    <p class="title-aide">Aide & Contact</p>
                    <p class="text-justify col-md-10 p-0">Pour toute demande d'aide ou pour toute question, n'hésitez pas à nous contacter. Nos équipes vous recontacteront dans les plus brefs délais.</p>
                    <div class="row">
                        <div class="form-group col-md-10">
                            <label for="demande-infos">Objet</label>
                            <input name="subject" type="text" class="form-control form-control-popup" id="demande-infos">
                        </div>
                        <div class="form-group col-md-10">
                            <label for="message-info">Message</label>
                                <textarea name="message" class="form-control form-control-popup" id="message-info" rows="5"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer-odgo-compte">
                <div class="row">
                    <div class="col-4">
                        <a href="<?= $this->Url->build('#') ?>" data-toggle="modal" data-target="#" class="link-connexion deja-compte">
                            <span></span>
                        </a>
                    </div>
                    <div class="btn-suivant text-right col-5">
                        <button class="link-connexion">
                            <span class="connexion-under btn-compte-under">Envoyer</span>
                            <span class="connexion-above btn-compte-above">Envoyer</span>
                        </button>
                    </div>
                </div>
            </div>
        <?= $this->Form->end() ?>
    </div>
</div>
