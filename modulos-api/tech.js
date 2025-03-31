const axios = require('axios');
const cheerio = require('cheerio');

async function getTecMundoNews() {
  try {
    const url = 'https://www.tecmundo.com.br/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    console.log("Notícias do TecMundo:\n");

    $('h3.tec--card__title').each((i, element) => {
      const title = $(element).text().trim();
      console.log(`${i + 1}. ${title}\n`);
    });
  } catch (error) {
    console.error('Erro ao buscar as notícias:', error.message);
  }
}

module.exports = { getTecMundoNews };