class categoria{
    constructor(nom, color) {
        this.nom = nom;
        this.color = color;
    }
    
    getColor() {
        return this.color;
    }

    getNom() {
        return this.nom;
    }

}

class Tasca{
    constructor(titol, descripcio, data, categoria, prioritat) {
        this.titol = titol;
        this.descripcio = descripcio;
        this.data = data;
        this.categoria = categoria;
        this.prioritat = prioritat;
    }

    getTitol() {
        return this.titol;
    }

    getDescripcio() {
        return this.descripcio;
    }

    getData() {
        return this.data;
    }

    getCategoria() {
        return this.categoria;
    }

    getPrioritat() {
        return this.prioritat;
    }
}