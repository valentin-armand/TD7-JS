<?php

require_once('Model.php');

$titreLivre = $_GET['titreLivre'];

Model::addLivre($titreLivre);

$requete = Model::selectAllLivre();

echo json_encode($requete);