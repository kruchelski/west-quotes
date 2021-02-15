import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '../screens';

const AuthStack = createStackNavigator();

export default () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name={'LoginStack'}
				component={RegisterScreen}
			/>
		</AuthStack.Navigator>
	);
}