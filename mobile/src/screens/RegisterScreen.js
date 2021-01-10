// Basic imports
// import { sign } from 'jsonwebtoken';
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

// Contexts imports
import { AuthContext } from '../contexts/AuthContext';

// Sevices imports
import { signIn } from '../services/AuthService';

export default ({ navigation, route }) => {

	const { signed, signIn, user } = useContext(AuthContext);

	console.log(signed);
	console.log(user);

	const handleSignIn = async () => {
		signIn();
	}

	return (
		<View>
			<Text>Register Screen</Text>
			<Button title={'SIGNUP'} onPress={() => {handleSignIn()}} />
			<Button title={'SIGNIN'} onPress={() => { }} />
		</View>
	);
}