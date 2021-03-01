import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';
import { AuthProvider } from './src/contexts';
import {
	useFonts,
	PTSans_400Regular,
	PTSans_400Regular_Italic,
	PTSans_700Bold,
	PTSans_700Bold_Italic,
} from '@expo-google-fonts/pt-sans';

const App = () => {
	let [fontsLoaded] = useFonts({
		PTSans_400Regular,
		PTSans_400Regular_Italic,
		PTSans_700Bold,
		PTSans_700Bold_Italic,
	});

	if (!fontsLoaded) {
		return (
			<View>
				<Text>
					Carregando
        </Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			<AuthProvider>
				<Navigators />
			</AuthProvider>
		</NavigationContainer>
	)
}

export default App;