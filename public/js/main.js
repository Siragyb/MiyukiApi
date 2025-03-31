__path = process.cwd()

var express = require('express');
var router = express.Router();

const totalreq = JSON.parse(fs.readFileSync('./lib/secret/requests.json'))[0].totalreq;
document.getElementById("totalreq").textContent=totalreq

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/home.html')
})
router.get('/docs', (req, res) => {
    res.sendFile(__path + '/views/docs.html')
})

router.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : '/',
            namabot: 'FUCK YOU',
            namaowner: 'FALSO DEV',
            instagram: 'FALSO DEVS',
            youtube : 'FALSO Dev'
        }
    }
    res.json(config)
})

module.exports = router