import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const Quote = ({ quoteText }) => {

  return (
    <Text
      style={styles.quoteText}
    >
      {`"${quoteText}"`}
    </Text>
  );
}

export default Quote;