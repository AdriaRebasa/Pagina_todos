document.addEventListener('DOMContentLoaded', function () {
    let tasques = JSON.parse(localStorage.getItem('tasques')) || [];
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let tasquesAcabades = JSON.parse(localStorage.getItem('tasques-acabades')) || [];

    const pendentsContainer = document.getElementById('tasques-pendents');
    const acabadesContainer = document.getElementById('tasques-acabades');

    function pintarTasques() {
        pendentsContainer.innerHTML = '';

        categories.forEach(categoria => {
            const style = document.createElement('style');
            style.textContent = `
                .categoria-${categoria.nom.toLowerCase().replace(/\s+/g, '-')} {
                    background-color: ${categoria.color};
                }
            `;
            document.head.appendChild(style);
        });

        tasques.forEach((tasca, index) => {
            const divTasca = document.createElement('div');
            divTasca.classList.add('tasca', tasca.prioritat.toLowerCase());

            const divTitol = document.createElement('div');
            divTitol.classList.add('titol');
    
            const strongTitol = document.createElement('strong');
            strongTitol.textContent = tasca.titol;
    
            const spanPrioritat = document.createElement('span');
            spanPrioritat.textContent = tasca.prioritat;
    
            divTitol.appendChild(strongTitol);
            divTitol.appendChild(spanPrioritat);

            const divCategoria = document.createElement('div');
            divCategoria.classList.add('categoria', `categoria-${tasca.categoria.toLowerCase().replace(/\s+/g, '-')}`);
            divCategoria.textContent = tasca.categoria;

            const divData = document.createElement('div');
            divData.classList.add('data');
            divData.textContent = tasca.data;

            const divDescripcio = document.createElement('div');
            divDescripcio.classList.add('descripcio');
            divDescripcio.textContent = tasca.descripcio;

            const divIcones = document.createElement('div');
            divIcones.classList.add('icones');
 
            const checkboxCompletat = document.createElement('input');
            checkboxCompletat.type = 'checkbox';
            checkboxCompletat.setAttribute('name', 'marcar-completat');
            checkboxCompletat.setAttribute('data-index', index);

            const botoEsborrar = document.createElement('button');
            botoEsborrar.classList.add('esborrar');
            botoEsborrar.setAttribute('data-index', index);
            botoEsborrar.textContent = '🗑️';
    
            divIcones.appendChild(checkboxCompletat);
            divIcones.appendChild(botoEsborrar);

            divTasca.appendChild(divTitol);
            divTasca.appendChild(divCategoria);
            divTasca.appendChild(divData);
            divTasca.appendChild(divDescripcio);
            divTasca.appendChild(divIcones);
    
            pendentsContainer.appendChild(divTasca);
        });
    
        activarEvents();
    }
    

    function pintarTasquesAcabades() {
        acabadesContainer.innerHTML = '';

        categories.forEach(categoria => {
            const style = document.createElement('style');
            style.textContent = `
                .categoria-${categoria.nom.toLowerCase().replace(/\s+/g, '-')} {
                    background-color: ${categoria.color};
                }
            `;
            document.head.appendChild(style);
        });

        tasquesAcabades.forEach((tasca, index) => {
            const divAcabada = document.createElement('div');
            divAcabada.classList.add('tasca', 'acabada');

            // Titol + Prioritat
            const divTitol = document.createElement('div');
            divTitol.classList.add('titol');

            const strongTitol = document.createElement('strong');
            strongTitol.style.textDecoration = 'line-through';
            strongTitol.textContent = tasca.titol;

            const spanPrioritat = document.createElement('span');
            spanPrioritat.textContent = tasca.prioritat;

            divTitol.appendChild(strongTitol);
            divTitol.appendChild(spanPrioritat);

            const divCategoria = document.createElement('div');
            divCategoria.classList.add('categoria', `categoria-${tasca.categoria.toLowerCase().replace(/\s+/g, '-')}`);
            divCategoria.textContent = tasca.categoria;

            const divData = document.createElement('div');
            divData.classList.add('data');
            divData.textContent = tasca.data;

            const divDescripcio = document.createElement('div');
            divDescripcio.classList.add('descripcio');
            divDescripcio.textContent = tasca.descripcio;

            const divIcones = document.createElement('div');
            divIcones.classList.add('icones');

            const checkboxCompletat = document.createElement('input');
            checkboxCompletat.type = 'checkbox';
            checkboxCompletat.checked = true;
            checkboxCompletat.disabled = true;
            checkboxCompletat.setAttribute('name', 'marcar-completat');
            checkboxCompletat.setAttribute('data-index', index);

            const botoEsborrar = document.createElement('button');
            botoEsborrar.classList.add('esborrar');
            botoEsborrar.setAttribute('data-index', index);
            botoEsborrar.textContent = '🗑️';

            divIcones.appendChild(checkboxCompletat);
            divIcones.appendChild(botoEsborrar);

            divAcabada.appendChild(divTitol);
            divAcabada.appendChild(divCategoria);
            divAcabada.appendChild(divData);
            divAcabada.appendChild(divDescripcio);
            divAcabada.appendChild(divIcones);

            acabadesContainer.appendChild(divAcabada);
        });

        activarEventsAcabades();
    }

    function activarEvents() {
        document.querySelectorAll('input[name="marcar-completat"]').forEach(input => {
            input.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                completarTasca(index);
            });
        });

        document.querySelectorAll('.esborrar').forEach(boto => {
            boto.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                eliminarTasca(index);
            });
        });
    }

    function activarEventsAcabades() {
        document.querySelectorAll('.esborrar').forEach(boto => {
            boto.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                eliminarTascaAcabada(index);
            });
        });
    }

    function completarTasca(index) {
        const tasca = tasques[index];

        // Afegir la tasca a l'array de tasques acabades
        tasquesAcabades.push(tasca);
        localStorage.setItem('tasques-acabades', JSON.stringify(tasquesAcabades));

        // Eliminar la tasca de l'array de pendents
        tasques.splice(index, 1);
        localStorage.setItem('tasques', JSON.stringify(tasques));

        // Repintar tant les pendents com les acabades
        pintarTasques();
        pintarTasquesAcabades();
        pintarGraficaTasques();
    }

    function eliminarTasca(index) {
        tasques.splice(index, 1);
        localStorage.setItem('tasques', JSON.stringify(tasques));
        pintarTasques();
    }

    function eliminarTascaAcabada(index) {
        tasquesAcabades.splice(index, 1);
        localStorage.setItem('tasques-acabades', JSON.stringify(tasquesAcabades));
        pintarTasquesAcabades();
        pintarGraficaTasques();
    }

    pintarTasques();

    pintarTasquesAcabades();
   

});
