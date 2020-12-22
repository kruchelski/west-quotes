// Entities
const QuotesController = require('../controllers/QuotesController');
const api = require('../api/ApiService');
const express = require('express');
const router = express.Router();

router.get('/quote', async (req, res) => QuotesController.generateQuote(req, res));

router.get('/', (req, res) => {
    res.status(200).send('Issoo');
})

router.get('/quoteOld', async (req, res) => {
    try {
        const quote = await api.getQuote();
        return res.json({quote})
    } catch (err) {
        console.log(err);
        if (err && err.message && err.message.includes('API')) {
            const error = err.message.split('-');
            res.status(parseInt(error[1])).send(error[2]);
        } else {
            res.status(500).send('An unexpected error happened getting quote');
        }
    }
})

router.get('/teste', async (req, res) => {
    try {
        const photoUrl = await api.searchPhotos('kanye west');
        return res.json({photoUrl});
    } catch (err) {
        console.log(err);
        if (err && err.message && err.message.includes('API')) {
            const error = err.message.split('-');
            res.status(parseInt(error[1])).send(error[2]);
        } else {
            res.status(500).send('An unexpected error happened')
        }
    }
})

module.exports = router;