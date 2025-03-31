const axios = require('axios');
const cheerio = require('cheerio');

function LetradaMusica(musica) {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. Busca no Letras.com.br
            const { data } = await axios.get(`https://www.letras.com.br/`, {
                params: { q: musica },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const $ = cheerio.load(data);
            const resultado = {};

            // 2. Obtém o primeiro resultado
            const songLink = $('a.song-name').first().attr('href');
            if (!songLink) return reject('Música não encontrada');

            // 3. Busca a letra
            const { data: lyricData } = await axios.get(`https://www.letras.com.br${songLink}`);
            const $$ = cheerio.load(lyricData);

            // 4. Extrai os dados
            resultado.ImagemMusic = $$('div.cifra-header img').attr('src');
            resultado.LetraDaMusica = $$('div.cifra_cnt').text().trim();

            resolve(resultado);

        } catch (error) {
            reject(error.message || 'Erro ao buscar letra');
        }
    });
}

module.exports = { LetradaMusica };