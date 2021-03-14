import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  error: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.fgColor1,
    textAlign: 'center',
  },
});
