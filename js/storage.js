document.getElementById('carregar-arxiu').addEventListener('click', () => {
    const nomArxiu = document.getElementById('input-nom-arxiu').value.trim();
    carregarTasquesDesDeArxiu(nomArxiu);
});


async function carregarTasquesDesDeArxiu(nomArxiu) {
    try {
        const resposta = await fetch(`dades/${nomArxiu}`);
        if (!resposta.ok) {
            throw new Error('No s\'ha pogut carregar l\'arxiu.');
        }

        const tasquesJSON = await resposta.json();

        let tasquesGuardades = JSON.parse(localStorage.getItem('tasques')) || [];
        let categoriesGuardades = JSON.parse(localStorage.getItem('categories')) || [];

        tasquesJSON.forEach(tascaNova => {
            // 1. Verificar si la categoria ja existeix
            const categoriaNova = tascaNova.categoria; // { nom: "Organització", color: "#f7df1e" }
            const jaExisteixCategoria = categoriesGuardades.some(categoriaGuardada => categoriaGuardada.nom === categoriaNova.nom);

            if (!jaExisteixCategoria) {
                categoriesGuardades.push(categoriaNova);
            }

            // 2. Verificar si la tasca ja existeix
            const jaExisteixTasca = tasquesGuardades.some(tascaGuardada => tascaGuardada.titol === tascaNova.titol);

            if (!jaExisteixTasca) {
                tasquesGuardades.push({
                    titol: tascaNova.titol,
                    descripcio: tascaNova.descripcio,
                    data: tascaNova.data,
                    categoria: categoriaNova.nom,   // Ara guardam només el nom aquí per ser consistents
                    prioritat: tascaNova.prioritat
                });
            }
        });

        // 3. Guardar actualitzacions
        localStorage.setItem('tasques', JSON.stringify(tasquesGuardades));
        localStorage.setItem('categories', JSON.stringify(categoriesGuardades));

        console.log('Tasques i categories carregades correctament');

        pintarTasquesPendents(); // Si vols, crides directament després

    } catch (error) {
        console.error('Error carregant tasques:', error);
    }
}
