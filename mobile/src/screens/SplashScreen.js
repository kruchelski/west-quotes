import * as React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

export default ({ navigation, route }) => {

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