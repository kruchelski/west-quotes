// Basic imports
import React, { createContext, useState, useEffect, useContext } from 'react';

// Configs imports
import { setDefaultHeaders, removeDefaultHeader } from '../config/RequestConfig';

// Services imports
import * as auth from '../services/AuthService';
import * as tokenService from '../services/TokenService';

// Basic object provided to the AuthContext
let authContextObject = {
	signed: false,			// User is logged
	signIn: null,				// SignIn Function
	signUp: null,				// SignUp Function
	signOut: null,			// SignOut Function
	loading: true,			// App is loading (retrieving possible refresh token stored)
	error: {
		state: false,
		msg: ''
	},
	user: {							// User
		uuid: '',
		username: '',
		email: '',
	}
}

/**
 * AuthContext main object
 */
export const AuthContext = createContext(authContextObject);

/**
 * Provider for the components
 * @param {*} param0 Components inside AuthContext.Provider
 */
export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorState, setErrorState] = useState(authContextObject.error);

	useEffect(() => {

		// Function to load stored data 
		const loadStorageData = async () => {
			try {
				// Retrieves the user and the refreshToken from the localStorage
				const storageUser = await tokenService.getUser();
				const storageRefreshToken = await tokenService.getRefreshToken();

				if (!storageRefreshToken) {
					// If there isn't a token, set the user as null;
					setUser(null);

				} else {
					// In case there's a refresh token stored, tries to get a net access token
					const response; // TODO: make the request to the backend

					// Checks the content of response
					if (response?.accesToken) {
						// // It there's a new token, set as default in the request header
						// server.defaults.headers['Authorization'] = response.accessToken

						// Sets the user
						if (response?.user) {
							// Tries to get the user returned from the back end
							setUser(response.user);

							// Updates the storage with the user
							await tokenService.setUser(response.user);

						} else if (storageUser) {
							// If no user returned from the back end, tries to get the user from the async storage
							setUser(JSON.parse(storageUser));
						} else {
							// If no user is found, set an error state
							setErrorState({ state: true, msg: 'No user stored or in the database' });
							setUser(null);
						}
					} else {
						// If the backend does not return an access Token, set an error state
						setUser(null);
						setErrorState({ state: true, msg: 'No access token provided from the server' });
					}
				}
			} catch (err) {
				// In case any error happens
				console.log('[AuthContext - loadStorageData] ERROR!'); // TODO: temp
				console.log(err)																			 // TODO: temp
				setUser(null);
				setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened' })
			} finally {
				setLoading(false);
			}
		}

		// Calls the function to get the info from user
		loadStorageData();
	})

	/**
	 * Sign In an user in the application
	 * @param {*} email Email of the user
	 * @param {*} password Password
	 */
	const signIn = async (email, password) => {
		try {
			// Show loader
			setLoading(true);

			// Makes request to login
			const response = await auth.signIn(); // TODO: Change to the correct endpoint

			// If the response is missing some data then set as error
			if (!response || !response.user || !response.accesToken || !response.refreshToken) {
				setUser(null);
				setErrorState({ state: true, msg: 'Missing authentication data from the server' })

			} else {

				// Saves the user and the refresh token in the async storage
				await tokenService.setUser(response.user);
				await tokenService.setRefreshToken(response.refreshToken);

				// Sets the default header
				setDefaultHeaders('Authorization', response.accessToken);

				// Sets the user
				setUser(response.user);
			}

		} catch (err) {
			// In case any error happens
			console.log('[AuthContext - signIn] ERROR!'); // TODO: temp
			console.log(err)																			 // TODO: temp
			setUser(null);
			setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signIn' })
		} finally {
			setLoading(false);
		}
	}

	/**
	 * Register a new user into the system
	 * @param {*} username User's username
	 * @param {*} email User's email
	 * @param {*} password User's password
	 */
	const signUp = async (username, email, password) => {
		try {
			// Show loader
			setLoading(true);

			// Makes the request to register an user
			const response; // TODO: Set correct endpoint to signup

			// If there's missing data in the response set user as null and se an error
			if (!response || !response.uuid) {
				setUser(null);
				setErrorState({ state: true, msg: 'Missing register data from the server' })

			} else {

				// Calls the signIn function
				await signIn(email, password);
			}
		} catch (err) {

			// In case any error happens
			console.log('[AuthContext - signUp] ERROR!'); // TODO: temp
			console.log(err)																			 // TODO: temp
			setUser(null);
			setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signUp' })
		} finally {

			// Hide loader
			setLoading(false);
		}
	}

	/**
	 * SignOut an user of the application
	 */
	const signOut = async () => {
		try {
			
			// Show loader
			setLoading(true);

			// Makes request to logout user
			// TODO: write the request here

			// Clear the storage
			await tokenService.clearStorage();

			// Remove default Authorization header
			removeDefaultHeader('Authorization');

			// Sets the user as null
			setUser(null);

		} catch (err) {

				// In case any error happens
				console.log('[AuthContext - signOut] ERROR!'); // TODO: temp
				console.log(err)																			 // TODO: temp
				setUser(null);
				setErrorState({ state: true, msg: err.error || err.message || 'An unexpected error happened in the signIn' })
		
		} finally {

			// Hide loader
			setLoading(false);
		}
		await tokenService.clearStorage();
		setUser(null);
	}

	// Updates the authContextObject
	authContextObject.signIn = signIn;
	authContextObject.signOut = signOut;

	return (
		<AuthContext.Provider value={{
			signed: !!user,
			user,
			signIn,
			signUp,
			signOut,
			loading,
			error: errorState
		}}>
			{ children}
		</AuthContext.Provider>
	)
}

/**
 * Returns the AuthContext for usage
 */
export const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
}