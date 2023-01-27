let restau = document.getElementById('afficherfav');

let test = JSON.parse(localStorage.getItem('listeObjet'));

function afficherfavoris() {

    for (i=0;i<test.length;i++) {

    restau.innerHTML += `
    <div id="restaufav">
        <div class="emplacementphoto">
            <img src="../Starter kit/assets/image/photorestau.jpg" class="photo">
        </div>

        <div class="desc">
            <h2>${test[i].titre}</h2>
            <p>${test[i].contact}</p>
            <p>${test[i].infos}</p>
        </div>

        <div class="fermer">
            <img src="../Starter kit/assets/image/Vector (4).png" id="croixfermer">
        </div>
        
    </div>
    `;

 }
}

restau.onclick = function(event) {
    let target = event.target;

    if (target.id == "croixfermer") {
        target.parentElement.parentElement.remove();
        localStorage.clear();
    }
}

console.log(localStorage);

afficherfavoris();