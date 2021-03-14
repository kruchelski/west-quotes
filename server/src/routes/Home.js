// Libraries
const express = require('express');
const router = express.Router();

// Entities
const QuotesController = require('../controllers/QuotesController');
const api = require('../api/ApiService');

// Middlewares
const { authenticate } = require('../middlewares/AuthMiddlewares');

/**
 * Get a quote and an image
 */
router.get('/', authenticate, async (req, res) => QuotesController.generateQuote(req, res));

router.get('/quoteOld', async (req, res) => {
  try {
    const quote = await api.getQuote();

    return res.json({ quote });
  } catch (err) {
    if (err && err.message && err.message.includes('API')) {
      const error = err.message.split('-');
      res.status(parseInt(error[1])).send(error[2]);
    } else {
      res.status(500).send('An unexpected error happened getting quote');
    }
  }
});

router.get('/teste', async (req, res) => {
  try {
    const photoUrl = await api.searchPhotos('kanye west');

    return res.json({ photoUrl });
  } catch (err) {
    if (err && err.message && err.message.includes('API')) {
      const error = err.message.split('-');
      res.status(parseInt(error[1])).send(error[2]);
    } else {
      res.status(500).send('An unexpected error happened');
    }
  }
});

module.exports = router;
