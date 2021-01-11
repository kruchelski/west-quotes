// Basic Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Import Navigators
import Navigators from './src/navigators';

// Import Providers
import { AuthProvider } from './src/contexts/AuthContext';

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