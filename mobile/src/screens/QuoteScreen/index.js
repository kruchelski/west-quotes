import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { HttpService } from '../../services';
import styles from './styles';
import {
  Quote,
  QuoteControl,
  QuoteLove,
  QuoteStats,
  UserList,
  LoadingIndicator,
} from '../../components';

const QuoteScreen = ({ route }) => {
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [error, setError] = useState(null);
  const [quoteRemoved, setQuoteRemoved] = useState(false);
  const [loadingRemoveQuote, setLoadingRemoveQuote] = useState(false);

  const handleRemoveQuote = async () => {
    setLoadingRemoveQuote(true);

    try {
      await HttpService.makeRequest(
        'dislikeQuote',
        null,
        quote.quoteBody.uuid,
        true,
      );
      setQuoteRemoved(true);
      setLoadingRemoveQuote(false);
    } catch (err) {
      const msg = err?.error
        || err?.message
        || "An unexpected error happened requesting quote's details";
      setError(msg);
      setLoadingRemoveQuote(false);
    }
  };

  useEffect(() => {
    const getQuoteDetail = async () => {
      setLoadingQuote(true);
      try {
        const quoteResponse = await HttpService.makeRequest(
          'getQuoteDetails',
          null,
          route.params.uuid,
          true,
        );
        setQuote(quoteResponse.data);
        setLoadingQuote(false);
      } catch (err) {
        const msg = err?.error
          || err?.message
          || "An unexpected error happened requesting quote's details";
        setError(msg);
        setLoadingQuote(false);
      }
    };

    getQuoteDetail();
  }, []);

  return (
    <Choose>
      <When condition={loadingQuote || !quote?.quoteBody?.uuid}>
        <LoadingIndicator loadingMessage="Loading quote's details" />
      </When>
      <When condition={error}>
        <Text style={styles.error}>
          {error}
        </Text>
      </When>
      <Otherwise>
        <ScrollView contentContainerStyle={styles.container}>
          <Quote quoteText={quote.quoteBody.text} />

          <View style={styles.infoContainer}>
            <QuoteLove quoteLove={quote.love} />
            <QuoteStats
              occurrences={quote.quoteBody.occurrences}
              likes={quote.quoteBody.likes}
              userLikes={quote.userLikes}
            />

            <View style={{ height: 20 }} />
            <QuoteControl
              actionHappened={quoteRemoved}
              loading={loadingRemoveQuote}
              onPressCallback={handleRemoveQuote}
              actionHappenedMsg='Disliked!'
              severity='danger'
              icon='dislike1'
            />

            <View style={{ height: 30 }} />
            <UserList
              likers={quote.likers}
              newQuote={false}
            />
          </View>
        </ScrollView>
      </Otherwise>
    </Choose>
  );
};

export default QuoteScreen;
