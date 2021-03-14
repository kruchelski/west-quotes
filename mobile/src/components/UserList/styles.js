import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 10,
  },

  title: {
    fontFamily: appFonts.bold,
    fontSize: 16,
    color: mainTheme.secondaryLight,
    marginBottom: 10,
    textAlign: 'center',
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  icon: {
    marginRight: 5,
  },

  newQuote: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.primaryLight,
    textAlign: 'center',
  },

  error: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.fgColor1,
    textAlign: 'center',
    padding: 10,
  },
});
