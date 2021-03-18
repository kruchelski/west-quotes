import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './navigators';
import { AuthProvider } from './contexts';
import * as PTSansFonts from '@expo-google-fonts/pt-sans';
import * as NunitoFonts from '@expo-google-fonts/nunito';

const App = () => {
  const {
    PTSans_400Regular,        // eslint-disable-line camelcase
    PTSans_400Regular_Italic, // eslint-disable-line camelcase
    PTSans_700Bold,           // eslint-disable-line camelcase
    PTSans_700Bold_Italic,    // eslint-disable-line camelcase
  } = PTSansFonts;

  const {
    Nunito_400Regular,        // eslint-disable-line camelcase
    Nunito_400Regular_Italic, // eslint-disable-line camelcase
    Nunito_700Bold,           // eslint-disable-line camelcase
    Nunito_700Bold_Italic,    // eslint-disable-line camelcase
  } = NunitoFonts;

  const [ptsansFontsLoaded] = PTSansFonts.useFonts({
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  });
  const [nunitoFontsLoaded] = NunitoFonts.useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
  });

  if (!ptsansFontsLoaded || !nunitoFontsLoaded) {
    return (
      <View>
        <Text>
          Carregando
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigators />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
