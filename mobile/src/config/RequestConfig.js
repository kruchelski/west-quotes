import axios from 'axios';
import Constants from 'expo-constants';

const { API_URL } = Constants.manifest.extra;

/**
 * Creates an instance to make requests
 */
export const server = axios.create({
  baseURL: API_URL,
});

/**
 * Sets a default header for the requests
 * @param {*} header Header name (Authorization, e.g.)
 * @param {*} value Value for the header (Bearer token, e.g.)
 */
export const setDefaultHeaders = (header, value) => {
  server.defaults.headers[header] = value;
};

/**
 * Removes a default header
 * @param {*} header Header to be removed
 */
export const removeDefaultHeader = (header) => {
  delete server.defaults.headers[header];
};
