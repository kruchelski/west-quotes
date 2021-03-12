import React from 'react';
import { Input } from 'react-native-elements';
import { mainTheme, appFonts } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomInput = (props) => {
  const { level, icon } = props;

  return <Input
    {...props}
    leftIcon={
      icon ?
        <Icon
          name={icon}
          size={18}
          color={customStyle.icon[level]}
        /> :
        null
    }
    inputStyle={customStyle.input}
    labelStyle={customStyle.label[level]}
    inputContainerStyle={customStyle.container[level]}
    placeholderTextColor={`${mainTheme.fgColor3}99`}
    

  />
}

const customStyle = {
  input: {
    color: mainTheme.fgColor0,
    fontSize: 14,
    fontFamily: appFonts.regular,
    marginVertical: 0,
    padding: 0
  },
  label: {
    primary: {
      color: mainTheme.primary,
      marginBottom: 0,
      fontSize: 14,
      fontFamily: appFonts.regular,
    },
    secondary: {
      color: mainTheme.secondary,
      marginBottom: 0,
      fontSize: 14,
      fontFamily: appFonts.regular,
    }
  },
  container: {
    primary: {
      borderBottomColor: mainTheme.primary,
      margin: 0,
      padding: 0,
      marginBottom: 0,
    },
    secondary: {
      borderBottomColor: mainTheme.secondary,
      margin: 0,
      padding: 0,
      marginBottom: 0,
    }
  },
  icon: {
    primary: mainTheme.primary,
    secondary: mainTheme.secondary
  }
}

export default CustomInput;