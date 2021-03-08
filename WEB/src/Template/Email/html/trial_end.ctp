<p>Bonjour <?= $user->lastname ?> <?= $user->firstname ?>,</p><br />

<p>C’est aujourd’hui que se termine ta période d’essai gratuite. Et oui, toutes les bonnes choses ont une fin…</p>

<p>Mais bonne nouvelle, tu peux continuer à utiliser ton application et renseigner tes performances en cliquant par ici :<br />
    <a href="<?= $this->Url->build(['prefix' => false, 'controller' => 'Users', 'action' => 'choixOffres']) ?>">Je continue !</a>
</p>

<p>On espère te compter parmi nous encore longtemps et on te dit à bientôt !</p>

<p>PS : si tu décides de ne pas poursuivre l’expérience avec nous, tu peux nous expliquer les raisons <a href="mailto:contact@odgoperformance.com">ici</a>. On fera au mieux pour prendre en compte tes remarques.</p>
