// Entities
const axios = require('axios');
require('dotenv').config();

// Initialization

/**
 * Flickr API instance
 */
const flickr = axios.create({
    baseURL: 'https://api.flickr.com/services/rest/',
    params: {
        api_key: process.env.FLICKR_API_KEY,
        format: 'json',
        nojsoncallback: '1',
    }
})

/**
 * Kanye REST API instance
 */
const kanye = axios.create({
    baseURL: 'https://api.kanye.rest/'
})

module.exports = { flickr, kanye };