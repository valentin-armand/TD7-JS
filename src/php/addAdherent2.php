<?php
    var_dump($_POST);
    if (isset($_POST['nomAdherent']))
    {
        $bdd = new PDO("mysql:host=127.0.0.1;dbname=td7;charset=utf8", 'root', '');
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try
        {
            $requete=$bdd->prepare("INSERT INTO `adherent`(`nomAdherent`) VALUES(?)");
            $requete->execute(array($_POST['nomAdherent']));
        }
        catch(EXCEPTION $e)
        {
            /* on affiche les erreur éventuelles en développement */
            die('Erreur : '.$e->getMessage());
        }

 ?>
