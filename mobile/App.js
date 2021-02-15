import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigators';
import { AuthProvider } from './src/contexts';

const App = () => {
	return (
		<NavigationContainer>
			<AuthProvider>
				<Navigators />
			</AuthProvider>
		</NavigationContainer>
	)
}

export default App;