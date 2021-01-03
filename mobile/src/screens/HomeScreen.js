// Basic Imports
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

// Contexts Imports
import { AuthContext } from '../contexts/AuthContext';

export default ({ navigation, route }) => {

	const { signOut } = useContext(AuthContext);

	return (
		<View>
			<Text>Home Screen</Text>
			<Button title="SignOut" onPress={() => {signOut()}} />
		</View>
	);
}