import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '../screens';
import { AuthProvider } from '../contexts';

const AuthStack = createStackNavigator();

export default () => {
	return (
		<AuthProvider>
			<AuthStack.Navigator>
				<AuthStack.Screen
					name={ 'LoginStack' }
					component={ RegisterScreen }
				/>
			</AuthStack.Navigator>
		</AuthProvider>
	);
}