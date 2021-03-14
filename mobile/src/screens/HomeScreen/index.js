import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useQuote } from '../../hooks';
import styles from './styles';
import {
  PreQuote,
  Quote,
  QuoteControl,
  QuoteImage,
  QuoteLove,
  QuoteStats,
  UserList,
  LoadingIndicator,
} from '../../components';

const HomeScreen = () => {
  const { quoteState, likeQuote, getQuote, quoteErrorHandler } = useQuote();
  const [loading, setLoading] = useState(false);
  const [loadingLikeQuote, setLoadingLikeQuote] = useState(false);

  useEffect(() => {
    const requestQuote = async () => {
      setLoading(true);
      try {
        await getQuote();
      } catch (err) {
        quoteErrorHandler(err, 'An error happened while trying to get a quote');
      } finally {
        setLoading(false);
      }
    };

    if (!quoteState?.quote?.quoteBody?.uuid) {
      requestQuote();
    }
  }, []);

  const handleQuoteLike = async () => {
    setLoadingLikeQuote(true);
    try {
      await likeQuote(quoteState.quote.quoteBody.uuid);
      setLoadingLikeQuote(false);
    } catch (err) {
      quoteErrorHandler(err, 'An error happened while tyring to like a quote');
      setLoadingLikeQuote(false);
    }
  };

  if (!quoteState?.quote?.quoteBody?.uuid || loading) {
    return (
      <LoadingIndicator loadingMessage='Loading quote' />
    );
  }

  const { image, quote } = quoteState;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PreQuote />

      <Quote quoteText={quote.quoteBody.text} />

      <QuoteControl
        actionHappened={quoteState.quoteLiked}
        loading={loadingLikeQuote}
        onPressCallback={handleQuoteLike}
        actionHappenedMsg='Liked!'
        severity='primary'
        icon='like1'
      />

      <View style={styles.infoContainer}>
        <QuoteImage quoteImage={image} />
        <QuoteLove quoteLove={quote.love} />
        <QuoteStats
          occurrences={quote.quoteBody.occurrences}
          likes={quote.quoteBody.likes}
          userLikes={quote.userLikes}
        />
        <UserList
          likers={quote.likers}
          newQuote={quote.new}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
