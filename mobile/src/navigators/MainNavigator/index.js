import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainStackNavigator from './MainStackNavigator'
import { DrawerContent } from '../../components';

const { Navigator, Screen } = createDrawerNavigator();

const MainNavigator = () => {
  return (
		<Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Screen
				name="Main"
				component={MainStackNavigator}
			/>
		</Navigator>
  )
}

export default MainNavigator
