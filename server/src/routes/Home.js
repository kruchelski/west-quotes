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

module.exports = router;
