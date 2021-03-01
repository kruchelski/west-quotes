import React, { useEffect } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { logo } from '../../assets';
import { mainTheme } from '../../constants';
import { useAuth } from '../../hooks';

const SplashScreen = ({ setLoadingApp }) => {

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
			<Image source={ logo } style={ styles.logoImage } />
			<ActivityIndicator size="large" color={ mainTheme.primary } />
		</View>
	)
}

export default SplashScreen;