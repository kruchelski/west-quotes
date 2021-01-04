// Basic imports
import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

// Contexts imports
import { AuthContext } from '../contexts/AuthContext';

export default ({ navigation, route }) => {

	const { retrieveToken } = useContext(AuthContext);
	useEffect(() => {
		setTimeout(() => {
			// Implement: Search for refresh token in the async storage and try validate it
			retrieveToken();
		}, 2000)
	}, []);

	return (
		<View style={styles.container}>
			<Text>Splash Screen</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})