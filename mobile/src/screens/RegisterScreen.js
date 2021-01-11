// Basic imports
// import { sign } from 'jsonwebtoken';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Sevices imports
import { signIn } from '../services/AuthService';

export default ({ navigation, route }) => {

	const { signed, signIn, user } = useAuth();

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