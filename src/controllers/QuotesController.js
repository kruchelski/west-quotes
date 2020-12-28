// Entities
const api = require('../api/ApiService');
const { Quote, UserQuote } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');
const QuoteError = require('../errors/QuoteError');

// Helpers
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
        res.json({ quote, image, imageQuery })
    } catch (err) {
        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

/**
 * Like a quote represented by the UUID passed in the req.body
 * @param {*} req Request object
 * @param {*} res Response object
 */
const likeQuote = async (req, res) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();

    try {
        // Retrieve quote UUID from the req
        const quoteUuid = req.body.uuid;

        // If there's no UUID, throw QuoteError
        if (!quoteUuid) {
            throw new QuoteError('Error in the request to like quote', 400, "Quote's UUID");
        }

        // Retrieve Quote from database
        let quote = await Quote.findByPk(quoteUuid, { transaction });

        // If quote is not found throw QuoteError
        if (!quote) {
            throw new QuoteError('Error accessing quote record to like it', 404, 'Quote record');
        }

        // Adjust likes
        quote.likes += 1;

        // Save quote
        await quote.save({ transaction });

        // Find or create a record of the UserQuote
        let [userQuote, created] = await UserQuote.findOrCreate(
            {
                where: {
                    uuid_user: req.user.uuid,
                    uuid_quote: quoteUuid
                },
                transaction
            }

        );

        // If found, adjust the likes number
        if (!created) {
            userQuote.likes += 1;

            // If found, save the instance
            await userQuote.save({ transaction });
        }

        // Commit
        await transaction.commit();

        // Return succes
        res.status(204).send();
    } catch (err) {
        await transaction.rollback();

        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

module.exports = { generateQuote, likeQuote };