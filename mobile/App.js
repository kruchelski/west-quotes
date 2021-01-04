// Basic Imports
import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/contexts/AuthContext';

// Navigators imports
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import MainStackNavigator from './src/navigators/MainStackNavigator'

// Screens imports
import SplashScreen from './src/screens/SplashScreen';

// Reducers imports
import { initialAuthState, authReducer } from './src/reducers/AuthReducer';

const RootStack = createStackNavigator();

export default function App({ navigation }) {

  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    setTimeout(() => {
      // Implement: Search for refresh token in the async storage and try validate it
      dispatch({ type: 'RETRIEVE_TOKEN', refreshToken: 'Loading Token' })
    }, 2000)
  }, []);

  const authContext = useMemo(() => ({
    signIn: () => {
      // Implement: Sign in existent user
      console.log('Signing In')
      dispatch({ 
        type: 'SIGN_IN', 
        accessToken: 'SignIn accessToken',
        refreshToken: 'SignIn refreshToken',
        username: 'SignIn username',
        email: 'SignIn email'
      })
    },
    signOut: () => {
      // Signout user
      console.log('Signing Out')
      dispatch({ 
        type: 'SIGN_OUT',
      })
    },
    signUp: () => {
      // Register a new user in the application
      console.log('Signing Up')
      dispatch({ 
        type: 'SIGN_UP',
        accessToken: 'SignUp accessToken',
        refreshToken: 'SignUp refreshToken',
        username: 'SignUp username',
        email: 'SignUp email'
      })

    }
  }), [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={
            { headerShown: false }
          }
        >
          {
            authState.isLoading ?
              (
                <RootStack.Screen name="Splash" component={SplashScreen} />
              ) :
              !authState.refreshToken ?
                (
                  <RootStack.Screen

                    name="Auth Stack"
                    component={AuthStackNavigator}
                  />
                ) :
                (
                  <RootStack.Screen
                    name="Main Stack"
                    component={MainStackNavigator}
                  />
                )
          }
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}

/**
 * <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
            Stack navigators
          </RootStack.Navigator>
 */
