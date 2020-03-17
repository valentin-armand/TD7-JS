<?php
$link = mysqli_connect("localhost", "root", "")
	or die("Impossible de se connecter : " . mysql_error());
echo 'Connexion réussie';
mysqli_close($link);
?>