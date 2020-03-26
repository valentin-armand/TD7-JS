<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAllAdherent(){
            try {
                $sql = "SELECT adherent.idAdherent, nomAdherent, COUNT(emprunt.idAdherent) AS nbEmprunt FROM adherent LEFT JOIN emprunt ON emprunt.idAdherent = adherent.idAdherent GROUP BY idAdherent";
                $rep = Model::$pdo->query($sql);
                $rep->setFetchMode(PDO::FETCH_CLASS, 'Model');
                $tab = $rep->fetchAll();
                return $tab;
            } catch (PDOException $e) {
                echo $e->getMessage();
                die("Erreur lors de la recherche dans la base de données.");
            }
    }

    public static function selectAllLivre(){
            try {
                $sql = "SELECT livre.idLivre, titreLivre FROM livre LEFT JOIN emprunt ON livre.idLivre = emprunt.idLivre WHERE emprunt.idLivre IS NULL";
                $rep = Model::$pdo->query($sql);
                $rep->setFetchMode(PDO::FETCH_CLASS, 'Model');
                $tab = $rep->fetchAll();
                return $tab;
            } catch (PDOException $e) {
                echo $e->getMessage();
                die("Erreur lors de la recherche dans la base de données.");
            }
    }

    public static function selectAllEmprunt() {
        try {
            $sql = "SELECT `livre`.`titreLivre` AS titreLivre, emprunt.* FROM emprunt INNER JOIN livre
                                                                                                    ON `emprunt`.`idLivre` = `livre`.`idLivre`";
            $rep = Model::$pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_CLASS, 'Model');
           $tab = $rep->fetchAll();
           return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données. ");
        }
    }

    /*public static function addAdherent($name) {
        	$sql = "INSERT INTO `adherent`(`idAdherent`, `nomAdherent`) VALUES ([value+1],$name)";
        	if (!mysql_query($sql,$con)) {
    			die('impossible d’ajouter cet enregistrement : ' . mysql_error());
    		}
    		echo "L’enregistrement est ajouté ";

    		mysql_close($con)
    }*/

    public static function addAdherent($nomAdherent){
            try {
                $sql = 'INSERT INTO adherent (nomAdherent) VALUES (:nomAdherent_tag)';
                $values = array(':nomAdherent_tag' => $nomAdherent);
                $rep_prep = Model::$pdo->prepare($sql);
                $rep_prep->execute($values);
            }
            catch(PDOException $e) {
                echo $e->getMessage();
                die("Erreur lors de la creation dans la base de données.");
            }
    }

    public static function empruntLivre($idAdherent, $idLivre) {
        try {
            $sql = 'INSERT INTO emprunt (idAdherent, idLivre) VALUES (:idAdherent_tag, :idLivre_tag)';
            $values = array('idAdherent_tag' => $idAdherent, ':idLivre_tag' => $idLivre);
            $rep_prep = Model::$pdo->prepare($sql);
            $rep_prep->execute($values);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die("Une erreur est survenue dans la base de données");
        }
    }

    public static function returnLivre($idLivre) {
        try {
            $sql = 'DELETE FROM emprunt WHERE idLivre = :idLivre_tag';
            $values = array(':idLivre_tag' => $idLivre);
            $rep_prep = Model::$pdo->prepare($sql);
            $rep_prep->execute($values);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die("Une erreur est survenue dans la base de données");
        }
    }
}

// on initialise la connexion $pdo
Model::init_pdo();

?>
