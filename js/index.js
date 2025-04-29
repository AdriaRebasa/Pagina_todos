function pintarTasques() {
    pendentsContainer.innerHTML = '';

    const ordrePrioritat = {
        'Alta': 1,
        'Mitjana': 2,
        'Baixa': 3
    };

    tasques.sort((a, b) => {
        const prioA = ordrePrioritat[a.prioritat];
        const prioB = ordrePrioritat[b.prioritat];
        if (prioA !== prioB) {
            return prioA - prioB;
        }
        return new Date(a.data) - new Date(b.data);
    });

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

document.addEventListener('DOMContentLoaded', function () {
    let tasques = JSON.parse(localStorage.getItem('tasques')) || [];
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let tasquesAcabades = JSON.parse(localStorage.getItem('tasques-acabades')) || [];
    
    const pendentsContainer = document.getElementById('tasques-pendents');
    const acabadesContainer = document.getElementById('tasques-acabades');
    
    function pintarTasques() {
        pendentsContainer.innerHTML = '';
    
        const ordrePrioritat = {
            'Alta': 1,
            'Mitjana': 2,
            'Baixa': 3
        };
    
        tasques.sort((a, b) => {
            const prioA = ordrePrioritat[a.prioritat];
            const prioB = ordrePrioritat[b.prioritat];
            if (prioA !== prioB) {
                return prioA - prioB;
            }
            return new Date(a.data) - new Date(b.data);
        });

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
    
        const ordrePrioritat = {
            'Alta': 1,
            'Mitjana': 2,
            'Baixa': 3
        };
    
        tasquesAcabades.sort((a, b) => {
            const prioA = ordrePrioritat[a.prioritat];
            const prioB = ordrePrioritat[b.prioritat];
            if (prioA !== prioB) {
                return prioA - prioB;
            }
            return new Date(a.data) - new Date(b.data);
        });

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

        tasquesAcabades.push(tasca);
        localStorage.setItem('tasques-acabades', JSON.stringify(tasquesAcabades));

        tasques.splice(index, 1);
        localStorage.setItem('tasques', JSON.stringify(tasques));

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
