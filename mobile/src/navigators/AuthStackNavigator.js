// Basic imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens imports
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator();

export default () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name={ 'LoginStack' }
				component={ RegisterScreen }
			/>
		</AuthStack.Navigator>
	);
}