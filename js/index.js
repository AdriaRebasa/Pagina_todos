document.addEventListener('DOMContentLoaded', function() {
    // Recuperar tasques i categories del localStorage
    let tasques = JSON.parse(localStorage.getItem('tasques'));
    let categories = JSON.parse(localStorage.getItem('categories'));

    // Contenidor on es pintaran les tasques
    const container = document.getElementById('tasques-pendents');

    tasques.forEach(tasca => {
        // Crear el div principal
        const divTasca = document.createElement('div');
        divTasca.classList.add('tasca', tasca.prioritat.toLowerCase());

        // Buscar el color de la categoria
        const categoriaTrobat = categories.find(c => c.nom === tasca.categoria);
        const colorCategoria = categoriaTrobat ? categoriaTrobat.color : '#cccccc'; // color per defecte

        // Construir l'HTML de la tasca
        divTasca.innerHTML = `
            <div class="titol">
                <strong>${tasca.titol}</strong>
                <span>${tasca.prioritat}</span>
            </div>
            <div class="categoria" style="background-color: ${colorCategoria}; padding: 2px 8px; border-radius: 4px; margin-top: 5px; color: white;">
                ${tasca.categoria}
            </div>
            <div class="data">${tasca.data}</div>
            <div class="descripcio">${tasca.descripcio}</div>
            <div class="icones">
                <input type="checkbox" name="marcar-completat">
                <button class="esborrar">🗑️</button>
            </div>
        `;

        // Afegir la tasca creada al contenidor
        container.appendChild(divTasca);
    });
});
