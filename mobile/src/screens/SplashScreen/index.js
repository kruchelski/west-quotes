import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { LoadingIndicator } from '../../components';
import styles from './styles';
import { logo } from '../../assets';
import { useAuth } from '../../hooks';

const SplashScreen = ({ setLoadingApp }) => {
  const { loadStorageData, errorHandler } = useAuth();

  useEffect(() => {
    const autoSignInWithStoredToken = async () => {
      try {
        await loadStorageData();
      } catch (err) {

        errorHandler(
          err,
          'An unexpected error happened whilte trying to authenticate with stored token',
        );
      } finally {
        setTimeout(() => {
          setLoadingApp(false);
        }, 1500);
      }
    };

    autoSignInWithStoredToken();
  }, []);

  const loadingMessageRandomizer = () => {
    const preQuotes = [
      'Loading app',
      'Replacing a flat tire in app',
      'Checking the fabric of the space-time continuum',
      'Contacting Kanye West directly',
      'Sharing data with the FBI',
      'Wooba looba dub dub',
      '01010000 01101111 01101100 01100101 01101110 01110100 01100001',
    ];
    const randomIndex = Math.floor(Math.random() * (preQuotes.length - 0.1));

    return preQuotes[randomIndex];
  };

  return (
    <View style={ styles.container }>
      <Image source={ logo } style={ styles.logoImage } />
      <LoadingIndicator loadingMessage={loadingMessageRandomizer()} />
    </View>
  );
};

export default SplashScreen;
