const axios = require("axios");
const cheerio = require("cheerio");

async function getUrl(query) {
  try {
    const res = await axios.get(`https://www.myinstants.com/pt/search/?name=${encodeURIComponent(query)})`);
    const html = res.data;
    const $ = cheerio.load(html);

    const buttons = $('.small-button');
    if (buttons.length > 0) {
      const first = buttons.first().attr('onclick');
      const regex = /play\('([^']+)'/;
      const match = first.match(regex);
      if (match) {
        const audioURL = match[1];
        return 'https://www.myinstants.com' + audioURL;
      } else {
        return 'num achei o audio'
      }
    } else {
      return 'num achei botão';
    }
  } catch (error) {
    return error.message;
  }
}

async function download(query) {
  const audio = await getUrl(query)
  
  const response = await axios.get(audio, { responseType: "stream" })
  const writer = fs.createWriteStream("./audio.mp3")
  
  response.data.pipe(writer)
  
  return new Promise((resolve, reject) => { writer.on('finish', resolve); writer.on('error', reject); })
}

async function getLink(query) {
  const audioo = await getUrl(query)
  if(!audioo.includes('https://')) {
    return 'sem audio'
  }
  return {
    credits: "Dg$ cu de apito!",
    link: audioo
  }
}

module.exports = {
  getLink,
  download
}