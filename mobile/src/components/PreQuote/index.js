import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useAuth } from '../../hooks';
import styles from './styles';

const PreQuote = () => {
  const [preQuoteText, setPreQuoteText] = useState('');
  const { authState } = useAuth();

  const preQuoteRandomizer = () => {
    const preQuotes = [
      'Here\'s a great quote:',
      'Kanye West says:',
      `Hey ${authState.user.username}, check this quote:`,
      'Some words of wisdom:',
    ];
    // eslint-disable-next-line no-magic-numbers
    const randomIndex = Math.floor(Math.random() * (preQuotes.length - 0.1));

    return preQuotes[randomIndex];
  };

  useEffect(() => {
    if (preQuoteText === '') {
      setPreQuoteText(preQuoteRandomizer());
    }
  }, []);

  return (
    <Text style={styles.preQuoteText}>
      {preQuoteText}
    </Text>
  );
};

export default PreQuote;
