function printAllLivre(livres) {
    emptyLivre();
    let div = document.getElementById('listeLivresDisponibles');
    for(let elt of livres){
        let il = document.createElement("li");
        let idLivre = elt.idLivre;
        let titreLivre = elt.titreLivre;
        il.addEventListener('click', () => {
            selectLivre(idLivre, titreLivre);
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

document.addEventListener('DOMContentLoaded', requeteAllLivre());
document.addEventListener('DOMContentLoaded', requeteAllEmprunt());