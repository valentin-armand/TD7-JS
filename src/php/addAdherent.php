<?php

require_once('Model.php');

$nomAdherent = $_GET['nomAdherent'];

Model::addAdherent($nomAdherent);

$requete = Model::selectAllAdherent();

echo json_encode($requete);