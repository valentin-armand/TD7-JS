<?php

require_once('Model.php');

$titreLivre = $_GET['titreLivre'];

Model::addLivre($titreLivre);

$requete = Model::getAdherentByIdLivre();

echo json_encode($requete);