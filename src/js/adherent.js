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

function createInstance() {
    if(window.XMLHttpRequest) {
        // Pour Chrome, Firefox, Opera
        return new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        // Pour Internet Explorer
        var names = [
            "Msxml2.XMLHTTP.6.0",
            "Msxml2.XMLHTTP.3.0",
            "Msxml2.XMLHTTP",
            "Microsoft.XMLHTTP"
        ];
        for(var i in names) {
            try {
                return new ActiveXObject(names[i]);
            }
            catch(e){}
        }
        alert("Non supporte");
        return null;
    }
}

function sendData() {
    var req = createInstance();
    // Recuperation de la donnee
    var donneeClient = document.
}


document.addEventListener('DOMContentLoaded', requeteAllAdherent());