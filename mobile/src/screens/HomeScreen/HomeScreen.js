import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks';
import { HttpService } from '../../services';

export default ({ navigation, route }) => {

	const { authState, signOut } = useAuth();

	const handleSignout = async () => {
		await signOut();
	}

	const handleGetQuote = async () => {
		try {
			const response = await HttpService.makeRequest('getQuote', null, null, true);
		} catch (err) {
			// TODO: Create an error handler
			console.log('[HomeScreen - handleGetQuote] ERROR!');
			console.log(err);
		}
	}

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Text>{`Olá ${authState?.user?.username || 'user'} (${authState?.user?.email || 'email '})`}</Text>
			<Text>Home Screen</Text>
			<Button title="GetQuote" onPress={() => handleGetQuote()} />
			<Button title="SignOut" onPress={() => handleSignout()} />
		</View>
	);
}