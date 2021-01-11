// Basic imports
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configs imports
import { server } from '../config/AxiosConfig';

// Services imports
import * as auth from '../services/AuthService';

// Basic object provided to the AuthContext
let authContextObject = {
	signed: false,			// User is logged
	signIn: null,				// SignIn Function
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
				const storageUser = await AsyncStorage.getItem('@west-quotes:user');
				const storageRefreshToken = await AsyncStorage.getItem('@west-quotes:refreshToken');
				
				if (!storageRefreshToken) {
					// If there isn't a token, set the user as null;
					setUser(null);

				} else {
					// In case there's a refresh token stored, tries to get a net access token
					const response; // TODO: make the request to the backend

					// Checks the content of response
					if (response?.accesToken) {
						// It there's a new token, set as default in the request header
						server.defaults.headers['Authorization'] = response.accessToken

						// Sets the user
						if (response?.user) {
							// Tries to get the user returned from the back end
							setUser(response.user);
							
							// Updates the storage with the user
							await AsyncStorage.setItem('@west-quotes:user', JSON.stringify(response.user));
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
	 * SignIn an user into the application
	 */
	const signIn = async () => {
		try {
			// Makes request to login
			const response = await auth.signIn();
			setUser(response.user);
	
			server.defaults.headers['Authorization'] = reponse.accessToken
			// Fazer isso na busca no async storage e onde mais for necessário
			// Verificar se não vai dar problema ter o authorization nas roatas que não precisa
	
			await AsyncStorage.setItem('@west-quotes:user', JSON.stringify(response.user));
			await AsyncStorage.setItem('@west-quotes:token', response.token);

		} catch (err) {

		}
	}

	/**
	 * SignOut an user of the application
	 */
	const signOut = async () => {
		await AsyncStorage.clear();
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
			signOut, 
			loading, 
			error: errorState
		}}>
			{ children }
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
}