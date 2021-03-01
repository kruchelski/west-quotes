import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen, QuoteScreen } from '../screens';
import { DrawerContent } from '../components';
import { QuoteProvider } from '../contexts'
import { mainTheme } from '../constants';

const MainStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();

const mainStack = () => {
	return (
		<QuoteProvider>
			<MainStack.Navigator
				screenOptions={{
					headerTintColor: mainTheme.mainColor,
					headerStyle: {
						backgroundColor: mainTheme.bgColor0,
					},
					headerTitleStyle: {
						fontFamily: 'PTSans_400Regular',
						fontSize: 16
					}
				}}
			>
				<MainStack.Screen
					name={'HomeScreen'}
					component={HomeScreen}
				/>
				<MainStack.Screen
					name={'QuoteScreen'}
					component={QuoteScreen}
				/>
			</MainStack.Navigator>
		</QuoteProvider>
	);
}

export default () => {
	return (
		<MainDrawer.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<MainDrawer.Screen
				name={'Main'}
				component={mainStack}
			/>
		</MainDrawer.Navigator>
	);
}