import React from 'react';
import { Input } from 'react-native-elements';
import { mainTheme } from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const CustomInput = (props) => {
  const { level, icon } = props;

  return (
    <Input
      inputStyle={styles.input}
      labelStyle={styles.label[level]}
      inputContainerStyle={styles.container[level]}
      placeholderTextColor={`${mainTheme.fgColor3}99`}
      leftIcon={
        <If condition={icon}>
          <Icon
            name={icon}
            size={18}
            color={styles.icon[level]}
          />
        </If>
      }
      {...props}
    />
  );
};

export default CustomInput;
