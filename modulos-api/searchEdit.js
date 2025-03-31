//CREDITOS @ATROX.DEV (COPIA NÃO)
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const previouslySelectedLinksFile = 'selectedLinks.json';

async function getYoutubeLink(searchTerm) {
    try {
        const formattedSearchTerm = searchTerm.split(' ').join('+');
        const response = await axios.get(`https://www.youtube.com/results?search_query=${formattedSearchTerm}&sp=EgQYASAB`);

        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const jsonString = document.documentElement.innerHTML;
        const regex = /"url":"\/shorts\/([^"]+)"/g;
        let match, links = [];

        while ((match = regex.exec(jsonString)) !== null) {
            links.push(`https://www.youtube.com/shorts/${match[1]}`);
        }
        
        let linkFinal = null;
        if (links.length) {
            let previousLinks = [];
            if (fs.existsSync(previouslySelectedLinksFile)) {
                previousLinks = JSON.parse(fs.readFileSync(previouslySelectedLinksFile, 'utf8'));
            }
            let availableLinks = links.filter(link => !previousLinks.includes(link));
            
            if (availableLinks.length === 0) {
                availableLinks = links;
                previousLinks = [];
            }        
            // Pegue os primeiros 10 links e selecione um aleatoriamente
            const top10Links = availableLinks.slice(0, 10);
            let randomIndex = Math.floor(Math.random() * top10Links.length);

            linkFinal = top10Links[randomIndex];
            previousLinks.push(linkFinal);

            console.log(`LINK DO SHORTS ENCONTRADO: ${linkFinal}`);

            fs.writeFileSync(previouslySelectedLinksFile, JSON.stringify(previousLinks));
            setTimeout(() => {
                fs.writeFileSync(previouslySelectedLinksFile, JSON.stringify([]));
            }, 3 * 60 * 1000); // Limpar JSON após 3 minutos
        }

        return linkFinal;

    } catch (generalError) {
        console.error('Erro geral:', generalError);
        throw generalError; // Relance o erro para capturá-lo posteriormente
    }
}

module.exports = getYoutubeLink;

// Para testar
//(async () => {
//    const searchTerm = "Supra Edit";
//    const link = await getYoutubeLink(searchTerm);
//    console.log("Link obtido:", link);
//})();


//CREDITOS @ATROX.DEV / IG: @codm.atrox
//CREDITOS @ATROX.DEV / IG: @codm.atrox
//CREDITOS @ATROX.DEV / IG: @codm.atrox