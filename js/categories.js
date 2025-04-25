let categories = [];

const botoAfegir = document.querySelector('button');
const inputNom = document.getElementById('categoria');
const inputColor = document.getElementById('color');
const llistaCategories = document.getElementById('categoria-llista');

window.onload = () => {
    const dadesGuardades = localStorage.getItem('categories');
    if (dadesGuardades) {
        categories = JSON.parse(dadesGuardades);
        mostrarCategories();
    }
};

botoAfegir.addEventListener('click', () => {
    const nom = inputNom.value.trim();
    const color = inputColor.value;

    if (nom === '') {
        alert('Introdueix un nom de categoria!');
        return;
    }

    if (categories.some(cat => cat.nom.toLowerCase() === nom.toLowerCase())) {
        alert('Aquesta categoria ja existeix!');
        return;
    }

    const novaCategoria = { nom, color };
    categories.push(novaCategoria);
    guardarICarregar();
    inputNom.value = '';
});

function mostrarCategories() {
    const contenidor = document.getElementById('categories');
    contenidor.innerHTML = ''; 
  
    categories.forEach((cat, index) => {
      const categoriaBox = document.createElement('div');
      categoriaBox.classList.add('categoriaBox');
  
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('infoDiv');
  
      const cercleColor = document.createElement('div');
      cercleColor.classList.add('cercleColor');
      cercleColor.style.backgroundColor = cat.color;
  
      const nom = document.createElement('span');
      nom.textContent = cat.nom;
      nom.classList.add('spanSize');
  
      infoDiv.appendChild(cercleColor);
      infoDiv.appendChild(nom);
  
      const botoEliminar = document.createElement('button');
      botoEliminar.textContent = 'Eliminar';
      botoEliminar.classList.add('botoEliminar');
      botoEliminar.onclick = () => eliminarCategoria(index);
  
      categoriaBox.appendChild(infoDiv);
      categoriaBox.appendChild(botoEliminar);
  
      contenidor.appendChild(categoriaBox);
    });
  }
  

function eliminarCategoria(index) {
    categories.splice(index, 1);
    guardarICarregar();
}

function guardarICarregar() {
    localStorage.setItem('categories', JSON.stringify(categories));
    mostrarCategories();
}

