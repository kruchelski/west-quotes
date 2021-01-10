// Basic Imports
import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

// Import Navigators
import Navigators from './src/navigators';

// Import Contexts
import { AuthContext } from './src/contexts/AuthContext';

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