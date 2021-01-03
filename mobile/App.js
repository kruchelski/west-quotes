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

const RootStack = createStackNavigator();

export default function App({ navigation }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        console.log(action)
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'SIGN_IN':
        console.log(action)
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'SIGN_UP':
        console.log(action)
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'SIGN_OUT':
        console.log(action)
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'RETRIEVE_TOKEN', token: 'Loading Token' })
    }, 2000)
  }, []);

  const authContext = useMemo(() => ({
    signIn: () => {
      console.log('Signing In')
      // setUserToken('token');
      // setIsLoading(false);
      let userToken = 'tokenzinho'
      dispatch({ type: 'SIGN_IN', token: userToken })
    },
    signOut: () => {
      console.log('Signing Out')
      // setUserToken(null);
      // setIsLoading(false);
      dispatch({ type: 'SIGN_OUT' })
    },
    signUp: () => {
      console.log('Signing Up')
      // setUserToken('token');
      // setIsLoading(false);
      let userToken = 'tokenzinho'
      dispatch({ type: 'SIGN_UP', token: userToken })

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
            loginState.isLoading ?
              (
                <RootStack.Screen name="Splash" component={SplashScreen} />
              ) :
              !loginState.userToken ?
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
