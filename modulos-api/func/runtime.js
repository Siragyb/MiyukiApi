const axios = require('axios');
const fs = require('fs');
const moment = require("moment-timezone");
const { performance } = require('perf_hooks');
const os = require('os')
const Dias = JSON.parse(fs.readFileSync('./lib/secret/diasOnline.json'))[0].Dias;
var hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
var data = moment.tz("America/Sao_Paulo").format("DD/MM/YY");
var key = JSON.parse(fs.readFileSync("./lib/secret/keys.json"));

var horaUP = '02:09';
var dataUP = '08/10';
var updateApi = `\n\n🔄 Notas da Ultima Atualização 🔄
• Data: ${dataUP} • Hora: ${horaUP}\n• Correção da Api`

function ping() {
  const speed = require('performance-now');
  const timestampm = speed();
  const latency = speed() - timestampm;
  const ms = latency.toFixed(4);
    return ms
}

function muptime(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var days = Math.floor(seconds / (3600 * 24))
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
return 'Dias: ' + `${Dias}` + ' • ' + 'Horas: ' + pad(hours) + ' • ' + 'Minutos: ' + pad(minutes) + ' • ' + 'Segundos: ' +  pad(seconds)
}

async function runtime(apitoken) {
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
var old = performance.now();
var neww = performance.now();
var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`;
const totalreq  = JSON.parse(fs.readFileSync('./lib/secret/requests.json'))[0].totalreq;
const totalreqday  = JSON.parse(fs.readFileSync('./lib/secret/requests.json'))[0].totalreqday;
var resultado = {
    status: 'ONLINE!',
    uso_ram: ram,
    local: os.hostname,
    hora: hora,
    data: data, 
	NotaUpdate: updateApi,
    speed: ping(),
	suakey: key[ITC]?.request,
    keys: key.length,
    online: muptime(process.uptime()),
    requestTotal: totalreq, 
	requestHoje: totalreqday,
        info:{       
            owner: 'Pedrozz Mods',
            whatsapp: 'SEU LINK'
        }
}

return resultado
}

module.exports = { runtime }