import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '../../screens';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
	return (
		<Navigator>
			<Screen
				name="LoginStack"
				component={RegisterScreen}
				options={{ header: () => null }}
			/>
		</Navigator>
	);
}

export default AuthNavigator
