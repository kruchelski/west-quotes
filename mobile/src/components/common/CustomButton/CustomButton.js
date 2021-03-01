import React from 'react';
import { Button } from 'react-native-elements';
import { mainTheme } from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomButton = (props) => {
  const { level, type, icon } = props;

  return <Button 
    {...props}
    icon={ icon ?
      <Icon
        name={icon}
        size={18}
        style={{ marginRight: 5 }}
        color={customStyle.icon[type][level]}
      /> :
      null
    } 
    buttonStyle={customStyle[type][level]} 
    titleStyle={customStyle[type][level]}
  />
}

const customStyle = {
  solid: {
    primary: {
      backgroundColor: mainTheme.primary,
      color: mainTheme.colorLight,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    },
    secondary: {
      backgroundColor: mainTheme.secondary,
      color: mainTheme.colorLight,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    }
  },
  outline: {
    primary: {
      borderColor: mainTheme.primary,
      color: mainTheme.primary,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    },
    secondary: {
      borderColor: mainTheme.secondary,
      color: mainTheme.secondary,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    }
  },
  clear: {
    primary: {
      color: mainTheme.primary,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    },
    secondary: {
      color: mainTheme.secondary,
      fontFamily: 'PTSans_400Regular',
      fontSize:16
    },
  },
  icon: {
    solid: {
      primary: mainTheme.colorLight,
      secondary: mainTheme.colorLight
    },
    outline: {
      primary: mainTheme.primary,
      secondary: mainTheme.secondary
    },
    clear: {
      primary: mainTheme.colorLight,
      secondary: mainTheme.colorLight
    }
  }
}

export default CustomButton;