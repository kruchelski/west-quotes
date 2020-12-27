// Entities
const api = require('../api/ApiService');
const ErrorHelper = require('../helpers/ErrorHelper');
const QuoteHelper = require('../helpers/QuoteHelper');

/**
 * Generates a quote
 * @param {*} req Request object
 * @param {*} res Response object
 */
const generateQuote = async (req, res) => {
    try {
        let promises = []
        // Request a quote
        const quoteRaw = await api.getQuote();

        // Split the quote 
        const splitedQuoted = quoteRaw.split(' ');

        // Generates random indexes based on the quote length
        const index1 = Math.floor(Math.random() * splitedQuoted.length);
        const index2 = Math.floor(Math.random() * splitedQuoted.length);

        // Extract quote fragment for image search
        const imageQuery = `${splitedQuoted[index1]} ${splitedQuoted[index2]}`

        // Get quote metadata
        promises.push(QuoteHelper.getQuoteMetadata(quoteRaw, req.user.uuid));
        
        // Request an image based on two words from the quote
        promises.push(api.getImage(imageQuery));

        const response = await Promise.all(promises);

        const [quote, image] = response;
        // Return object
        res.json({quote, image, imageQuery})
    } catch (err) {
        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

module.exports = { generateQuote };