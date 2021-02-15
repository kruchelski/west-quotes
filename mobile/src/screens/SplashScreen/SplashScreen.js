import React, { useEffect } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Logo } from '../../assets';
import { mainTheme } from '../../constants';
import { useAuth } from '../../hooks';

const SplashScreen = ({ setLoadingApp }) => {

	const welcomeMessage = 'OMG! Some awesome quotes from Kanye West right into your phone!'
	const { loadStorageData, errorHandler } = useAuth();

	useEffect(() => {
		const autoSignInWithStoredToken = async () => {
			try {
				await loadStorageData();
			} catch (err) {
			
				errorHandler(
					err, 
					'An unexpected error happened whilte trying to authenticate with stored token'
				)
			} finally {
				setTimeout(() => {
					setLoadingApp(false);
				}, 3500);
			}
		}

		autoSignInWithStoredToken();
	}, [])

	return (
		<View style={ styles.container }>
			<Image source={ Logo } style={ styles.logoImage } />
			<ActivityIndicator size="large" color={ mainTheme.mainColor } />
			<Text style={ styles.text }>
				{ welcomeMessage }
			</Text>
		</View>
	)
}

export default SplashScreen;