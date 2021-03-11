import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

const QuoteImage = ({ quoteImage }) => {
  return (
    <View
      style={styles.imageContainer}
    >
      <Image source={{ uri: quoteImage }} style={styles.image} resizeMode='contain' />
    </View>
  );
}

export default QuoteImage;