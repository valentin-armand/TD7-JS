<?php

require_once('Model.php');

$nomAdherent = $_GET['idAdherent'];

Model::selectAdherent($idAdherent);

$requete = Model::selectAdherent();

echo json_encode($requete);