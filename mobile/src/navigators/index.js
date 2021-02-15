import React, { useState } from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import { SplashScreen } from '../screens';
import { useAuth } from '../hooks';

const Navigators = () => {
	const { authState } = useAuth();
	const [loadingApp, setLoadingApp] = useState(true);

	if (loadingApp) {
		return <SplashScreen setLoadingApp={setLoadingApp} />
	}
	if (!authState.user) {
		return <AuthStackNavigator />
	}
	return <MainStackNavigator />

}

export default Navigators;