// Basic imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, QuoteScreen } from '../screens';
import { AuthProvider } from '../contexts';

const MainStack = createStackNavigator();

export default () => {
	return (
		<AuthProvider>
			<MainStack.Navigator>
				<MainStack.Screen
					name={'HomeScreen'}
					component={ HomeScreen }
				/>
				<MainStack.Screen
					name={'QuoteScreen'}
					component={ QuoteScreen }
				/>
			</MainStack.Navigator>
		</AuthProvider>
	);
}