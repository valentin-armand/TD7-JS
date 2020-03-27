<?php

require_once('Model.php');

$idAdherent = $_GET['idAdherent'];



$requete = Model::selectAdherent($idAdherent);

echo json_encode($requete);