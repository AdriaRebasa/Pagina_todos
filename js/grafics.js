let graficaTasques;

function pintarGraficaTasques() {
    const tasquesAcabades = JSON.parse(localStorage.getItem('tasques-acabades')) || [];

    const comptadorMesos = {
        '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0,
        '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0
    };

    tasquesAcabades.forEach(tasca => {
        const dataParts = tasca.data.split('-');
        const mes = dataParts[1];
        comptadorMesos[mes]++;
    });

    const nomsMesos = [
        "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
        "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
    ];

    const mesosOrdre = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const dades = mesosOrdre.map(mes => comptadorMesos[mes]);

    const ctx = document.getElementById('grafica-tasques').getContext('2d');

    if (graficaTasques) {
        graficaTasques.destroy();
    }

    graficaTasques = new Chart(ctx, {
        type: 'line',
        data: {
            labels: nomsMesos,
            datasets: [{
                label: 'Tasques realitzades',
                data: dades,
                borderColor: '#2f7df6',
                backgroundColor: 'rgba(47, 127, 246, 0)',
                fill: true,
                tension: 0,
                pointBackgroundColor: '#2f7df6'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mes'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nombre de tasques'
                    },
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', pintarGraficaTasques);
