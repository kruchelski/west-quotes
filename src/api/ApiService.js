const { kanye, unsplash } = require('../config/AxiosConfig');

/**
 * Get a quote from kanye REST API
 */
const getQuote = async () => {
    // Make request
    const response = await kanye.get('/');

    // Handle error in response
    if (!response || 
        !response.data || 
        !response.data.quote
    ) {
        throw new Error('API-404-Quote not found');
    }

    // Return quote
    return response.data.quote;
}

/**
 * Search for images in Unsplash according to some query
 * @param {*} query Query params for the image search
 */
const getImage = async (query) => {

    console.log('Query: ', query);
    // Make request
    const response = await unsplash.get('search/photos', {
        params: {
            query
        }
    })

    // Handle errors
    if (response &&
        response.data &&
        response.data.errors &&
        response.data.errors.length &&
        response.data.errors[0]
    ) {
        if (response.errors[0].includes('OAuth error')) {
            throw new Error('API-403-Error authenticating to Unsplash')
        } else {
            throw new Error('API-500-Unexpected error during request for images')
        }
    }

    // Handle images
    if (!response ||
        !response.data ||
        !response.data.results ||
        !response.data.results.length) {
            return null;
    }

    // Gera um índice aleatório
    const i = Math.floor(Math.random() * response.data.results.length);

    // Retorna a url da imagem
    return response.data.results[i].urls.regular;
}

module.exports = { getQuote, getImage };