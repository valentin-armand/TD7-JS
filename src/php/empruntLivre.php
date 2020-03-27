<?php

require_once('Model.php');

$titreLivre = $_GET['titreLivre'];

Model::empruntLivre($titreLivre);

$requete = Model::selectAllEmprunt();

echo json_encode($requete);