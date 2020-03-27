function selectAdherent(idAdherent, nomAdherent, nbEmprunt) {
    requeteSelectAdherent(idAdherent, nomAdherent, nbEmprunt);
}

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

function requeteAddAdherent(nomAdherent){
    let url = "php/addAdherent.php?nomAdherent=" + nomAdherent;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        let data = JSON.parse(requete.responseText);
        printAllAdherent(data);
    });
    requete.send(null);
    document.getElementById('nomAdherent').value = '';
}

function requeteSelectAdherent(idAdherent, nomAdherent, nbEmprunt) {
    let url = "php/selectAdherent.php?idAdherent=" + idAdherent;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function() {
        let data = JSON.parse(requete.responseText);
        printAdherent(idAdherent, nomAdherent, nbEmprunt, data)
    });
    requete.send(null);
}

function printAdherent(idAdherent, nomAdherent, nbEmprunt, data) {
    console.log(nbEmprunt);
    let str = "";
    if (nbEmprunt === 0) {
        str += nomAdherent + ' ne possède pas d\'emprunt actuellement';
    } else {
        str += nomAdherent + 'possède' + nbEmprunt + 'emprunt(s) actuellement';
        for (elt in data) {
            str += "\n- " + data[elt].titreLivre;
        }
    }
    console.log(str);
    alert(str);
}


function test() {
    console.log("Test");
}

document.addEventListener('DOMContentLoaded', requeteAllAdherent());