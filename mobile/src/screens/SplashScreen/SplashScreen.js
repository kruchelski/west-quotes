import React, { useEffect, useContext } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Logo } from '../../assets';
import { mainTheme } from '../../constants';
import { AuthContext } from '../../contexts';

const SplashScreen = ({ setLoadingApp }) => {

	const authContext = useContext(AuthContext);
	const welcomeMessage = 'OMG! Some awesome quotes from Kanye West right into your phone!'

	useEffect(() => {
		const autoSignInWithStoredToken = async () => {
			try {
				await authContext.loadStorageData();
			} catch (err) {
				authContext.errorHandler(
					err, 
					'An unexpected error happened whilte trying to authenticate with stored token'
				)
			} finally {
				setTimeout(() => {
					setLoadingApp(false);
				}, 1500);
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