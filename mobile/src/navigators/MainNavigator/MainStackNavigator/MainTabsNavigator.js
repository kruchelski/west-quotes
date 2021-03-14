import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QuotesListScreen, UserDetailsScreen } from '../../../screens';
import { mainTheme } from '../../../constants';

const { Navigator, Screen } = createBottomTabNavigator();

const MainTabsNavigator = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 10,
          height: 48,
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
        activeTintColor: mainTheme.primary,
        inactiveTintColor: mainTheme.fgColor2,
      }}
    >
      <Screen
        name="QuotesListScreen"
        component={QuotesListScreen}
        options={{ tabBarLabel: 'Quotes Liked' }}
      />
      <Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{ tabBarLabel: 'User Data' }}
      />
    </Navigator>
  );
};

export default MainTabsNavigator;
