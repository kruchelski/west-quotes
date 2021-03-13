import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { mainTheme } from '../../constants';
import styles from './styles';

const QuoteControl = ({
  actionHappened,
  loading,
  onPressCallback,
  severity,
  actionHappenedMsg,
  icon
}) => {

  const getColor = () => {
    switch (severity) {
      case 'primary':
        return mainTheme.primaryLight;
      case 'secondary':
        return mainTheme.secondary;
      case 'danger':
        return mainTheme.danger
      default:
        return mainTheme.fgColor0
    }
  }

  return (
    <View
      style={
        {
          ...styles.container,
          height: actionHappened ? 66 : 'auto'
        }
      }
    >
      {
        actionHappened &&
        <View
          style={styles.textContainer}
        >
          <Text
            style={styles.text}
          >
            {actionHappenedMsg}
          </Text>
        </View>

      }
      {
        !actionHappened &&
        <Icon
          raised={true}
          name={icon}
          type='antdesign'
          color={getColor()}
          reverse={true}
          disabled={actionHappened || loading}
          onPress={() => onPressCallback()}
        />
      }
    </View>
  );
}

export default QuoteControl;