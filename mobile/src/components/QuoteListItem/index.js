import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mainTheme } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const QuoteListItem = ({ uuid, text, likes, onTouch }) => {
  return (
    <TouchableOpacity onPress={() => onTouch(uuid)}>
      <View style={styles.container}>
        <Text style={styles.quoteText}>
          {`"${text}"`}
        </Text>
        <Icon
          style={styles.iconLike}
          name='heart'
          size={16}
          color={mainTheme.secondaryLight}
        />
        <Text style={styles.iconText}>
          {likes}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuoteListItem;
