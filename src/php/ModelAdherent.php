<?php
require_once File::build_path(array("php","Model.php"));

class ModelAdherent {
    private $idAdherent;
    private $nomAdherent;

    public function __construct($i = NULL, $n = NULL) {
        $this->idAdherent = $i;
        $this->nomAdherent = $n;
    }
}

public function save() {
    try {
        $pdo = Model::$pdo;

        $sql = "INSERT INTO adherent(idAdherent, nomAdherent) VALUES ([values + 1], :nom_tag)";
        $req_prep = $pdo->prepare($sql);
        $values = array("id_tag" => $this->idAdherent, "nom_tag" => $this->nomAdherent);
        $req_prep->execute($values);
    } catch(PDOException $e) {
        return false;
    }
}