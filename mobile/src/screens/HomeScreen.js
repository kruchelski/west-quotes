// Basic Imports
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';



export default ({ navigation, route }) => {

	const { user, signOut } = useAuth();
	const handleSignout = async () => {
		signOut();
	}

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Text>{`Olá ${user.name} (${user.email})`}</Text>
			<Text>Home Screen</Text>
			<Button title="SignOut" onPress={() => handleSignout()} />
		</View>
	);
}