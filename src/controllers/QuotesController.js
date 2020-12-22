// Entities
const api = require('../api/ApiService');
const apiHelper = require('../helpers/ApiHelper');

const generateQuote = async (req, res) => {
    try {
        // Promises array
        let promises = [];

        // Add requests to promises array
        promises.push(api.getQuote());
        promises.push(api.searchPhotos('kanye west'));

        // Await promises to complete
        const response = await Promise.all(promises);
        const [quote, photo] = response;

        // Return object
        res.json({quote, photo})
    } catch (err) {
        const parsedError = apiHelper.errorHandler(err);
        res.status(parsedError.status).send(parsedError.msg);
    }
}

module.exports = { generateQuote };