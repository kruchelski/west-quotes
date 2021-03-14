import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const CustomButton = (props) => {
  const { level, type, icon } = props;

  return (
    <Button
      buttonStyle={styles[type][level]}
      titleStyle={styles[type][level]}
      icon={
        <If condition={icon}>
          <Icon
            name={icon}
            size={18}
            style={{ marginRight: 5 }}
            color={styles.icon[type][level]}
          />
        </If>
      }
      {...props}
    />
  );
};

export default CustomButton;
