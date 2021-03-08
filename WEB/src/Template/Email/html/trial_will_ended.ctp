<p>Bonjour <?= $user->lastname ?> <?= $user->firstname ?>,</p><br />

<p>
    Ta période d’essai gratuite prendra fin dans 5 jours et on espère que tes deux premières semaines avec nous t’ont plu.
</p>

<p>
Si c’est le cas, poursuivons l’aventure ensemble<br>
    <a href="<?= $this->Url->build(['prefix' => false, 'controller' => 'Users', 'action' => 'choixOffres']) ?>">Continuer avec Odgo</a>
</p>

<p>
De toutes les façons, nous t’écrirons le jour de la fin de ta période d’essai pour t’informer. Et si tu as des questions, rendez-vous sur notre site ou sur les réseaux sociaux pour échanger.</p>
