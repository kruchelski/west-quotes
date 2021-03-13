import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from 'react-native'
import { QuoteList, LoadingIndicator } from '../../components';
import { HttpService } from '../../services';
import styles from './styles'

const QuotesListScreen = ({ navigation }) => {
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [error, setError] = useState(null);

  const handleQuoteSelect = (uuid) => {
    navigation.navigate('QuoteScreen', {
      uuid
    })
  }

  useFocusEffect(
    useCallback(() => {
      console.log('Loading list')
      const getQuotesList = async () => {
        setLoadingQuotes(true);
        try {
          const quotesResponse = await HttpService.makeRequest(
            'getAllQuotes',
            null,
            null,
            true
          );
          setQuotes(quotesResponse.data);
          setLoadingQuotes(false);
        } catch (err) {
          const msg = err?.error ||
            err?.message ||
            'An unexpected error happened requesting quotes list'
          setError(msg)
          setLoadingQuotes(false);
        }
      }

      getQuotesList();
    }, [])
  )

  if (loadingQuotes) {
    return (
      <LoadingIndicator loadingMessage='Loading liked quotes' />
    )
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          The quotes you liked
        </Text>
        {
          !!error &&
          <Text
            style={styles.error}
          >
            {error}
          </Text>
        }
        <QuoteList
          quotes={quotes}
          onQuoteSelect={handleQuoteSelect}
        />
      </View>
    )
  }
}

export default QuotesListScreen
