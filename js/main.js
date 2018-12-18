
var data = {
    fila: 15,
    tme: SecToHora('300'),
    tma: SecToHora('276'),
    chamMaisAntiga: DecimalToHora("0"),
    agntLogados: 16
}; //#endregion
new Vue({
    el: '#app',
    data: data
});




var csvDados = parserDados('GET', './js/dados.csv', false);
var dados = csvDados.responseText;
var dadosLinhas = dados.split('\n');
var dadosHeader = dadosLinhas[0].split(';');
dadosLinhas.shift();
//console.log(dadosHeader.length);
//console.log(dadosLinhas.length);
var dados = [];
for(var i = 0; i<5; i++) {
    var obj = {};
    var valores = [];
    for(var j = 0; j<24; j++){
        var colunas = dadosLinhas[j].split(';');
        valores.push(colunas[i]);    
    }
    obj[dadosHeader[i]] = valores;
    dados.push(obj)
}

var dadosjson = JSON.stringify(dados);
dadosjson = JSON.parse(dadosjson);
var output = dadosjson.map(function(inObj) {
    return {
        "hora": inObj.hora,
        "NS": inObj.NS,
        "NsPrevisto": inObj.NsPrevisto,
        "tme": inObj.tme,
        "tma": inObj.tma
    }
});
var tbHra = dadosjson[0].hora
console.log(tbHra);


var eixo = dados[0]['hora'];
var ns = dados[1]['NS'].map(function(item, index){
    return item.replace(',', '.');
});
var nsPrevisto = dados[2]['NsPrevisto'].map(function(item, index){
    return item.replace(',', '.');
});
var tme = dados[2]['tme'];
var tma = dados[3]['tma'];
var hc = dados[4]['hc'];
//console.log(tma);
var teste = csvDados.responseText;
teste = teste.split('\n');
var testeLabels = teste[0].split(';');
var testeDados = teste[1].split(';');
testeLabels.shift();
testeDados.shift();

var nsTeste = {
    labels: testeLabels,
    datasets: [{
        backgroundColor: [
            'rgba(0, 150, 255,0.4)',
            'rgba(150, 0, 255,0.4)',
            'rgba(0, 150, 255,0.4)',
            'rgba(150, 0, 255,0.4)' 
        ],
        borderColor: '#00AAFF',
        borderWidth: 1,
        label: "Indicadores",
        data: testeDados
    }]
}

var dNs = {
    labels: eixo,
    datasets: [{
        borderColor: 'rgba(200,10,10,1)',
        backgroundColor: 'rgba(0,0,0,.0)',
        label: "NS Previsto",
        data: nsPrevisto
    }, {
        borderColor: 'rgba(0,140,255,1)',
        backgroundColor: 'rgba(0,140,255,.4)',
        label: "NS",
        data: ns
        //yAxisID: 'porcentagem'
    }]
}

var OpNs = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            gridLines: false,
            ticks: {
                display: false,
                beginAtZero: true,
                stepSize: .4,
                max: 1.2
            }
        }]
    }
}

var dTme = {
    labels: dados[0]['hora'],
    datasets: [{
        backgroundColor: random_rgba(),
        label: "TME",
        data: tme
        //yAxisID: 'porcentagem'
    }]
}

var dVolume = {
    labels: dados[0]['hora'],
    datasets: [{
        backgroundColor: random_rgba(),
        label: "VOLUME",
        data: tme
        //yAxisID: 'porcentagem'
    }]
}

var nsDados = {
    labels: dados[0]['hora'],
     datasets: [{
         backgroundColor: [
            'rgba(10, 50, 100,0.4)',
            'rgba(150, 0, 255,0.4)',
            'rgba(0, 150, 255,0.4)',
            'rgba(150, 0, 255,0.4)' 
         ],
         borderColor: '#00AAFF',
         borderWidth: 1,
         label: "NS",
         data: dados
     }]
 };



//Chart.defaults.scale.ticks.beginAtZero = true

var ServiceLevel = document.getElementById("chartNs").getContext("2d");
ServiceLevel = new Chart(ServiceLevel, {
    type: 'line',
    data: dNs,
    options: OpNs
});
// var tme = document.getElementById("chartTme").getContext("2d");
// tme = new Chart(tme, {
//     type: 'line',
//     data: dTme,
// });

// var volume = document.getElementById("chartVolume").getContext("2d");
// volume = new Chart(volume, {
//     type: 'line',
//     data: dVolume,
// });
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


function parserDados(metodo, strPath, async){
    var dataCsv = new XMLHttpRequest();
    dataCsv.open(metodo, strPath, async);
    dataCsv.onreadystatechange = function() {
        objeto = dataCsv.responseText;
    }
    dataCsv.send();

    return dataCsv;
}


//index para resgatar do cms
//0 - 2 - 3 - 4 - 5 - 7 - 8 - 9 - 10 - 11 - 13 - 15 - 16 - 17

function DecimalToHora(strHora){
var decimalTimeString = strHora;
decimalTimeString = decimalTimeString.replace(',','.');
var decimalTime = parseFloat(decimalTimeString);
//decimalTime = decimalTime /86400;
var decimalTime = decimalTime * 86400;

//decimalTime = decimalTime * 60 * 60;
var hours = Math.floor((decimalTime / (60 * 60)));
decimalTime = decimalTime - (hours * 60 * 60);
var minutes = Math.floor((decimalTime / 60));
//var toHora = minutes;
decimalTime = decimalTime - (minutes * 60);
var seconds = Math.round(decimalTime);
if(hours < 10)
{
	hours = "0" + hours;
}
if(minutes < 10)
{
	minutes = "0" + minutes;
}
if(seconds < 10)
{
	seconds = "0" + seconds;
}

return "" + hours + ":" + minutes + ":" + seconds;
}

function SecToHora(strHora){
    var decimalTimeString = strHora;
    decimalTimeString = decimalTimeString.replace(',','.');
    var decimalTime = parseFloat(decimalTimeString);
    //decimalTime = decimalTime /86400;
    //var decimalTime = decimalTime * 86400;
    
    //decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes = Math.floor((decimalTime / 60));
    //var toHora = minutes;
    decimalTime = decimalTime - (minutes * 60);
    var seconds = Math.round(decimalTime);
    if(hours < 10)
    {
        hours = "0" + hours;
    }
    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }
    if(seconds < 10)
    {
        seconds = "0" + seconds;
    }
    
    return "" + hours + ":" + minutes + ":" + seconds;
    }