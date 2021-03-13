import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { mainTheme } from '../../constants';
import styles from './styles';

const LoadingIndicator = ({ loadingMessage }) => {
  return (
    <View
      style={styles.loadingContainer}
    >
      {
        !!loadingMessage &&
        <Text
          style={styles.loadingMessage}
        >
          {loadingMessage}
      </Text>
      }
      <ActivityIndicator size="large" color={mainTheme.primary} />
    </View>
  )
}

export default LoadingIndicator;