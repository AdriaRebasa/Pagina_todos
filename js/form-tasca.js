document.addEventListener("DOMContentLoaded", () => {
    const selectCategoria = document.getElementById("categoriaSelect");
    const formulari = document.getElementById("formulari-tasca");

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

    formulari.addEventListener("submit", (e) => {
        e.preventDefault();

        const titol = document.getElementById("titol").value.trim();
        const descripcio = document.getElementById("descripcio").value.trim();
        const data = document.getElementById("data").value;
        const categoria = document.getElementById("categoria").value;
        const prioritat = document.getElementById("prioritat").value;

        if (!titol) {
            alert("El títol és obligatori.");
            return;
        }
        if (!descripcio) {
            alert("La descripció es obligatòria.");
            return;
        }
        if (!data) {
            alert("La data és obligatòria.");
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

        const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
        tasques.push(novaTasca);
        localStorage.setItem("tasques", JSON.stringify(tasques));

        formulari.reset();

        alert("Tasca creada correctament!");
    });

});