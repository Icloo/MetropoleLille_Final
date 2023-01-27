    var map = L.map('map').setView([50.628479,3.12793], 11); 


    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);

//////////////////////////////////////////////////////////////////////:

let restau = document.getElementById('afficherrestau');

    const url = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone';

    fetch(url)
        .then((tropbienleJS) => tropbienleJS.json())
        .then((tropbienleJS) => {
            const lieux = tropbienleJS.records;
            console.log(lieux[0].fields.title);
            console.log(tropbienleJS);

            for(i=0; i<lieux.length;i++){
            L.marker(lieux[i].fields.geolocalisation).on('click', onClick).addTo(map);
            let testi = i;
            function onClick(e) {
                while (restau.firstChild) {
                    restau.removeChild(restau.firstChild);
                }
                let div = document.createElement('div');
                div.id = "restau";
                restau.appendChild(div);
                let divphoto = document.createElement('div');
                divphoto.className = "emplacementphoto";
                div.appendChild(divphoto);
                let divbouton = document.createElement('div');
                divbouton.className = "enregistrer";
                div.appendChild(divbouton);
                let divdesc = document.createElement('div');
                divdesc.className = "desc";
                div.appendChild(divdesc);
 
                let divcroix = document.createElement('div');
                divcroix.className = "fermer";
                div.appendChild(divcroix);
                let photolieu = document.createElement('img');
                photolieu.className = "photo";
                photolieu.setAttribute('src','assets/image/photorestau.jpg');
                divphoto.appendChild(photolieu);
                let titredescription = document.createElement('h2');
                titredescription.textContent = lieux[testi].fields.title;
                divdesc.appendChild(titredescription);
                let adressedescription = document.createElement('p');
                adressedescription.textContent = lieux[testi].fields.contact;
                divdesc.appendChild(adressedescription);
                let descriptiondescription = document.createElement('p');
                descriptiondescription.textContent = lieux[testi].fields.infos;
                divdesc.appendChild(descriptiondescription);
                let boutonenregistrer = document.createElement('button');
                boutonenregistrer.id = "boutonenregistrer";
                boutonenregistrer.textContent = "Enregistrer";
                divbouton.appendChild(boutonenregistrer);
                let boutoncroix = document.createElement('img');
                boutoncroix.id = "croixfermer";
                boutoncroix.setAttribute('src','assets/image/Vector (4).png');
                divcroix.appendChild(boutoncroix);

                ////////////////////////////////
                restau.onclick = function(event) {
                    let target = event.target;
       
               
                    if (target.id == "croixfermer") {
                        target.parentElement.parentElement.remove();
                    } else if (target.id == "boutonenregistrer") {


                       const listeObjets = 'listeObjet';
                       const mesObjetsString = localStorage.getItem(listeObjets);
                       const mesObjets = JSON.parse(mesObjetsString) ?? [];
                      let titre = lieux[testi].fields.title;
                      let contact = lieux[testi].fields.contact;
                      let infos = lieux[testi].fields.infos;
                       const newObjet = { titre, contact, infos };

                       mesObjets.push(newObjet);

                       localStorage.setItem(listeObjets, JSON.stringify(mesObjets));


                        alert('Ce lieu à été ajouté aux favoris');
                    }
                }
         
            }

            
            }
            
        })  
        .catch((err) => console.log("Erreur de type : " + err))
        
//////////////////////////////////////////////////////////////////////////////

document.getElementById('favoris').addEventListener("click", verification);
document.getElementById('carte').addEventListener("click", affichercarte);

function affichercarte() {
    while (restau.firstChild) {
        restau.removeChild(restau.firstChild);
    }
}

function verification() {
    if (localStorage.length == 0) {
        alert('Pas de favoris, ajoutez un favoris et réésayez');
    } else {
        window.location.href = "test.html";
    }
}

restau.onclick = function(event) {
    let target = event.target;

    if (target.id == "croixfermer") {
        target.parentElement.parentElement.remove();
    }
}

console.log(localStorage);


