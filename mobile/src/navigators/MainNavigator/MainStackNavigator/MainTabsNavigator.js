import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QuotesListScreen, UserDetailsScreen } from '../../../screens';

const { Navigator, Screen } = createBottomTabNavigator();

const MainTabsNavigator = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 10,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        labelStyle: {
          marginLeft: 24,
          fontSize: 13,
        },
      }}
    >
      <Screen
        name="QuotesListScreen"
        component={QuotesListScreen}
        options={{ tabBarLabel: 'Quotes You Interacted With' }}
      />
      <Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{ tabBarLabel: 'Your Data' }}
      />
    </Navigator>
  );
};

export default MainTabsNavigator;
