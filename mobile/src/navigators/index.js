import React, { useState, useContext } from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import { SplashScreen } from '../screens';
import { AuthContext } from '../contexts';

const Navigators = () => {
	const authContext = useContext(AuthContext);
	const [loadingApp, setLoadingApp] = useState(true);

	if (loadingApp) {
		return (
			<SplashScreen setLoadingApp={ setLoadingApp } />
		)
	} else {
		if (!!authContext.state.user) {
			return <AuthStackNavigator />
		}
		return <MainStackNavigator />
	}
}

export default Navigators;