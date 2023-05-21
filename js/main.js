const runTime = document.getElementById("tempCorrent");
const carbon = document.getElementById("carbono");
const price = document.getElementById("preco");


//const [tab] = chrome.tabs.query({active: true, currentWindow: true});

// Registrar o tempo de abertura do navegador
var startTime = new Date();

// Função para atualizar o tempo decorrido
function updateTime() {
    var currentTime = new Date();
    var startTime = localStorage.getItem('startTime');
    if (!startTime) {
        startTime = currentTime;
        localStorage.setItem('startTime', startTime);
    }
    var elapsedSeconds = Math.round((currentTime - new Date(startTime)) / 1000);

    // Calcula o número de horas, minutos e segundos
    var horas = Math.round(elapsedSeconds / 3600);
    var minutos = Math.round((elapsedSeconds % 3600) / 60);
    var segundos = elapsedSeconds % 60;

    console.log("horas " + horas + " minutos " + (minutos/100))

    // Formata o resultado no formato de horas (HH:MM:SS)
    var resultadoFormatado = horas.toString().padStart(2, '0') + ':' +
        minutos.toString().padStart(2, '0') + ':' +
        segundos.toString().padStart(2, '0');

    runTime.innerText = `${resultadoFormatado}`

//conversor de carbonização.

let gasto
if(horas <= 0){
    gasto =  65 * (minutos / 100)
} else {
    gasto = 65 * (horas + (minutos / 100))
}

let kWh =  gasto / 1000
let CO = 0.0817 * kWh
carbon.innerText = `${(CO).toFixed(6)}`
price.innerText = `${(CO * 10).toFixed(2)}`

// Função para limpar o tempo no localStorage
window.addEventListener('beforeunload', function() {
    // Calcular o tempo decorrido até o momento atual
    var currentTime = new Date();
    var elapsedSeconds = Math.round((currentTime - new Date(startTime)) / 1000);
});
}
setInterval(updateTime, 1000);