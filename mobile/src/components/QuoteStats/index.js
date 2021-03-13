import React from 'react';
import { View, Text } from 'react-native';
import { mainTheme } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const QuoteStats = ({ occurrences, likes }) => {

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.itemContainer}
      >
        <Icon 
          style={styles.icon}
          name='chart-line'
          size={16}
          color={mainTheme.colorLight}
        />
        <Text
          style={styles.textKey}
        >
          occurrences: 
        </Text>
        <Text
          style={styles.textValue}
        >
          {occurrences}
        </Text>
      </View>
      <View
        style={styles.itemContainer}
      >
        <Icon 
          style={styles.icon}
          name='hand-holding-heart'
          size={16}
          color={mainTheme.colorLight}
        />
        <Text
          style={styles.textKey}
        >
          likes: 
        </Text>
        <Text
          style={styles.textValue}
        >
          {likes}
        </Text>
      </View>
    </View>
  );
}

export default QuoteStats;