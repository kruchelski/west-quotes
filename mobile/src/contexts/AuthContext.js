import React, { createContext, useState } from 'react';
import * as auth from '../services/AuthService';

let authContextObject = {
	signed: false,
	signIn: null,
	user: {
		name: '',
		email: '',
		uuid: '',
	}
}

export const AuthContext = createContext(authContextObject);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const signIn = async () => {
		const response = await auth.signIn();

		setUser(response.user);

	}
	authContextObject.signIn = signIn;
	return (
		<AuthContext.Provider value={{ signed: !!user, user, signIn}}>
			{ children}
		</AuthContext.Provider>
	)
} 