var AccessConfig = {
  features: 1, //Quantidade De Apis Funcionando
}


// Apikey
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
document.getElementById("randomkey").textContent="Developers30"
document.getElementById("feature").textContent=`${AccessConfig.features}`


// Visitor
// Ip Address
window.setTimeout("getip()",1000);
function getip(){
  var danzz=new XMLHttpRequest();
  var url='https://api.ipify.org?format=json';
  danzz.onloadend=function(){
  data=JSON.parse(this.responseText);
  document.getElementById("ip").textContent=data.ip
};
danzz.open("GET",url,true);
danzz.send();
}

// Date
myMonths = ["Janeiro ","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
myDays = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado'];
var tgl = new Date();
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
ThisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy;

const tanggal = `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`

document.getElementById("Years").innerHTML = year;

document.getElementById("Date").innerHTML = tanggal;

// Count Time
var countDownDate = new Date("Jul 10, 2022 00:00:00").getTime();

// Time
let clock=document.querySelector('div#Clock');
let saying=document.querySelector('div#Saying');
setInterval(()=>{
var widthdeVicewidthXinitialscalesHrinkno=new Date();
const Jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const menit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Menit = widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Detik = widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const detik= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const jaM= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const mEnit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const detIk= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);

// Saying Time
if(Jam<6){saying.innerHTML="Boa Madrugada";}else
if(jam<12){saying.innerHTML="Bom Dia";}else 
if(Jam<18){saying.innerHTML="Boa Tarde";}else 
{saying.innerHTML="Boa Noite";}
clock.innerHTML=jaM+":"+mEnit+":"+detIk},250);
