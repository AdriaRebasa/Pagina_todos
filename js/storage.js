document.getElementById('carregar-arxiu').addEventListener('click',async () => {
    const nomArxiu = document.getElementById('input-nom-arxiu').value.trim();
    await carregarTasquesDesDeArxiu(nomArxiu);
    pintarTasquesPendents();
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

            const categoriaNova = tascaNova.categoria; 
            const jaExisteixCategoria = categoriesGuardades.some(categoriaGuardada => categoriaGuardada.nom === categoriaNova.nom);

            if (!jaExisteixCategoria) {
                categoriesGuardades.push(categoriaNova);
            }

            const jaExisteixTasca = tasquesGuardades.some(tascaGuardada => tascaGuardada.titol === tascaNova.titol);

            if (!jaExisteixTasca) {
                tasquesGuardades.push({
                    titol: tascaNova.titol,
                    descripcio: tascaNova.descripcio,
                    data: tascaNova.data,
                    categoria: categoriaNova.nom,  
                    prioritat: tascaNova.prioritat
                });
            }
        });

        localStorage.setItem('tasques', JSON.stringify(tasquesGuardades));
        localStorage.setItem('categories', JSON.stringify(categoriesGuardades));

        console.log('Tasques i categories carregades correctament');

    } catch (error) {
        console.error('Error carregant tasques:', error);
    }
}
