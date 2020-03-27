function printAllLivre(livres) {
    emptyLivre();
    let div = document.getElementById('listeLivresDisponibles');
    for(let elt of livres){
        let il = document.createElement("li");
        let idLivre = elt.idLivre;
        let titreLivre = elt.titreLivre;
        il.addEventListener('click', () => {
            requeteAllLivre(idLivre, titreLivre);
        });
        il.innerText = elt.idLivre + "-" + elt.titreLivre;
        div.appendChild(il);
    }
}

function emptyLivre() {
    let div = document.getElementById('listeLivresDisponibles');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function requeteAllLivre() {
    let url = "php/selectAllLivre.php";
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        printAllLivre(data);
    });
    requete.send(null);
}

function requeteAllLivres(type) {
    let url = "php/selectAllLivre.php" + type;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        if(type === 'disponible') {
            printAllLivre(data);
        } else {
          printAllEmprunt(data);
        }
    });
    requete.send(null);
}

function requeteAddLivre(titreLivre){
    let url = "php/addLivre.php?titreLivre=" + titreLivre;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        printAllLivre(data);
    });
    requete.send(null);
    document.getElementById('titreLivre').value = '';
}

function printAllEmprunt(emprunts) {
    emptyEmprunt();
    let div = document.getElementById('listeLivresEmpruntes');
    for(let elt of emprunts){
        let il = document.createElement("li");
        let idAdherent = elt.idAdherent;
        let idLivre = elt.idLivre;
        il.addEventListener('click', () => {
            selectEmprunt(idAdherent, idLivre);
        });
        il.innerText = elt.idLivre + "-" + elt.titreLivre;
        div.appendChild(il);
    }
}

function emptyEmprunt() {
    let div = document.getElementById('listeLivresEmpruntes');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function requeteAllEmprunt() {
    let url = "php/selectAllEmprunt.php";
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        printAllEmprunt(data);
    });
    requete.send(null);
}

function requeteEmpruntLivre(idAdherent, idLivre) {
    let url = "php/empruntLivre.php?idAdherent=" + idAdherent + "&idLivre" + idLivre;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requetAllAdherent();
    requeteAllLivres('emprunte');
    requeteAllLivres('disponible');
}

function empruntLivre(idLivre, titreLivre) {
    let idAdherent = prompt("Le livre \"" + titreLivre + "\"\nN° de l'emprunteur : ");
    if(idAdherent != null && idLivre != null) {
        requeteEmpruntLivre(idAdherent, idLivre);
        requeteAlleAdherent();
        requeteAllLivres('emprunte');
        requeteAllLivres('disponible');
    } else {
        console.log("vide");
    }
}

function requeteRendreLivre(idLivre) {
    let url = "php/rendreLivre.php?idLivre=" + idLivre;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
    requeteAllAdherent();
    requeteAllLivres('emprunte');
    requeteAllLivres('disponible');
}

function requeteNomAdherentByIdLivre(idLivre) {
    let url = "php/getAdherentByIdLivre.php?idLivre=" + idLivre;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function() {
        let nomAdherent = JSON.parse(requete.responseText);
        rendreLivre(nomAdherent[0].nomAdherent, idLivre)
    });
    requete.send(null);
}

function rendreLivre(nomAdherent, idLivre) {
    let str = 'Livre prete à ' + nomAdherent + '.\nRetour de ce livre?';
    let bool = confirm(str);
    if(bool) {
        requeteRendreLivre(idLivre);
    }
}

document.addEventListener('DOMContentLoaded', requeteAllLivre());
document.addEventListener('DOMContentLoaded', requeteAllEmprunt());