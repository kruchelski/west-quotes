// Entities
const api = require('../api/ApiService');
const ErrorHelper = require('../helpers/ErrorHelper');

/**
 * Generates a quote
 * @param {*} req Request object
 * @param {*} res Response object
 */
const generateQuote = async (req, res) => {
    try {
        // Request a quote
        const quote = await api.getQuote();

        // Split the quote 
        const splitedQuoted = quote.split(' ');

        // Generates random indexes based on the quote length
        const index1 = Math.floor(Math.random() * splitedQuoted.length);
        const index2 = Math.floor(Math.random() * splitedQuoted.length);

        // Request an image based on two words from the quote
        const image = await api.getImage(`${splitedQuoted[index1]} ${splitedQuoted[index2]}`);

        // Return object
        res.json({quote, image})
    } catch (err) {
        const parsedError = ErrorHelper.apiErrorHandler(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

module.exports = { generateQuote };