// Basic imports
import axios from 'axios';

// TODO: Trocar por valores vindos do .env

/**
 * Creates an instance to make requests
 */
export const server = axios.create({
    baseURL: 'http://192.168.18.36:3002',
});

/**
 * Sets a default header for the requests
 * @param {*} header Header name (Authorization, e.g.)
 * @param {*} value Value for the header (Bearer token, e.g.)
 */
export const setDefaultHeaders = (header, value) => {
    server.defaults.headers[header] = value
}

/**
 * Removes a default header
 * @param {*} header Header to be removed
 */
export const removeDefaultHeader = (header) => {
    delete server.defaults.headers[header];
}