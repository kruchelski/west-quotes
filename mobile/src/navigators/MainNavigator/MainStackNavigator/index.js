import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, QuoteScreen } from '../../../screens';
import MainTabsNavigator from './MainTabsNavigator';
import { QuoteProvider } from '../../../contexts';
import { mainTheme, appFonts } from '../../../constants';

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <QuoteProvider>
      <Navigator
        screenOptions={{
          headerTintColor: mainTheme.primary,
          headerStyle: {
            backgroundColor: mainTheme.bgColor0,
          },
          headerTitleStyle: {
            fontFamily: appFonts.regular,
            fontSize: 16,
          },
        }}
      >
        <Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'West Quotes' }}
        />
        <Screen
          name="QuoteScreen"
          component={QuoteScreen}
          options={{ title: 'Quote detail' }}
        />
        <Screen
          name="UserStuffScreen"
          component={MainTabsNavigator}
          options={{ title: 'My Stuff' }}
        />
      </Navigator>
    </QuoteProvider>
  );
};

export default MainStackNavigator;
