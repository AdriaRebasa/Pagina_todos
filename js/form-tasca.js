let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

document.addEventListener("DOMContentLoaded", () => {

    const selectCategoria = document.getElementById("categoriaSelect");

    selectCategoria.innerHTML = ' ';

    const categoriesGuardades = JSON.parse(localStorage.getItem("categories")) || [];

    categoriesGuardades.forEach(cat => {
        if (cat.nom && cat.nom.trim() !== "") {
            const opcio = document.createElement("option");
            opcio.value = cat.nom;
            opcio.textContent = cat.nom;
            selectCategoria.appendChild(opcio);
        }
    });


});

const avui = new Date().toISOString().split("T")[0];
const botoAfegir = document.querySelector('button');

botoAfegir.addEventListener("click", () => {

    const titol = document.getElementById("titol").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoriaSelect").value;
    const prioritat = document.getElementById("prioritat").value;

    if (titol === "") {
        alert("El títol és obligatori.");
        return;
    }
    if (descripcio === "") {
        alert("La descripció es obligatòria.");
        return;
    }
    if (data === "" || data < avui) {
        alert("Has de seleccionar una fecha.");
        return;
    }
    if (!categoria) {
        alert("Has de seleccionar una categoria.");
        return;
    }
    if (!prioritat) {
        alert("Has de seleccionar una prioritat.");
        return;
    }

    const novaTasca = {
        titol,
        descripcio,
        data,
        categoria,
        prioritat
    };

    tasques.push(novaTasca);
    localStorage.setItem("tasques", JSON.stringify(tasques));

    document.getElementById("formulari-tasca").reset();

});



