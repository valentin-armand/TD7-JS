function printAllAdherent(adherents) {
    emptyAdherent();
    let div = document.getElementById('listeAdherents');
    for(let elt of adherents){
        let il = document.createElement("li");
        let idAdherent = elt.idAdherent;
        let nomAdherent = elt.nomAdherent;
        let nbEmprunt = elt.nbEmprunt;
        il.addEventListener('click', () => {
            selectAdherent(idAdherent, nomAdherent, nbEmprunt);
        });
        il.innerText = elt.idAdherent + "-" + elt.nomAdherent;
        if (elt.nbEmprunt > 0 && elt.nbEmprunt < 2){
            il.innerText += ' (' + elt.nbEmprunt + ' emprunt)';
        }else if (elt.nbEmprunt > 1){
            il.innerText += ' (' + elt.nbEmprunt + ' emprunts)';
        }
        div.appendChild(il);
    }
}

function emptyAdherent() {
    let div = document.getElementById('listeAdherents');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function requeteAllAdherent() {
    let url = "php/selectAllAdherent.php";
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        printAllAdherent(data);
    });
    requete.send(null);
}

function requeteAddAdherent() {
    let url = "php/addAdherent.php";
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function() {
        let data = JSON.parse(requete.responseText);
        echo("Adherent ajouté !");
    });
    requete.send(null);
}


document.addEventListener('DOMContentLoaded', requeteAllAdherent());