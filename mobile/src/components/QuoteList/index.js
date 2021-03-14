import React from 'react';
import { View, Text, FlatList } from 'react-native';
import QuoteListItem from '../QuoteListItem';
import styles from './styles';

const QuoteList = ({ quotes, onQuoteSelect }) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={quotes}
      keyExtractor={(_, index) => `list-item-${index}`}
      ListEmptyComponent={() => {
        return (
          <View>
            <Text style={styles.error}>
              You haven't liked any quotes so far
            </Text>
          </View>
        );
      }}
      renderItem={(data) => {
        return (
          <QuoteListItem
            uuid={data.item.uuid}
            text={data.item.text}
            likes={data.item.UserQuotes[0].likes}
            onTouch={onQuoteSelect}
          />
        );
      }}
    />
  );
};

export default QuoteList;
