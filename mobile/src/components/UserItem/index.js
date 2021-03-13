import React from 'react';
import { View, Text } from 'react-native';
import { mainTheme } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const UserItem = ({ username, likes }) => {

  return (
    <View
      style={styles.container}
    >
      <Icon
        style={styles.icon}
        name='user-alt'
        size={16}
        color={mainTheme.fgColor0}
      />
      <Text
        style={styles.usernameText}
      >
        {username}
      </Text>
      <Icon
        style={styles.iconLike}
        name='heart'
        size={16}
        color={mainTheme.secondaryLight}
      />
      <Text
        style={styles.iconText}
      >
        {likes}
      </Text>

    </View>
  );
}

export default UserItem;