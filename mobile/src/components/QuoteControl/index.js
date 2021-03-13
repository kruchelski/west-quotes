import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { mainTheme } from '../../constants';
import styles from './styles';

const QuoteControl = ({
  quoteLiked,
  loading,
  onPressCallback
}) => {

  return (
    <View
      style={styles.container}
    >
      {
        quoteLiked &&
        <View
          style={styles.textContainer}
        >
          <Text
            style={styles.text}
          >
            quote liked!
          </Text>
      </View>

      }
      <Icon
        raised={true}
        name='like1'
        type='antdesign'
        color={mainTheme.secondaryLight}
        reverse={true}
        disabled={quoteLiked || loading}
        onPress={() => onPressCallback()}
      />
    </View>
  );
}

export default QuoteControl;