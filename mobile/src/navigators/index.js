import React, { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { SplashScreen } from '../screens';
import { useAuth } from '../hooks';

const Navigators = () => {
	const { authState } = useAuth();
	const [loadingApp, setLoadingApp] = useState(true);

  return (
    <Choose>
      <When condition={loadingApp}>
        <SplashScreen setLoadingApp={setLoadingApp} />
      </When>
      <When condition={authState.user}>
        <MainNavigator />
      </When>
      <Otherwise>
        <AuthNavigator />
      </Otherwise>
    </Choose>
  )
}

export default Navigators;
