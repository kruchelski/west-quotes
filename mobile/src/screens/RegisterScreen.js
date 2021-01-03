// Basic imports
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

// Contexts imports
import { AuthContext } from '../contexts/AuthContext';

export default ({ navigation, route }) => {

	const { signIn, signUp } = useContext(AuthContext);

	return (
		<View>
			<Text>Register Screen</Text>
			<Button title={'SIGNUP'} onPress={() => signUp()} />
			<Button title={'SIGNIN'} onPress={() => signIn()} />
		</View>
	);
}