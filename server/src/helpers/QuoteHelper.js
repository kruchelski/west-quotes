// Libraries
const { Op } = require('sequelize');

// Entities
const { UserQuote, Quote, User } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');

/**
 * Generates metadata for a brand new quote
 * @param {*} text Quote text
 * @param {*} transaction Transaction object
 */
const generateNewQuoteMetadata = async (text, transaction) => {
  // Insert new quote into the database
  const newData = {
    new: true,
    love: 0.00,
    userLikes: 0,
    likers: [],
  };
  newData.quoteBody = await Quote.create({
    text,
  }, { transaction });

  // Return object
  return newData;
};

/**
 * Calculates the metadata for the existing quote
 * @param {*} quoteRaw Database record of the quote
 * @param {*} userUuid Logged user's uuid
 * @param {*} transaction Transaction objecf
 */
const calculateQuoteMetadata = async (quoteRaw, userUuid, transaction) => {
  const newData = {
    quoteBody: quoteRaw.toJSON(),
  };

  // Set newData.new to false
  newData.new = false;

  // Check if user already liked quote
  const userQuote = await UserQuote.findOne({
    where: {
      uuid_user: userUuid,
      uuid_quote: quoteRaw.uuid,
    },
  }, { transaction });

  // Set userLikes according to query result
  if (!userQuote) {
    newData.userLikes = 0;
  } else {
    newData.userLikes = userQuote.likes;
  }

  // Calculates quote's love
  newData.love = newData.quoteBody.likes
    ? Number(((newData.quoteBody.likes / newData.quoteBody.occurrences) * 100.00).toFixed(2))
    : 0;

  // Initialize likers array
  newData.likers = [];

  // Get other users that liked the quote
  newData.likers = await User.findAll({
    attributes: ['uuid', 'username', 'email'],
    include: {
      model: UserQuote,
      where: {
        uuid_quote: quoteRaw.uuid,
        uuid_user: {
          [Op.ne]: userUuid,
        },
      },
      order: [['likes', 'DESC']],
    },
    limit: 10,
  }, { transaction });

  // Return object
  return newData;
};

/**
 * Gets a metadata associated with a quote
 * @param {*} text Quote's text
 * @param {*} userUuid Logged user's uuid
 */
const getQuoteMetadata = async (text, userUuid) => {
  let quoteData;

  // Retrieve transaction object
  const transaction = await sequelize.transaction();

  try {
    // Verifies if the quote already exists in the database
    const quoteRaw = await Quote.findOne({
      where: {
        text,
      },
    }, { transaction });

    // If not found then create a new one
    if (!quoteRaw) {
      // Generates metadata
      quoteData = await generateNewQuoteMetadata(text, transaction);
    } else {
      // Update ocurrence times
      quoteRaw.occurrences += 1;

      // Retrieve metadata
      quoteData = await calculateQuoteMetadata(quoteRaw, userUuid, transaction);

      await quoteRaw.save({ transaction });
    }

    // Commit transactions
    await transaction.commit();

    // Return object
    return quoteData;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

module.exports = { getQuoteMetadata, calculateQuoteMetadata };
