<p>Bonjour <?= $user->lastname ?> <?= $user->firstname ?>,</p><br />

<p>Vous venez de valider l’offre « <?= $abonnement->name ?> », encore merci pour votre confiance !</p>

<p>Et si on te disait qu’en parrainant un nouvel utilisateur, vous pourriez bénéficier tous les deux d’un mois d’utilisation gratuit ?<br>
    <a href="<?= $this->Url->build(['prefix' => false, 'controller' => 'Users', 'action' => 'mesInformations']) ?>">Je veux parrainer quelqu’un</a>
</p>
<p>Donc n’hésite pas à parler de l’application autour de toi 😉.</p>
