import { server } from '../config/RequestConfig';
import { ENDPOINTS } from '../constants/Requests';
import * as UserService from './UserService';

import { setDefaultHeaders } from '../config/RequestConfig';

export const makeRequest = async (endpoint, requestBody = null, params = null, retry = null) => {

	try {

		// Retrieves the information about the request
		const requestInfo = ENDPOINTS[endpoint];


		// Gets the client for the request
		const client = _getRequestFunction[requestInfo.type];

		// Gets the URL
		let url = requestInfo.url;

		// If there's params, add to the url
		if (requestInfo.params) {
			url = `${url}/${params}`;
		}

		// Sets custom headers
		let headers = null;
		if (requestInfo.headers) {
			headers = requestInfo.headers;
		}
		
		// Sets body
		let body = null;
		if (requestInfo.body) {
			body = requestBody;
		}

		// Makes the request
		return await client( url, body, headers);
	} catch (err) {
		console.log('[HTTP SERVICE ERROR] ', endpoint);
		console.log(JSON.stringify(err));
		if (err?.response?.status === 403 && retry) {
			return await tokenRenewal(endpoint, requestBody, params);
		} else {
			throw new Error(`[${err?.response?.status || 'Sem Status'}] ${err?.response?.data}`);
		}

	}

}

/**
 * Gets a new access token from the server
 * @param {*} callback A http request to call after getting the token (optional)
 * @param {*} body The body params of the http request (optional)
 * @param {*} params THe params of the http request (optional)
 */
export const tokenRenewal = async (callback = null, body = null, params = null) => {
	// Retrieves the refreshToken from the storage
	const refreshToken = await UserService.getRefreshTokenFromStorage();

	// If there's no refresh token, return null
	if (!refreshToken) {
		return null;
	}

	// If there's a token, try to refresh
	try {
		const requestInfo = ENDPOINTS['tokenRenewal'];
		const client = _getRequestFunction[requestInfo.type];
		const response = await client(requestInfo.url, { token: refreshToken });

		if (!response || !response.data || !response.data.accessToken) {
			return null;
		}

		// Set the new access token as the default Authorization
		setDefaultHeaders('Authorization', response.data.accessToken);

		// If it there's a callback, call it back
		if (callback) {
			return await makeRequest(callback, body, params, false);
		} else {
			return response;
		}
	} catch (err) {
		throw new Error(`[${err.response.status}] ${err.response.data}`);
	}
}

/**
 * Return a axios function according to the type of the request
 */
const _getRequestFunction = {
	get: server.get,
	post: server.post,
	put: server.put,
	delete: server.delete
}