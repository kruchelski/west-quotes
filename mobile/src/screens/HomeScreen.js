// Basic Imports
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

// Contexts Imports
import { AuthContext } from '../contexts/AuthContext';

export default ({ navigation, route }) => {

	const { user } = useContext(AuthContext);

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Text>{`Olá ${user.name} (${user.email})`}</Text>
			<Text>Home Screen</Text>
			<Button title="SignOut" onPress={() => {}} />
		</View>
	);
}