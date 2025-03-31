//crie a rota pra essa scraper
const cheerio = require("cheerio");
const axios = require("axios");

async function stalkInstagram(username) {
    const url = `https://greatfon.io/v/${encodeURIComponent(username)}`;
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://greatfon.io',
            },
        });

        const $ = cheerio.load(data);
        const name = $('h1.text-4xl').text().trim() || 'Não encontrado';
        const bio = $('.items-top .text-sm').text().trim() || 'Sem bio';
        const totalPosts = $('.stat-title:contains("Posts")').siblings('.stat-value').text().trim() || '0';
        const totalFollowers = $('.stat-title:contains("Followers")').siblings('.stat-value').text().trim() || '0';
        const profilePicture = $('figure img').attr('src') || 'https://files.catbox.moe/nk2j63.jpg';

        return {
            name,
            bio,
            totalPosts,
            totalFollowers,
            profilePicture,
        };
    } catch (error) {
        throw new Error("Erro ao buscar dados. Verifique o nome de usuário e tente novamente.");
    }
}

module.exports = { stalkInstagram };