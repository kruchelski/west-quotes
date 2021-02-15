// Basic Imports
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Services Imports
import * as httpService from '../services/HttpService';


export default ({ navigation, route }) => {

	const { user, signOut } = useAuth();
	const handleSignout = async () => {
		await signOut();
	}

	const handleGetQuote = async () => {
		try {
			const response = await httpService.makeRequest('getQuote', null, null, true);
			console.log(response.data);
		} catch (err) {
			console.log('[HomeScreen - handleGetQuote] ERROR!');
			console.log(err);
		}
	}

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Text>{`Olá ${user.username} (${user.email})`}</Text>
			<Text>Home Screen</Text>
			<Button title="GetQuote" onPress={() => handleGetQuote()} />
			<Button title="SignOut" onPress={() => handleSignout()} />
		</View>
	);
}