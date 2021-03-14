import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mainTheme } from '../../constants';
import styles from './styles';

const QuoteLove = ({ quoteLove }) => {
  return (
    <View style={{ ...styles.container, borderColor: quoteLove ? `${mainTheme.secondaryLight}77` : `${mainTheme.fgColor2}77` }}>
      <View style={{ ...styles.bar, width: `${quoteLove}%` }} />

      <Icon
        style={styles.icon}
        name='heart'
        size={50}
        color={quoteLove ? mainTheme.secondaryLight : mainTheme.fgColor2}
      />

      <Text style={{ ...styles.text, color: quoteLove ? mainTheme.secondaryLight : mainTheme.fgColor2 }}>
        { quoteLove ? `${quoteLove}% Loved!` : 'Quote not loved :(' }
      </Text>
    </View>
  );
};

export default QuoteLove;
