<?php

require_once('Model.php');

// lancement de la requête SQL avec selectByName et
// récupération du résultat de la requête SQL
$requete = Model::selectAllEmprunt();

// affichage en format JSON du résultat précédent
echo json_encode($requete);