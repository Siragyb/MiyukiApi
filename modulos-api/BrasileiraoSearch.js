const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function BrasileiraoSearch() { //by @AtroxDev
    try {
        const { data } = await axios.get('https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/2023');
        const $ = cheerio.load(data);
        let teams = [];

        try {
            const rows = $('#menu-panel > article > div:nth-of-type(1) > div > div > section > div:nth-of-type(1) > table > tbody > tr');
            
            rows.each((i, row) => {
                const cells = $(row).find('td, th');
                const teamName = cells.eq(0).find('span.hidden-xs').text();
                if(teamName) {
                    teams.push({
                        equipe: teamName,
                        pontos: cells.eq(1).text() || '0',
                        jogosJogados: cells.eq(2).text() || '0',
                    });
                }
            });

            // Salvar os dados em JSON (opcional)
            if (teams.length > 0) {
                fs.writeFileSync('./lib/tabela.json', JSON.stringify(teams, null, 2), 'utf-8');
            } else {
                throw new Error('Nenhum time foi raspado com sucesso.');
            }
            
        } catch (error) {
            console.error('Erro durante a raspagem:', error);
        }
        return teams; //retorna os dados

    } catch (error) {
        console.error('Erro durante a raspagem:', error);
    }
}

module.exports = { BrasileiraoSearch }



// CRIADO POR @AtroxDev //  @AtroxDev  // @AtroxDev  // @AtroxDev  // @AtroxDev 