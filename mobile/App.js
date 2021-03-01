import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';
import { AuthProvider } from './src/contexts';
// import {
// 	useFonts,
// 	PTSans_400Regular,
// 	PTSans_400Regular_Italic,
// 	PTSans_700Bold,
// 	PTSans_700Bold_Italic,
// } from '@expo-google-fonts/pt-sans';
import * as PTSansFonts from '@expo-google-fonts/pt-sans';
// import {
//   useFonts,
//   Nunito_400Regular,
//   Nunito_400Regular_Italic,
//   Nunito_700Bold,
//   Nunito_700Bold_Italic,
// } from '@expo-google-fonts/nunito';
import * as NunitoFonts from '@expo-google-fonts/nunito';

const App = () => {
	const { 
		PTSans_400Regular,
		PTSans_400Regular_Italic,
		PTSans_700Bold,
		PTSans_700Bold_Italic
	} = PTSansFonts;
	
	const {
		Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic
	} = NunitoFonts;

	let [ptsansFontsLoaded] = PTSansFonts.useFonts({
		PTSans_400Regular,
		PTSans_400Regular_Italic,
		PTSans_700Bold,
		PTSans_700Bold_Italic,
	})
	let [nunitoFontsLoaded] = NunitoFonts.useFonts ({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
	});


	if (!ptsansFontsLoaded || !nunitoFontsLoaded) {
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