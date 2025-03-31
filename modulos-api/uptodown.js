const axios = require("axios"); 
 const cheerio = require('cheerio');
 
 const GetPage = async(url) => { 
  return new Promise (async (resolve, reject) => { 
   try{ 
 data = await axios({ 
 method: 'GET', 
 url: url, 
 }); 
 return resolve(data.data) 
   } catch(erro){ 
  return reject(erro)   
   } 
   }) 
}

const Uptodown = async(Nome)=>{
  return new Promise (async (resolve, reject) => {
  try{
	Search = await axios({
	method: 'POST',
	url: "https://br.uptodown.com/android/search",
	headers: {
		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
		"cache-control": "max-age=0",
		"content-type": "application/x-www-form-urlencoded",
		"sec-ch-ua": "\"Opera GX\";v=\"93\", \"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"107\"",
		"sec-ch-ua-mobile": "?1",
		"sec-ch-ua-platform": "\"Android\"",
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "same-origin",
		"sec-fetch-user": "?1",
		"upgrade-insecure-requests": "1",
		"Referer": "https://br.uptodown.com/android",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	 },
  data: 'q='+Nome
});
    $ = cheerio.load(Search.data)
	Rp = $('body').find('#content-list > div:nth-child(1)').find('figure').attr('onclick').split(';')[0].split(`'`)[1]

	PageUptodown = await GetPage(Rp+'/download')	
	$ = cheerio.load(PageUptodown)
	infos = {
		Nome: $('body').find('#detail-app-name').text().trim(),
		LinkApk:  $('body').find('#detail-download-button').attr('data-url'),
		Tamanho:  $('body').find('#detail-download-button > p.size').text(),
		Pacote:  $('body').find('#technical-information > table > tbody > tr.full > td:nth-child(3)').text(),
		Data:  $('body').find('body > div.content > section:nth-child(16) > table > tbody > tr:nth-child(7) > td:nth-child(3)').text(),
		Autor:  $('body').find('body > div.content > section:nth-child(16) > table > tbody > tr:nth-child(3) > td:nth-child(3) > a').text().trim()	
	}
	return resolve(infos)
  } catch(erro){ return reject(erro) }
 })
}

module.exports = { Uptodown }