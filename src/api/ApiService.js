const { flickr, kanye } = require('../configs/AxiosConfig');

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

    return response.data.quote;
}

/**
 * Search for photos in Flickr according to some term
 * @param {*} term Term for search
 */
const searchPhotos = async (term) => {
    // Make request
    const response = await flickr.get('/', { 
        params: {
            method: 'flickr.photos.search',
            text: term,
            per_page: 300,
        }
    })

    // Handle error
    if (response && 
        response.data.stat && 
        response.data.stat !== 'ok'
    ) {
        throw new Error('API-500-Unexpected error during request for photos')
    }

    // Handle photo data
    return handlePhotos(response.data);
}

/**
 * Handles the photo data to return a photo URL
 * @param {*} data Data from search photos request
 */
const handlePhotos = (data) => {

    // If there's no photos, return null
    if (!data || 
        !data.photos || 
        !data.photos.photo || 
        !data.photos.photo.length
    ) {
        return null;
    }

    // Generate random number to select on data from the array
    const index = Math.floor(Math.random() * data.photos.photo.length);

    // Retrieve info to make the photo url
    const {secret, id, server, farm} = data.photos.photo[index];

    // Return the photo URL
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

module.exports = { searchPhotos, getQuote };