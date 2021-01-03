// Basic imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens imports
import HomeScreen from '../screens/HomeScreen';
import QuoteScreen from '../screens/QuoteScreen';

const MainStack = createStackNavigator();

export default () => {
	return (
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
	);
}