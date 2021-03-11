import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks';
import { mainTheme } from '../../constants'
import styles from './styles';

const Quote = ({ quoteText }) => {

  const { authState } = useAuth();

  const preQuoteRandomizer = () => {
    const preQuotes = [
      `Here's a great quote:`,
      `Kanye West says:`,
      `Hey ${authState.user.username}, check this quote:`,
      `Some words of wisdom:`
    ]
    const randomIndex = Math.floor(Math.random() * (preQuotes.length - 0.1));
    return preQuotes[randomIndex];
  }

  return (
    <>
      <Text
        style={styles.preQuoteText}
      >
        {preQuoteRandomizer()}
      </Text>
      <Text
        style={styles.quoteText}
      >
        {`"${quoteText}"`}
      </Text>
    </>
  );
}

export default Quote;