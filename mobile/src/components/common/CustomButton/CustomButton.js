import React from 'react';
import { Button } from 'react-native-elements';
import { mainTheme, appFonts } from '../../../constants';
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
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
    },
    secondary: {
      backgroundColor: mainTheme.secondary,
      color: mainTheme.colorLight,
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
    }
  },
  outline: {
    primary: {
      borderColor: mainTheme.primary,
      color: mainTheme.primary,
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
    },
    secondary: {
      borderColor: mainTheme.secondary,
      color: mainTheme.secondary,
      fontFamily: appFonts.regular,
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
    }
  },
  clear: {
    primary: {
      color: mainTheme.primary,
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
    },
    secondary: {
      color: mainTheme.secondary,
      fontFamily: appFonts.regular,
      fontSize:16,
      marginHorizontal: 10,
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