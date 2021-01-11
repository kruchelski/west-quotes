// Basic imports
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';


// Navigators imports
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator'

const Navigators = () => {
	const { signed, loading } = useAuth();

	if (loading) {
		console.log('Tá carregando')
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		)
	}


	if (signed) {
		return <MainStackNavigator />
	}
	return (
		<AuthStackNavigator />
	);
}

export default Navigators;